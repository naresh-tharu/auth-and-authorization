import { Router } from "express";
import authRoutes from "../app/auth/auth.router.js";
const router = Router();

router.use('/auth', authRoutes);

export default router;