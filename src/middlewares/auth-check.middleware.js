import jwt from "jsonwebtoken";
import "dotenv/config";
import authSvc from "../app/auth/auth.service.js";
const checkLogin = async (req, res, next) => {
  try {
    let token = null;
    if (req.headers["authorization"]) {
      token = req.headers["authorization"];
    }
    if (req.query["token"]) {
      token = req.query["token"];
    }
    if (!token) {
      //token not set
      next({
        code: 401,
        message: "Token not set",
      });
    } else {
      //token set
      //Bearer token  => token
      token = token.split(" ").pop();
      if (!token) {
        next({
          code: 401,
          message: "Token is empty or not set",
        });
      } else {
        //validate token {token:Bearer}
        let data = jwt.verify(token, process.env.JWT_SECRET);
        //id
        if (!data.hasOwnProperty("id")) {
          next({ code: 401, message: "Invalid token" });
        } else {
          //TODO: DB verify
          console.log(data);
          let userDetail = await authSvc.getUserByFilter({
            _id: data.id,
          });
          if (userDetail.length !== 1) {
            next({ code: 401, message: "User doesnot exits any more" });
          }
          req.authUser = userDetail[0]; 
          next();
        }
      }
    }
  } catch (exception) {
    //jwt exception
    console.log(exception);
    next(exception);
  }
};
export default checkLogin;
