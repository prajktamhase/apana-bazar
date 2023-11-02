import "./Home.css"
import Navbar from "./../../component/Navbar/Navbar"
import { useEffect, useState } from "react"
import axios from "axios";
import ProductCard from "./../../component/ProductCard/ProductCard"

function Home() {

    const [products, setProduct] = useState([])

    const loadProduct = async () => {
        try {
            const response = await axios .get("products");
            setProduct(response?.data?.data)
        }
        catch (e) {
            console.log(e)
            alert("Error Loading product")
        }
    };

    useEffect(() => {
        loadProduct()
    }, []);

    return (
        <>
            <Navbar />
            <div className="container-design">
                {
                    products?.map((product, index) => {
                        const {_id, name, description, price, image } = product;

                        return (<ProductCard 
                            key={index}
                            name={name}
                            description={description}
                            price={price}
                            image={image} />
                        )
                    })
                }
            </div>
        </>
    )
}
export default Home