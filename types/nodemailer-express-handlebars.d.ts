import "nodemailer";

declare module "nodemailer" {
  interface SendMailOptions {
    /**
     * Template name (e.g. welcome, reset-password)
     */
    template?: string;

    /**
     * Context object to pass variables into handlebars
     */
    context?: Record<string, any>;
  }
}
