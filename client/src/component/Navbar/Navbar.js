import { useEffect, useState } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

function Navbar() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem("user") || '{}');
        setUser(storageUser);
    }, [])

    return (
        <>
            <div className="design flex">
                <div>
                    <Link to="/" className="font design">Apana Bazar🧺</Link>
                </div >

                <div className="flex ">
                    <Link to="/login" className="container design">Login</Link>
                    <Link to="/signup" className="container design"> Signup</Link>
                    <Link to="/order" className="container design">MyOrder</Link>
                </div>

                <div className="container ">
                    Hello,{user.name}
                </div>
            </div>
        </>
    )
}

export default Navbar