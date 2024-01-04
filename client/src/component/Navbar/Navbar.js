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
            <div className="design-gold flex">
                <div>
                    <Link to="/" className="font design-gold">Apana Bazar🧺</Link>
                </div >

                <div className="flex ">
                    <Link to="/login" className="container design-gold">Login</Link>
                    <Link to="/signup" className="container design-gold"> Signup</Link>
                    <Link to="/order" className="container design-gold">MyOrder</Link>
                </div>

                <div className="container ">
                    Hello,{user.name || "User"}

                    {
                        user?.name ? (<span
                            onClick={(() => {
                                localStorage.removeItem("user");
                                window.location.href = "/login";
                            })}>
                           <span className="log-btn"> Logout</span>
                        </span>) : null
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar