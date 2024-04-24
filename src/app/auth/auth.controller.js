import nodemailer from 'nodemailer'
import 'dotenv/config';
import AuthRequest from "./auth.request.js"
import mailSvc from '../../services/mail.service.js';

class AuthController {
  registerUser = (req, res, next) => {
    try {
      let mappedData = new AuthRequest(req).transformRegisterData();

      mailSvc.sendEmail(
        mappedData.email,
        "Activate your Account!!!",
        `<strong>Dear ${mappedData.name}</strong> 
        <p>Your account has ben registered successfully.</p>
        <p>Please click the link below or copy the url to activate your account: </p>
        <a href="${process.env.FRONTEND_URL}/activate/${mappedData.token}">${process.env.FRONTEND_URL}/activate/${mappedData.token}</a>
      <p>Thank you again for the use.</p>
      <p>Regards,</p>
      <p>No reply, system</p>
      <p><small><em>Please do not reply to this email.</em></small></p>
        `
      )

      // TODO: Store in DB
      //payload
      //validate using zod
      //file uploader
      //file binding
      //send mail token
      //store in db
      res.json({
        result: mappedData,
        message: "User registered successfully.",
        meta: null
      })

    } catch (exception) {
      next(exception)
    }
  }
  activateUser = (req, res, next) => {

  }
  login = (req, res, next) => {

  }
  getLoggedInUser = (req, res, next) => {

  }
  forgetPassword = (req, res, next) => {

  }
  setPassword = (req, res, next) => {

  }

}
const authCtrl = new AuthController();
export default authCtrl;