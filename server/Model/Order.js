import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product"
    },

    quantity: {
      type: Number,
      default: 1
    },

    shippingAddress: {
      type: String,
      required: true ,
    },

    deleveryCharges: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      default: "pending"
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);
export default Order;
