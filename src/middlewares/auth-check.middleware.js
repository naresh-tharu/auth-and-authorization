import jwt from 'jsonwebtoken'
import 'dotenv/config'
const checkLogin = (req, res, next) => {
  try {
    let token = null;
    if (req.headers['authorization']) {
      token = req.headers['authorization']
    }
    if (req.query['token']) {
      token = req.query['token'];
    }
    if (!token) {
      //token not set
      next({
        code: 401,
        message: "Token not set"
      })
    } else {
      //token set
      //Bearer token  => token
      token = token.split(" ").pop()
      console.log({ token })
      if (!token) {
        next({
          code: 401,
          message: "Token is empty or not set"
        })
      } else {
        //validate token {token:Bearer}
        let data = jwt.verify(token, process.env.JWT_SECRET)
        //id
        if (!data.hasOwnProperty('id')) {
          next({ code: 401, message: "Invalid token" })
        } else {
          //TODO: DB verify 
          req.authUser = {} //TODO: update user here
          next()

        }
      }
    }

  } catch (exception) {
    //jwt exception
    console.log(exception)
    next(exception)
  }
}
export default checkLogin;