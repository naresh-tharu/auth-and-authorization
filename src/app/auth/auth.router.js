import { Router } from "express";
const router = Router();

router.post('/register', (req, res, next) => { })
router.post('/activate/:token', (req, res, next) => { })
router.post('/login', (req, res, next) => { })
router.get('/me', (req, res, next) => { })
router.post('/forget-password', (req, res, next) => { })
router.post('/set-password/:token', (req, res, next) => { })

export default router;