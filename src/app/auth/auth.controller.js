class AuthController {
  registerUser = (req, res, next) => {
    try {
      let data = req.body;

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