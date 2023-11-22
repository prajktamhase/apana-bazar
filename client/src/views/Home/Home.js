import "./Home.css"
import Navbar from "./../../component/Navbar/Navbar"
import { useEffect, useState } from "react"
import axios from "axios";
import ProductCard from "./../../component/ProductCard/ProductCard"
import Footer from "./../../component/Footer/Footer"

function Home() {

    const [products, setProduct] = useState([])
    const [search , setSearch]=useState('')

    const searchProduct=async()=>{
        if(search==""){
            loadProduct();
            return;
        }
        const response=await axios.get(`product?q=${search}`)
        setProduct(response?.data?.data);
    }

    
    useEffect(() => {
        searchProduct()
    }, [search]);

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
            <input type="text"
                value={search}
                placeholder="Search"
                className="search-bar"
                onChange={(e)=>{
                    setSearch(e.target.value)
                }}/>

            <div className="container-design">
                {
                    products?.map((product, index) => {
                        const {_id, name, description, price, image } = product;

                        return (<ProductCard 
                            key={index}
                            name={name}
                            description={description}
                            price={price}
                            image={image} 
                            id={_id}/>
                        )
                    })
                }
            </div>
            <Footer/>
        </>
    )
}
export default Home