import { z } from "zod";

export const SsignUp = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50),
  confirmPassword: z.string().min(8).max(50),
});
export type TsignUp = z.infer<typeof SsignUp>;

export const SsignIn = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});
export type TsignIn = z.infer<typeof SsignIn>;

//?? ========================================== UPDATE USER ==========================================
export const Semail = z.object({
  email: z.string().email(),
});
export type Temail = z.infer<typeof Semail>;

export const SchangeName = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
});
export type TchageName = z.infer<typeof SchangeName>;

export const SchangePassword = z
  .object({
    currentPassword: z.string().min(8).max(50),
    newPassword: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
  })
  .refine((ctx) => ctx.newPassword === ctx.confirmPassword, {
    message: "konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });
export type TchagePassword = z.infer<typeof SchangePassword>;

//?? ========================================== FORGOT PASSWORD ==========================================
export const SotpForgotPassword = z.object({
  email: z.string().email(),
  otp: z.string(),
  password: z.string().min(8).max(50),
});

export type TotpForgotPassword = z.infer<typeof SotpForgotPassword>;
