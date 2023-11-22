import "./Buy.css"
import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react"
import Navbar from "./../../component/Navbar/Navbar"

function BuyPage({ _id,name, description, price, image, category, brand }) {

    const { id } = useParams()

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1);
    const [shippingAddress, setShippingAddress] = useState('');

    const loadDetails = async () => {

        if (!id) {
            return;
        }
        const response = await axios.get(`/product/${id}`)
        setProduct(response?.data?.data)
    }
    useEffect(() => {
        loadDetails();
    }, [])

    const increaseQuantity = () => {
        setQuantity(quantity + 1)

    }

    const decreaseQuantity = () => {
        if (quantity === 1) {
            return;
        }
        setQuantity(quantity - 1)
    }
  
    return (
        <>
            <Navbar />
            <div className="buy-product">
                <img src={product.image} className="img-card " alt={name} /><br/>
                <h1 className="text-center">{product.name}</h1><br />
                <p className="description-font">{product.description}</p><br />
                <h3 className="fontsize">Category :{product.category}</h3><br/>
                <h3 className="fontsize">Brand :{product.brand}</h3><br/>
                <h3 className="price-card">₹ {product.price} /-</h3><br /><br />
                <div>

                <span
                        onClick={decreaseQuantity}
                        className="increaseQuantity">
                         ➖
                    </span>
                   
                    <span
                        className="quality">{quantity}</span>
                         <span
                        onClick={increaseQuantity}
                        className="increaseQuantity">
                        ➕
                    </span>
                   
                </div>

                <input type="text"
                    placeholder="Enter Shipping Address"
                    value={shippingAddress}
                    onChange={(e) => {
                        setShippingAddress(e.target.value)
                    }}
                    className=" addressBox" />

                <Link to="/order/:_id" className="btn-card1">
                    Order
                </Link>
            </div>
        </>
    )
}
export default BuyPage