"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { IRegister } from "@/types/Auth";

export const registerUser = async (data: IRegister) => {
  const { email, password, fullname } = data;
  const user = await getUserByEmail(email);
  if (user) {
    return { success: null, error: "Email sudah digunakan" };
  }
  const hashedPassword = hashPassword(password);
  try {
    await db.user.create({
      data: {
        email,
        fullname,
        password: hashedPassword,
      },
    });
    return { success: "Akun berhasil dibuat.", error: null };
  } catch (e) {
    console.error((e as Error).message);
    return { success: null, error: "Terjadi kesalahan" };
  }
};
