import mongoose from 'mongoose'

const reminderSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        color: {
            type: String,

        },
        complete: {
            type: Boolean,

        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        timestamps: true,
    }
)

const Reminder = mongoose.model('Reminder', reminderSchema)

export default Reminder
