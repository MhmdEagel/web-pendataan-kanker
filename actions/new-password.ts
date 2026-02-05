"use server";

import { getTwoFactorConfirmationById } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { hashPassword, isPasswordMatch } from "@/lib/password";
import { generateTwoFactorToken } from "@/lib/tokens";
import { INewPasswordExtended } from "@/types/Auth";

export const newPasswordAction = async (data: INewPasswordExtended) => {
  const { email, newPassword, oldPassword, code } = data;
  if (!email) {
    return {status: "error", message: "email tidak ditemukan"}
  }

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    return { status: "error", message: "email tidak ditemukan" };
  }

  if (!isPasswordMatch(oldPassword, user?.password)) {
    return { status: "error", message: "password yang anda masukkan salah" };
  }

  if (user.isTwoFactorEnabled && user.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(user.email);

      if (!twoFactorToken) {
        return { status: "error", message: "kode invalid" };
      }

      if (twoFactorToken.token !== code) {
        return { status: "error", message: "Kode invalid" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { status: "error", message: "Kode invalid" };
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
  const hashedNewPassword = hashPassword(newPassword);
  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedNewPassword,
      },
    });
    return { status: "success", message: "password berhasil diganti" };
  } catch {
    return { status: "error", message: "terjadi kesalahan" };
  }
};
