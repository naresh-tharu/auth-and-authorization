import "dotenv/config";
import AuthRequest from "./auth.request.js";
import mailSvc from "../../services/mail.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authSvc from "./auth.service.js";
import { randomStringGenerate } from "../../config/helpers.js";

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      let mappedData = new AuthRequest(req).transformRegisterData();
      let response = await authSvc.storeUser(mappedData);
      await mailSvc.sendEmail(
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
      );
      res.json({
        result: response,
        message: "User registered successfully.",
        meta: null,
      });
    } catch (exception) {
      console.log({ exception });
      next(exception);
    }
  };
  activateUser = async (req, res, next) => {
    try {
      let token = req.params.token;
      let userDetail = await authSvc.getUserByFilter({ token: token });
      if (userDetail.length === 1) {
        let password = bcrypt.hashSync(req.body.password, 10);
        let updateResponse = await authSvc.updateUser(userDetail[0]._id, {
          password: password,
          token: null,
          status: "active",
        });
        res.json({
          result: updateResponse,
          message: "User Activated Successfully",
          meta: null,
        });
      } else {
        next({ code: 400, message: "Token expired or does not exists." });
      }
    } catch (exception) {
      next(exception);
    }
  };
  login = async (req, res, next) => {
    try {
      let credentials = req.body;
      let userDetail = await authSvc.getUserByFilter({
        email: credentials.email,
      });
      if (userDetail.length !== 1) {
        next({ code: 400, message: "User doesnot exits or not activated" });
      }
      userDetail = userDetail[0];
      if (userDetail.token) {
        next({ code: 400, message: "User not activated" });
      }
      if (bcrypt.compareSync(credentials.password, userDetail.password)) {
        let token = jwt.sign({ id: userDetail._id }, process.env.JWT_SECRET, {
          expiresIn: "1 days",
        });
        let refreshToken = jwt.sign(
          { id: userDetail._id },
          process.env.JWT_SECRET,
          { expiresIn: "7 days" }
        );
        res.json({
          result: {
            token: token,
            refreshToken: refreshToken,
            type: "Bearer",
            detail: {
              id: userDetail._id,
              name: userDetail.name,
              email: userDetail.email,
              role: userDetail.role,
            },
          },
          message: "User Logged Successfully",
          meta: null,
        });
      } else {
        next({ code: 400, message: "Credentials does not match" });
      }
    } catch (exception) {
      next(exception);
    }
  };
  getLoggedInUser = (req, res, next) => {
    
  };
  forgetPassword = async (req, res, next) => {
    try {
      let email = req.body.email;
      let userDetail = await authSvc.getUserByFilter({
        email: email,
      });
      if (userDetail.length === 1) {
        let user = userDetail[0];
        user.forgetToken = randomStringGenerate(100);
        let date = new Date();
        date.setUTCHours(date.getUTCHours() + 2);
        user.validateTill = date;
        await user.save();
        await mailSvc.sendEmail(
          user.email,
          "Reset Password",
          `
          <h4>Dear ${user.name}</h4>
          <p>If you have tried to reset your password please click or copy paste the following link in the browser.</p>
          <a href ="${process.env.FRONTEND_URL}/reset-password/${user.forgetToken}">${process.env.FRONTEND_URL}/reset-password/${user.forgetToken}</a>
          <br/>
          <p>This token url is valid only for 2 hours.</p>
          <p>If this was mistake, please ignore the message.</p>
          <p>Regards,</p>
          <p>No reply, system</p>
          <p><em>Do not reply to this email</em></p>
      
          `
        );
        res.json({
          result: {
            user: user,
          },
          message: "Password reset token sent successfully",
          meta: null,
        });
      } else {
        throw {
          code: 400,
          message: "User does not exits",
        };
      }
    } catch (exception) {
      next(exception);
    }
  };
  resetPassword = async (req, res, next) => {
    try {
      let token = req.params.token;
      let userDetail = await authSvc.getUserByFilter({
        forgetToken: token,
        validateTill: { $gte: new Date() },
      });
      console.log(userDetail);
      if (userDetail.length === 1) {
        let password = bcrypt.hashSync(req.body.password, 10);
        let updateResponse = await authSvc.updateUser(userDetail[0]._id, {
          password: password,
          forgetToken: null,
          validateTill: null,
        });
        res.json({
          result: updateResponse,
          message: "Your password changed successfully",
          meta: null,
        });
      } else {
        next({ code: 400, message: "Token expired or does not exists." });
      }
    } catch (exception) {
      next(exception);
    }
  };
}
const authCtrl = new AuthController();
export default authCtrl;
