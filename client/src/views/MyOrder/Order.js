import "./Order.css"
import Navbar from "./../../component/Navbar/Navbar"
import { useEffect, useState } from "react"

function MyOrder(){
    const [user ,setUser]= useState("");
     
    useEffect(()=>{
        const storageUser = JSON.parse(localStorage.getItem("user") || '{}');

        if(storageUser?.email){
            setUser(storageUser);
        } else {
            alert("You are not Logged in !");
            window.location.href = '/login';
        }

    },[])
    return(
        <>
        <Navbar/>
        <div className="background-color">My order</div>
        </>
       
    )
}
export default MyOrder