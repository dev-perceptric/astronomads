import nodemailer from 'nodemailer';

/**
 * Sends mail through an SMTP mailbox (Hostinger: smtp.hostinger.com, port 465).
 * Configured by SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and MAIL_FROM.
 */
export const mailConfigured = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

export async function sendResetEmail(to: string, link: string): Promise<void> {
  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const from = process.env.MAIL_FROM || `Astronomads <${process.env.SMTP_USER}>`;
  await transport.sendMail({
    from,
    to,
    subject: 'Reset your Astronomads password',
    text: `Someone asked to reset the password for your Astronomads account.\n\nOpen this link within an hour to choose a new one:\n${link}\n\nIf it wasn't you, ignore this email and your password stays the same.`,
    html: `<p>Someone asked to reset the password for your Astronomads account.</p><p><a href="${link}">Choose a new password</a> (the link works for one hour).</p><p>If it wasn't you, ignore this email and your password stays the same.</p>`,
  });
}
