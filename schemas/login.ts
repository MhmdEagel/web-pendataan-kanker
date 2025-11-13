import z from "zod";

export const loginSchema = z.object({
  email: z.email({ error: (iss) =>
      iss.input === undefined ? "Email harus diisi" : "Email invalid.", }),
  password: z.string({
    error: (iss) =>
      iss.input === undefined ? "Password harus diisi." : "Password invalid.",
  }),
  code: z.string().optional()
});
