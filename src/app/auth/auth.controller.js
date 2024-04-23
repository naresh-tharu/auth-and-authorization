import AuthRequest from "./auth.request.js"

class AuthController {
  registerUser = (req, res, next) => {
    try {
      let mappedData = new AuthRequest(req).transformRegisterData();
      console.log(mappedData)


      //payload
      //validate using zod
      //file uploader
      //file binding
      //send mail token
      //store in db


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