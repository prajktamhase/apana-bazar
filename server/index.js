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
        console.log("MongoDB start")
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
            message: "Signup Successfully"

        });
    }
    catch (err) {
        res.json({
            success: true,
            data: saveUser,
            message: "e.message"
        })
    }
});

//login/get (access data fron signup)
app.get("/login", async (req, res) => {
    const { email, password } = req.body;

    const finduser = await User.findOne({
        email: email,
        password: password
    }).select('name mobile gender address')

    if (finduser) {
        return res.json({
            success: true,
            data: finduser,
            message: "Liogin successfully"
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
    }
    catch (e) {
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

    const orders=await orders.find().populate("user product");

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

    const { user, product, quantity, shippedAddress, deleveryCharges, status } = req.body;

    //create instance
    const order = {
        user,
        product,
        quantity,
        shippedAddress,
        deleveryCharges,
        status
    }

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
            message: e.message
        });

    }
});

//get/user/order/id
app.get('/order/:_id', async (req, res) => {
  const {id}=req.params;
  const order = await Order.findById(_id).populate("user product");
 
order.user.password=undefined;

    res.json({
        success: true,
        data: order,
        message: "Order fetched successfully"
    });
})

//get/all orders from user/user/:id
app.get('/orders', async (req, res) => {
    const order =
        await Order.find();
    res.json({
        success: true,
        data: order,
        message: "Product fetched successfully"
    });
})

//get/orders/user/:id
app.get('/orders/user/:_id' ,async (req,res)=>{

    const {_id}=req.params;

    const orders =  await Order.find({user:_id}).populate("user product");

    res.json({
        success: true,
        data: orders,
        message: "Order fetched successfully"
    });
})

//patch/order/status/:id
app.patch('/order/:_id' ,async (req,res)=>{

    const {_id} =req.params;
    const {status}=req.body;

   await Order.updateOne({_id:_id},{$set:{status:status}})

    req.response({
        success:true,
        message:"Order updated successfully"
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running :${PORT}`)
});
