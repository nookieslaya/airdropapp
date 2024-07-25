import Reminder from "../models/reminder.js";


const CreateReminder = async (req, res) => {
    try {
        const name = req.body.name
        const url = req.body.url
        const date = req.body.date
        const description = req.body.description
        const color = req.body.color
        const complete = req.body.complete

        const reminder = await Reminder.create({
            name: name,
            url: url,
            date: date,
            description: description,
            color: color,
            complete: complete,
            user: req.user._id
        })

        res.json({reminder: reminder})

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Server error' });
    }
}

const GetReminder = async (req, res) => {
    try {
        const reminders = await Reminder.find({user: req.user._id})
        res.json({reminders})
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Server error' });
    }
}

const GetSingleReminder = async (req, res) => {
    try {
        const reminderId = req.params.id
        const reminder = await Reminder.findOne([{ _id: reminderId, user: req.user._id }])
        res.json({reminder})
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Server error' });
    }
}
const UpdateReminder = async (req, res) => {
    try {
        const reminderId = req.params.id
        const { name, url, date, description, color, complete } = req.body

        await Reminder.findOneAndUpdate({ _id: reminderId, user: req.user._id }, { name, url, date, description, color, complete })

        const reminder = await Reminder.findById(reminderId)
        res.json({ reminder })
} catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Server error' });
    }
}
const DeleteReminder = async (req, res) => {
    try {
        const reminderId = req.params.id
        await Reminder.findOneAndDelete({ _id: reminderId, user: req.user._id })
        res.json({ success: true })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}
export {CreateReminder, GetReminder, GetSingleReminder, UpdateReminder, DeleteReminder}