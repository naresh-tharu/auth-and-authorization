import { Router } from "express";
import authCtrl from "./auth.controller.js";
const router = Router();

router.post('/register', authCtrl.registerUser)
router.post('/activate/:token', authCtrl.activateUser)
router.post('/login', authCtrl.login)
router.get('/me', authCtrl.getLoggedInUser)
router.post('/forget-password', authCtrl.forgetPassword)
router.post('/set-password/:token', authCtrl.setPassword)

export default router;