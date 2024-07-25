import express from "express";
import {CreateDaily, DeleteDaily, GetDaily, GetSingleDaily, UpdateDaily} from "../controllers/DailyControllers.js";
import {requireAuth} from "../middleware/requireAuth.js";
const router = express.Router()

router.post('/daily', requireAuth, CreateDaily)
router.get('/daily', requireAuth, GetDaily)
router.get('/daily/:id', requireAuth, GetSingleDaily)
router.put('/daily/:id', requireAuth, UpdateDaily)
router.delete('/daily/:id', requireAuth, DeleteDaily)

export default router
