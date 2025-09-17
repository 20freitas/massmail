import nodemailer from 'nodemailer';

export interface GmailConfig {
  user: string;
  appPassword: string; // App-specific password
}

export function createTransport(config: GmailConfig) {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.user,
      pass: config.appPassword
    }
  });
}

export async function sendEmail(cfg: GmailConfig, to: string, subject: string, html: string) {
  const transport = createTransport(cfg);
  await transport.sendMail({
    from: cfg.user,
    to,
    subject,
    html
  });
}
