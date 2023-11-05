import express from "express";
import mongoose from "mongoose";
import dotenv, { populate } from "dotenv";
dotenv.config();
import User from "./Model/User.js";
import Product from "./Model/Product.js";
import Order from "./Model/Order.js"

const app = express();
app.use(express.json());

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
        console.log("MongoDB start...💖")
    }
};
connectDB();

//signup/post
app.post("/signup", async (req, res) => {
    const { name, email, password, mobile, address, gender } = req.body;
    const user = new User({
        name,
        email,
        password,
        mobile,
        address,
        gender
    });

    try {
        const saveUser = await user.save();
        res.json({
            success: true,
            data: saveUser,
            message: "Signup Successfully",

        });
    }
    catch(e) {
        res.json({
            success: false,
            message: e.message,
        });
    }
});

//login/post (access data fron signup)
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const finduser = await User.findOne({
        email: email,
        password: password
    }).select('name mobile gender address email')

    if (finduser) {
        return res.json({
            success: true,
            data: finduser,
            message: "Login successfully"
        })
    }
    else {
        return res.json({
            success: false,
            message: "Invalid data"
        })
    }
})

//Product API
//GET all products
app.get("/products", async (req, res) => {
    const products =
        await Product.find();
    res.json({
        success: true,
        data: products,
        message: "Product fetched successfully"


    });
})

//Post products (create product)
app.post('/product', async (req, res) => {

    const { name, description, price, image, category, brand } = req.body;

    //product instance
    const product = new Product({
        name,
        description,
        price,
        image,
        category,
        brand
    })

    try {
        const saveProduct = await product.save();
        res.json({
            success: true,
            data: saveProduct,
            message: "Product created successfully"
        });
    }catch (e){
        res.json({
            success: false,
            message: e.message
        })

    }
});

//GET/product/:id
app.get('/product/:_id', async (req, res) => {

    const { _id } = req.params

    const product = await Product.findOne({ _id: _id })
    res.json({
        success: true,
        data: product,
        message: "product fetched successfully"
    })
})

//put/product/:id
app.put('/product/:_id', async (req, res) => {
    const { _id } = req.params;

    const { name, description, price, image, category, brand } = req.body;

    await Product.updateOne({ _id: _id }, {
        $set: {
            name,
            description,
            price,
            image,
            category,
            brand
        }
    });

    const updateProduct = await Product.findOne({ _id: _id });

    res.json({
        success: true,
        data: updateProduct,
        message: "Product updated successfully"

    });
});

//delete/product/:id
app.delete('/product/:_id', async (req, res) => {
    const { _id } = req.params;
    const deleteProduct = await Product.deleteOne({ _id: _id });

    res.json({
        success: true,
        data: deleteProduct,
        message: "Product deleted successfully"
    })

})

//get/products/search?query
app.get('/product', async (req, res) => {
    const { q } = req.query;

    const searchProduct = await Product.find({ name: { $regex: q, $options: "i" } })

    res.json({
        success: true,
        data: searchProduct,
        message: "Product fetched successfully"
    })
})

//order API
//get/all orders/
app.get('/orders',async (req,res)=>{
    

    const orders=await Order.find().populate("user product");

    orders.forEach(order => {
        order.user.password=undefined;
    });

    res.json({
        success: true,
        data: orders,
        message: "Order display successfully"

    })
})

//post/order
app.post('/order', async (req, res) => {
    const { user, product, quantity, shippingAddress, deleveryCharges, status } = req.body;
    
    //create instance
    const order = new Order ({
        user,
        product,
        quantity,
        shippingAddress,
        deleveryCharges,
        status
    })

    try {
        const saveOrder = await order.save();
        res.json({
            success: true,
            data: saveOrder,
            message: "Order created successfully"
        });
    }
    catch(e){
        res.json({
            success: false,
            message: e.message,
        });
    }
});

//get/user/order/id
app.get('/order/:id', async (req, res) => {

  const {id} = req.params;

  const order = await Order.findOne({_id:id}).populate("user product");
 
   order.user.password=undefined;

    res.json({
        success: true,
        data: order,
        message: "Order fetched successfully"
    });
})

// //get/all orders from user/user/:id
app.get('/orders/:_id', async (req, res) => {
    const order =
        await Order.find().populate("user product");
    res.json({
        success: true,
        data: order,
        message: "Product fetched successfully"
    });
})

// //get/orders/user/:id
// app.get('/orders/user/:_id' ,async (req,res)=>{

//     const {_id}=req.params;

//     const orders =  await Order.find({user:_id}).populate("user product");

//     res.json({
//         success: true,
//         data: orders,
//         message: "Order fetched successfully"
//     });
// })

// //patch/order/status/:id
app.patch('/order/:id' ,async (req,res)=>{

    const {id} =req.params;
    const {status}=req.body;

    const STATUS_PRIORITY_MAP={
        pending:0,
        shipped:1,
        delivered:2,
        returned:3,
        canceled:4,
        rejected:5

    }

const order= await order.findById(id);
const currentStatus=order.status;

const currentPriority=STATUS_PRIORITY_MAP[currentStatus];
const newPriority=STATUS_PRIORITY_MAP[status];

if(currentPriority >newPriority){
    return res.json({
        success:false,
        message:`${status} cannot be send once order is ${currentPriority}`
    });
}

   await Order.updateOne({_id:id},{$set:{status:status}})

    res.json({
        success:true,
        message:"Order updated successfully"
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running :${PORT}`)
});
