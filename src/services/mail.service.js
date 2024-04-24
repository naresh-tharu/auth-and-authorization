import nodemailer from 'nodemailer';
import 'dotenv/config';
class MailService {
  transporter
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }
  sendEmail = (to, sub, msg) => {
    try {
      let response = this.transporter.sendMail({
        to: to,
        from: process.env.SMTP_FROM_ADDRESS,
        subject: sub,
        html: msg,
        text: msg
      })
      if (response) {
        return true
      } else {
        return false
      }
    } catch (exception) {
      throw ({
        code: 500,
        message: "Error sending mail"
      })
    }
  }
}
const mailSvc = new MailService();
export default mailSvc;