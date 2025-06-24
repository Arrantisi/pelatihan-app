// lib/email.ts
import path from "path";
import { Resend } from "resend";
import fs from "fs";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  template,
  vars,
}: {
  to: string;
  subject: string;
  template: string;
  vars: Record<string, string>;
}) => {
  const html = renderTemplate(template, vars);

  try {
    const { data, error } = await resend.emails.send({
      from: "Pelatihan App <onboarding@resend.dev>", // sementara pakai ini
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Email Error:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("Kirim Email Gagal:", err);
    throw err;
  }
};

export const renderTemplate = (
  templateName: string,
  vars: Record<string, string>
) => {
  const filePath = path.join(
    process.cwd(),
    "src",
    "lib",
    "templates",
    `${templateName}.html`
  );
  let html = fs.readFileSync(filePath, "utf-8");

  for (const key in vars) {
    html = html.replaceAll(`{{${key}}}`, vars[key]);
  }

  return html;
};
