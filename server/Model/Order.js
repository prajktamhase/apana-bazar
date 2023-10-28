import { Schema,model } from "mongoose";

 const orderSchema= new Schema({
    user:{
        type: Schema.types.objectId,
        requirerd:true,
        ref:"User"
    },
    product:{
        type:Schema.types.objectId,
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

    deleveriCharges:{
        type:String,
        default:0
    },

    status:{
     type:string,
     default:pending
    }

 })

 const Order = model ("Order",orderSchema)