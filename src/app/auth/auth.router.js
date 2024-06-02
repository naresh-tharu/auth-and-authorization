import { Router } from "express";
import authCtrl from "./auth.controller.js";
import validateRequest from "../../middlewares/validator.middleware.js";
import {loginSchema,registerSchema,userActivationSchema,forgetPasswordSchema,} from "./auth.validator.js";
import { uploader } from "../../middlewares/uploader.middleware.js";
import checkLogin from "../../middlewares/auth-check.middleware.js";
import { checkPermission } from "../../middlewares/rbac.middleware.js";
const router = Router();

const dirPath = (req, res, next) => {
  req.uploadPath = "./public/uploads/users";
  next();
};

router.post("/register",dirPath,uploader.single("image"),validateRequest(registerSchema),authCtrl.registerUser);
router.post("/activate/:token",validateRequest(userActivationSchema),authCtrl.activateUser);
router.post("/login", validateRequest(loginSchema), authCtrl.login);
router.get("/me", checkLogin, authCtrl.getLoggedInUser);
// router.get('/refresh-token', checkLogin, authCtrl.refreshToken)
router.post("/forget-password",validateRequest(forgetPasswordSchema),authCtrl.forgetPassword);
router.post("/reset-password/:token",validateRequest(userActivationSchema),authCtrl.resetPassword);

export default router;
