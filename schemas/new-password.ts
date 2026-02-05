import z from "zod";

export const newPasswordSchema = z
  .object({
    oldPassword: z.string({
      error: (iss) =>
        iss.input === undefined ? "Password harus diisi" : "Input Invalid",
    }),
    newPassword: z.string({
      error: (iss) =>
        iss.input === undefined ? "Password baru harus diisi" : "Input Invalid",
    }),
    confirmPassword: z.string({
      error: (iss) =>
        iss.input === undefined
          ? "Konfirmasi Password harus diisi"
          : "Input Invalid",
    }),
    code: z.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password tidak sama",
        path: ["confirmPassword"], // supaya error muncul di field confirmPassword
      });
    }
  });
