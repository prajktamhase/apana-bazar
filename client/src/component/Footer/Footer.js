import './Footer.css';
import { Link } from 'react-router-dom';
// import facebook from "./facebook - Copy.png";
// import insta from "./insta.png";
// import twitter from "./twitter.png"
// import In from "./in.png";

const Footer = () => {
    return (
        <>
        <div className="design">
        <h1 className='text-center'>Apna Bazar</h1><br />
                {/* <div className="flex">
                    <div>
                        <h1>Created by @PRAJKTA MHASE</h1>
                    </div>
                    <div className=''>
                        <h2 className=''>Quick Links</h2><br/>
                        <Link to="/" className='link-text color'>Home</Link><br />
                        <Link to="/blog" className='link-text color'>Blog</Link><br />
                        <Link to="/contact" className='link-text color'>Contact</Link><br />
                        <Link to="/about" className='link-text color'>About</Link><br />
                        <Link to="/login" className='link-text color'>Login</Link><br />
                    </div>
                  
                </div> */}
            </div>
        </>
    )
}
export default Footer