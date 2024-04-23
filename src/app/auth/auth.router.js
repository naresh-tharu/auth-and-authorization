import { Router } from "express";
import authCtrl from "./auth.controller.js";
import validateRequest from "../../middlewares/validator.middleware.js";
import { registerSchema } from "./auth.validator.js";
import { uploader } from "../../middlewares/uploader.middleware.js";
const router = Router();

const dirPath = (req, res, next) => {
  req.uploadPath = "./public/uploads/users"
  next()
}

router.post('/register', dirPath, uploader.single('image'), validateRequest(registerSchema), authCtrl.registerUser)
router.post('/activate/:token', authCtrl.activateUser)
router.post('/login', authCtrl.login)
router.get('/me', authCtrl.getLoggedInUser)
router.post('/forget-password', authCtrl.forgetPassword)
router.post('/set-password/:token', authCtrl.setPassword)

export default router;