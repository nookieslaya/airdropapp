import express from 'express'
import { CreateFaucet, GetFaucet, GetSingleFaucet,UpdateFaucet,DeleteFaucet } from '../controllers/faucetControllers.js'
import {requireAuth} from "../middleware/requireAuth.js";
const router = express.Router()



router.post('/faucets',requireAuth, CreateFaucet)
router.get('/faucets',requireAuth, GetFaucet)
router.get('/faucets/:id',requireAuth, GetSingleFaucet)
router.put('/faucets/:id',requireAuth, UpdateFaucet)
router.delete('/faucets/:id',requireAuth, DeleteFaucet)

export default router
