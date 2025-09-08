import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

// 1. Setup transporter (use your SMTP provider or Gmail with App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password
  },
});

// 2. Configure Handlebars with Nodemailer
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      partialsDir: path.resolve("./email-templates"), // folder for partials
      defaultLayout: false,
    },
    viewPath: path.resolve("./email-templates"), // where your templates live
    extName: ".hbs",
  })
);

export default transporter;
