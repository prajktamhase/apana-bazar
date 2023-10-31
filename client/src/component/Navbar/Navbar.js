import "./Navbar.css"
import { Link } from "react-router-dom"
function Navbar(){
      


    return(
        <>
        <div className="design flex">
            <div>
                <span className="font">Apana Bazar🧺</span>

            </div >

        
            <div >
            <Link to="/login" className="container">Login</Link>
            <Link to="/signup" className="container"> Signup</Link>
            <Link to="/order" className="container">My Order</Link>
            
            </div>


            <div className="container">
Hello user
            </div>

        </div>

        </>

    )
}

export default Navbar