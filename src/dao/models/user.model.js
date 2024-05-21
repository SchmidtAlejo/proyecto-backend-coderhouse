import mongoose from "mongoose"

const collection = "users"
const schema = new mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        age: Number,
        role: String,
        email: {
            type: String, unique: true
        },
        password: String
    }
)

export const modelUser = mongoose.model(collection, schema);