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
