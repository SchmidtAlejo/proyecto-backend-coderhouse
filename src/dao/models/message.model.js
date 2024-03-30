import mongoose from "mongoose"

const collection = "messages"
const schema = new mongoose.Schema(
    {
        user: String,
        message: String,
    },
    {
        timestamps: true, strict: false
    }
)

export const modelMessage = mongoose.model(collection, schema)