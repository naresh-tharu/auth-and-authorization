class AuthController {
  registerUser = (req, res, next) => {
    try {
      let data = req.body;
      console.log("success", data)

      //payload
      //validate using zod
      //file uploader
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