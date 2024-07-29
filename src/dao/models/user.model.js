import mongoose from "mongoose"

const collection = "users"

const documentSchema = new mongoose.Schema({
    name: String,
    reference: String
});

const userSchema = new mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        age: Number,
        role: String,
        email: {
            type: String, unique: true
        },
        password: String,
        last_connection: Date,
        documents: [documentSchema]
    }
)

export const modelUser = mongoose.model(collection, userSchema);
