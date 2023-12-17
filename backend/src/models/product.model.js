import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    comment: {
        type: String,
    }
}, { timestamps: true })

const productSchema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    images: {
        type: String,
    },
    category: {
        type: String
    },
    review: [reviewSchema],
}, { timestamps: true });

const Product = mongoose.model('product', productSchema);

export default Product;