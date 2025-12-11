import z from "zod";

export const registerSchema = z
  .object({
    email: z.email({
      error: (iss) =>
        iss.input === undefined ? "Email harus diisi" : "Email invalid.",
    }),
    password: z.string({
      error: (iss) =>
        iss.input === undefined ? "Password harus diisi." : "Password invalid.",
    }),
    fullname: z.string({
      error: (iss) =>
        iss.input === undefined ? "Nama lengkap harus diisi." : "Nama lengkap invalid.",
    }),
    confirmPassword: z.string({
      error: (iss) =>
        iss.input === undefined
          ? "Konfirmasi Password harus diisi."
          : "Password invalid.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password tidak sama",
    path: ["confirmPassword"],
  });
