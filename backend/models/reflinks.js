import mongoose from "mongoose";

const reflinksSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});

const Reflinks = mongoose.model("Reflinks", reflinksSchema);

export default Reflinks