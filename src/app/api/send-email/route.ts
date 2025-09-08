import { NextResponse } from "next/server";
import nodemailer, { SendMailOptions } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { create } from "express-handlebars";
import path from "path";

export async function POST(request: Request) {
  try {
    const { to, subject, template, sender,message } = await request.json();

    // 1. Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    // 2. Create Handlebars instance
    const hbsInstance = create({
      extname: ".hbs",
      partialsDir: path.resolve("./email-templates"),
      layoutsDir: path.resolve("./email-templates"),
      defaultLayout: false,
    });

    // 3. Attach plugin
    transporter.use(
      "compile",
      hbs({
        viewEngine: hbsInstance,
        viewPath: path.resolve("./email-templates"),
        extName: ".hbs",
      })
    );

    // 4. Send email with template
       await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to,
      subject: subject,
      template: template,
      context: { name:sender, to,message },
    } as SendMailOptions & { template: string; context: any });


    return NextResponse.json({ success: true, message: "email sent!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
