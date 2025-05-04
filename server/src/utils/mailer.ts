import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendResetEmail = async (to: string, token: string) => {
  const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

  const info = await transporter.sendMail({
    from: `"Tenant Auth" <${process.env.SMTP_MAIL}>`,
    to,
    subject: 'Reset your password',
    html: `
      <p>You requested a password reset.</p>
      <p><a href="${resetLink}">Click here to reset your password</a></p>
      <p>This link will expire in 30 minutes.</p>
    `,
  });

  console.log('🔔 Reset email sent:', info.messageId);
};
