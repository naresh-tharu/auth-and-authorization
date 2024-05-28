import 'dotenv/config';
import AuthRequest from "./auth.request.js"
import mailSvc from '../../services/mail.service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

import authSvc from './auth.service.js';

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      let mappedData = new AuthRequest(req).transformRegisterData();
      let response = await authSvc.storeUser(mappedData)
      mailSvc.sendEmail(
        mappedData.email,
        "Activate your Account!!!",
        `<strong>Dear ${mappedData.name}</strong> 
        <p>Your account has been registered successfully.</p>
        <p>Please click the link below or copy the url to activate your account: </p>
        <a href="${process.env.FRONTEND_URL}/activate/${mappedData.token}">${process.env.FRONTEND_URL}/activate/${mappedData.token}</a>
      <p>Thank you again for the use.</p>
      <p>Regards,</p>
      <p>No reply, system</p>
      <p><small><em>Please do not reply to this email.</em></small></p>
        `
      )

      res.json({
        result: response,
        message: "User registered successfully.",
        meta: null
      })

    } catch (exception) {
      console.log({ exception })
      next(exception)
    }
  }
  activateUser = async (req, res, next) => {
    try {
      let token = req.params.token;
      //DB connection
      const connect = await MongoClient.connect(process.env.MONGODB_URL)
      const db = connect.db(process.env.DB_NAME)
      let userDetail = await db.collection('users').findOne({
        token: token
      })
      if (userDetail) {
        //user exits
        // TODO: Update User with password field
        let password = bcrypt.hashSync(req.body.password, 10)
        let updateResponse = await db.collection('users').updateOne({
          _id: userDetail._id
        }, {
          $set: {
            password: password,
            token: null,
            status: "active"
          }
        })
        res.json({
          result: updateResponse,
          message: "User Activated Successfully",
          meta: null
        })

      } else {
        next({ code: 400, message: "Token expired or does not exists." })
      }
    } catch (exception) {
      next(exception)
    }

  }
  login = async (req, res, next) => {
    try {
      let credentials = req.body
      //email:="", password:""
      //TODO:DB User fetch based on user email
      //db connection
      const connect = await MongoClient.connect(process.env.MONGODB_URL)
      const db = connect.db(process.env.DB_NAME)

      let userDetail = await db.collection('users').findOne({
        email: credentials.email,
        // token: { $eq: null }
      })
      console.log(userDetail)
      //Admin123#

      if (userDetail) {
        if (userDetail.token) {
          next({ code: 400, message: "User not activated" })
        }
        if (bcrypt.compareSync(credentials.password, userDetail.password)) {
          //password match
          let token = jwt.sign({ id: userDetail._id }, process.env.JWT_SECRET, { expiresIn: "1 days" })
          let refreshToken = jwt.sign({ id: userDetail._id }, process.env.JWT_SECRET, { expiresIn: "7 days" })
          res.json({
            result: {
              token: token,
              refreshToken: refreshToken,
              type: "Bearer",
              detail: {
                id: userDetail._id,
                name: userDetail.name,
                email: userDetail.email,
                role: userDetail.role
              }
            },
            message: "User Logged Successfully",
            meta: null
          })
        } else {
          next({ code: 400, message: "Credentials does not match" })
        }
      } else {
        next({ code: 400, message: "User doesnot exits or not activated" })
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