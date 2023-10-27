import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
    },

    brand: {
        type: String,
    },
},
 {
    timestamps: true,
});

const Product = model('product', productSchema);

export default Product;
