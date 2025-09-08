import "nodemailer";

declare module "nodemailer" {
  interface SendMailOptions {
    template?: string;
    context?: Record<string, any>;
  }
}