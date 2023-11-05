import {  useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";


function ProductCard({id, name, description, price, image }) {
   

    return (
        <>
            <div >
               
                <div className="product-card-design" >
                    <img src={image} className="img-card" />
                    <h1>{name}</h1><br />
                    <p>{description}</p><br />
                    <h3 className="price-card">₹{price} /-</h3><br /><br />
                    <Link to={`/buy/${id}`} className="btn-card">
                        Buy Now
                    </Link>

                </div>
            </div>
        </>
    )
}
export default ProductCard;