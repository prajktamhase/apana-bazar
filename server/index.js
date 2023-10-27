import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "./Model/User";
import Product from "./Model/Product";

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
    const user = new UserActivation({
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

//login/post
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            success: false,
            message: "Plese enter email and password"
        })
    }

    const user = User.findOne({
        email,
        password
    })

    if (user) {
        return res.json({
            success: true,
            data: user,
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

//GET products
app.get("/products", async (req, res) => {
    const products =
        await Product.find();
    res.json({
        success: true,
        data: products,
        message: "Product fetched successfully"


    });
})

//Post products
app.post('product', async (req, res) => {
    const {name, description, price, image, category, brand} = req.body;

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
    catch(e){
        res.json({
            success:false,
            message:e.message
        })

    }
});

//GET/products/:id
app.get('products/:_id',async (req,res)=>{
    const{_id}=req.params;
    const product=await Product.findById(_id);
    res.json({
        success:true,
        data:product,
        message:"product fetched successfully"
    })
})

//put/product/:id
app.put('/product',async(req,res)=>{
    const {_id}=req.params;
    
    const {name,description, price,image,category,brand}=req.body;

  await Product.updateOne({_id : _id},{$set:{
        name,
        description,
        price,
        image,
        category,
        brand
    }});

    const updateProduct=await Product.findById(_id);
 
    res.json({
        success:true,
        data:updateProduct,
        message:"Product updated successfully"

    });
});

//delete/product/:id
app.delete('/product' ,async (req,res)=>{
    const{_id}=req.params;
    const deleteProduct= await Product.deleteOne({_id:_id});

    res.json({
        success:true,
        data:deleteProduct,
        message:"Product deleted successfully"
    })

})

//get/products/search?query
app.get('/products/search',async(req,res)=>{
    const q = req.query;

    const product=await Product.find({name:{$regex:q , $options:"i"}})

    res.json({
        success:true,
        data:deleteProduct,
        message:"Product fetched successfully"
    })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running :${PORT}`)

});
