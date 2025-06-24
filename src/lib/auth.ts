import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { emailOTP } from "better-auth/plugins";
import { sendEmail } from "./email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  user: {
    changeEmail: {
      enabled: true,
    },
  },
  emailVerification: {
    sendVerificationEmail: async (data) => {
      await sendEmail({
        to: data.user.email,
        subject: "verification email",
        template: "email-verification",
        vars: {
          url: data.url,
        },
      });
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          // Send the OTP for sign-in
        } else if (type === "sign-in") {
          // Send the OTP for email verification
        } else {
          await sendEmail({
            to: email,
            template: "otp-password",
            subject: "code otp",
            vars: { otp },
          });
        }
      },
    }),
  ],
});
