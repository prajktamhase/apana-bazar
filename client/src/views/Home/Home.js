import "./Home.css"
import Navbar from "./../../component/Navbar/Navbar"
import { useEffect, useState } from "react"
import ProductCard from "./../../component/ProductCard/ProductCard"

function Home() {
    
    const [product, setProduct] = useState('')

    useEffect(() => {
        const loadProduct = JSON.parse(localStorage.getItem("user") || '{}');
        setProduct(loadProduct);
    }, []);

    return (
        <>
            <Navbar />
            {/* <div>
                {
                    product.map((productcard, index) => {
                        const { name, description, price, image, category, brand } = productcard;
                    })
                    // <ProductCard  key={index} name={name} description={description} price={price} image={image} />
                }
            </div> */}
        </>
    )
}
export default Home