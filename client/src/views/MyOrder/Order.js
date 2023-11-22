import "./Order.css"
import axios from "axios";
import Navbar from "./../../component/Navbar/Navbar"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const STATUS_BADGE_COLOR_MAP={
    "pending":"badge=dander",
    "shipped":"badge=warning",
    "deliverd":"badge=success"
}

function MyOrder() {
    const [user, setUser] = useState("");
    const [order, setOrder] = useState("")

    const loadOrders = (async () => {
        const userId = user._id;
        
        if (!userId) {
            return;
            // alert()
            // window.location.href("/login")
        }

        const response = await axios.get(`/orders/user/${user._id}`)
        setOrder(response?.data?.data);
    })

    useEffect(() => {
        loadOrders();
    }, [user])

    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem("user") || '{}');

        if (storageUser?.email) {
            setUser(storageUser);
        } else {
            alert("You are not Logged in !");
            window.location.href = '/login';
        }


    }, [])
    return (
        <>
            <Navbar />
            <h1>My order</h1>
            <div className="background-color order-container">
                {
                    order?.map((orders, index) => {
                        const {product,quantity,status,deleveryCharges}=orders;
                        return(
                            <>
                            <div className="ordercard">
                                <Link to={`/buy/${product._id}`} className="product-link">{product.name}</Link>
                                <h3>{product.price} x {quantity} = ₹{product.price * quantity}/-</h3>
                                <p>Delivery Charges : ₹{deleveryCharges}</p>
                                <h3 className={`order-status ${STATUS_BADGE_COLOR_MAP[status]}`}>
                                    {status} 
                                    </h3>

                                </div>
                                </>

                        )
                    })
                }
            </div>
        </>

    )
}
export default MyOrder