import express from 'express'
import {signup, logout, login, checkAuth} from "../controllers/usersController.js";
import {requireAuth} from "../middleware/requireAuth.js";
const router = express.Router()


router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)
router.get('/check-auth',requireAuth,checkAuth)


export default router