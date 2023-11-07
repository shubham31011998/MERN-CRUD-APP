import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        seller: {
            type: String,
            required: true,
        },
        launchYear: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps:true
    }
)

export const Product = mongoose.model('prod', productSchema);