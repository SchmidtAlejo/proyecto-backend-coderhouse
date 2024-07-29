import mongoose from "mongoose"

const collection = "carts"
const schema = new mongoose.Schema(
    {
        products: {
            type: [
                {
                    quantity: Number,
                    product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
                }
            ],
            default: []
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    },
    {
        timestamps: true, strict: false
    }
)

export const modelCart = mongoose.model(collection, schema)