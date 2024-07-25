import express from "express";
import { CreateReflinks, GetReflinks, GetSingleReflinks, UpdateReflinks, DeleteReflinks } from "../controllers/reflinksControllers.js";
import {requireAuth} from "../middleware/requireAuth.js";
const router = express.Router();

router.post('/reflinks',requireAuth, CreateReflinks)
router.get('/reflinks',requireAuth, GetReflinks)
router.get('/reflinks/:id',requireAuth, GetSingleReflinks)
router.put('/reflinks/:id',requireAuth, UpdateReflinks)
router.delete('/reflinks/:id',requireAuth, DeleteReflinks)

export default router