import express from "express";
import { CreateReminder, GetReminder, GetSingleReminder, UpdateReminder, DeleteReminder } from "../controllers/reminderController.js";
import { requireAuth } from "../middleware/requireAuth.js";
const router = express.Router();


router.post('/reminders', requireAuth, CreateReminder)
router.get('/reminders', requireAuth, GetReminder)
router.get('/reminders/:id', requireAuth, GetSingleReminder)
router.put('/reminders/:id', requireAuth, UpdateReminder)
router.delete('/reminders/:id', requireAuth, DeleteReminder)

export default router