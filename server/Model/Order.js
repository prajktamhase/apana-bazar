import { Schema,model } from "mongoose";

 const orderSchema= new Schema({
    user:{
        type: Schema.Types.objectId,
        requirerd:true,
        ref:"User"
    },
    product:{
        type:Schema.Types.objectId,
        requirerd:true,
        ref:"Product"
    },
    quantity:{
        type:String,
        default:1
    },

    shippedAddress:{
        type:String,
        requirerd:true
    },

    deleveryCharges:{
        type:String,
        default:0
    },

    status:{
     type:String,
     default:"pending"
    },
 },
 {
    timestamps:true
});

 const Order = model ("Order",orderSchema)
 export default Order