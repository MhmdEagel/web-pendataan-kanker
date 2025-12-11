"use server";

import { signIn } from "@/auth";
import { getTwoFactorConfirmationById } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/tokens";
import { ILogin } from "@/types/Auth";
import { AuthError } from "next-auth";

const loginUser = async (data: ILogin) => {
  const { email, password, code } = data;
  const user = await getUserByEmail(email);
  
  if (!user || !user.email || !user.password) {
    throw new Error("Email tidak ditemukan");
  }

  if (user.isTwoFactorEnabled && user.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(user.email);

      if (!twoFactorToken) {
        return { error: "Kode invalid" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Kode invalid" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Kode invalid" };
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationById(user.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: user.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(user.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: "Login berhasil." };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Email atau password salah.");
        default:
          throw new Error("Terjadi Kesalahan");
      }
    }
    throw error;
  }
};

export default loginUser;
