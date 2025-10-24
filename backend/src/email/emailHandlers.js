import { createWelcomeEmailTemplate } from "../email/emailTemplates.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const FROM_EMAIL = process.env.FROM_EMAIL || 'test@example.com';
const APP_PASSWORD = process.env.APP_PASSWORD || 'your-app-password';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${FROM_EMAIL}`,
    pass: `${APP_PASSWORD}`, // Generate this in Google Account -> Security -> App Passwords
  },
});

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const mailOptions = {
    from: `${FROM_EMAIL}`,
    to: `${email}`,
    subject: 'Welcome to AeroChat!',
    text: 'Thanks for joining our app.',
    html: createWelcomeEmailTemplate(name, clientURL),
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

// export const sendWelcomeEmail2 = async (email, name, clientURL) => {
//   const { data, error } = await resendClient.emails.send({
//     from: `${sender.name} <${sender.email}>`,
//     to: email,
//     subject: "Welcome to Chatify!",
//     html: createWelcomeEmailTemplate(name, clientURL),
//   });

//   if (error) {
//     console.error("Error sending welcome email:", error);
//     throw new Error("Failed to send welcome email");
//   }

//   console.log("Welcome Email sent successfully", data);
// };

// export const sendWelcomeEmail = async (email, name, clientURL) => { // for sendgrid
//     const msg = {
//     to: `${email}`, // Change to your recipient
//     from: `${FROM_EMAIL}`, // Change to your verified sender
//     subject: 'Welcome to AeroChat!',
//     html: createWelcomeEmailTemplate(name, clientURL),
//     };
//     try{
//         sgMail.send(msg)
//     }
//     catch (error){
//         throw new Error("Failed to send welcome email");
//     }
// }
