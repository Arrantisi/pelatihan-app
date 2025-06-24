import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export const GET = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await sendEmail({
      to: "yasin.arran@gmail.com",
      subject: "Kode OTP Kamu",
      template: "otp-password",
      vars: {
        otp,
      },
    });

    return NextResponse.json({ success: true, otp }); // OTP dikirim juga (testing)
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
};
