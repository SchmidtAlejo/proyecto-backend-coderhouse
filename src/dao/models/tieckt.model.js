import mongoose from "mongoose"
import moongoosePaginate from 'mongoose-paginate-v2'

const collection = "tieckts"
const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    purchase_datetime: {
      type: Date,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    purchaser: {
      type: String,
      required: true
    }
  },
  {
    timestamps: false, strict: false
  }
)

schema.plugin(moongoosePaginate);

export const modelTicket = mongoose.model(collection, schema)