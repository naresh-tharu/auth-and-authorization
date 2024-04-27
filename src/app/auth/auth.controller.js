import 'dotenv/config';
import AuthRequest from "./auth.request.js"
import mailSvc from '../../services/mail.service.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthController {
  registerUser = async (req, res, next) => {
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
    let token = req.params.token;

    // TODO: Update User with password field
    let password = bcrypt.hashSync(req.body.password, 10)
    res.json({
      result: password,
      message: "User Activated Successfully",
      meta: null
    })

  }
  login = (req, res, next) => {
    try {
      let credentials = req.body
      //email:="", password:""
      //TODO:DB User fetch based on user email

      let userDetail = {
        id: 123,
        name: "Naresh Tharu",
        email: "nareshtharu.info@gmail.com",
        role: "admin",
        password: "$2a$10$ArNTGo/n9QICSxQerRZZ3./b8fF1HEwXFCSAvR8aciupjPLpY75Yy"
      }
      //Admin123#
      if (bcrypt.compareSync(credentials.password, userDetail.password)) {
        //password match
        let token = jwt.sign({
          id: userDetail.id
        }, process.env.JWT_SECRET, {
          expiresIn: "1 days"
        })

        let refreshToken = jwt.sign({
          id: userDetail.id
        }, process.env.JWT_SECRET, {
          expiresIn: "7 days"
        })


        res.json({
          result: {
            token: token,
            refreshToken: refreshToken,
            type: "Bearer",
            detail: {
              id: userDetail.id,
              name: userDetail.name,
              email: userDetail.email,
              role: userDetail.role
            }
          },
          message: "User Logged Successfully",
          meta: null
        })
      } else {
        next({
          code: 400,
          message: "Credentials does not match"
        })
      }
    } catch (exception) {
      next(exception)
    }
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