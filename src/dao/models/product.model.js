import mongoose from "mongoose"
import moongoosePaginate from 'mongoose-paginate-v2'

const collection = "products"
const schema = new mongoose.Schema(
    {
        status: Boolean,
        title: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true,
            index: true
        },
        description: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true,
        },
        thumbnail: String,
        stock: {
            type: Number,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
    },
    {
        timestamps: true, strict: false
    }
)

schema.plugin(moongoosePaginate);

export const modelProduct = mongoose.model(collection, schema)