import { useEffect, useState } from "react";
import "./ProductCard.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ProductCard({ _id, name, description, price, image }) {
 

    return (
        <>
            <div >
                <div className="product-card-design" >
                    <img src={image} className="img-card" />
                    <h1>{name}</h1><br />
                    <p>{description}</p><br />
                    <h3 className="price-card">₹{price} /-</h3><br /><br />
                    <Link to="/buy/:id" className="btn-card">
                        Buy Now
                    </Link>

                </div>
            </div>
        </>
    )
}
export default ProductCard;