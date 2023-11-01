import "./Home.css"
import Navbar from "./../../component/Navbar/Navbar"
import { useState } from "react"

function Home (){
    const [product ,setProduct]=useState('')


    return(
        <>
        <Navbar/>
        <div>
            {
                product.map((productcard,index)=>{
                 const {name,
                    description,
                    price,
                    image,
                    category,
                    brand}=productcard;
                })
            }
        </div>


        </>
    )
}
export default  Home