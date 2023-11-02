import "./Buy.css"
import { Link } from "react-router-dom"
import { useParams,useState } from "react-router-dom"

function BuyPage(name, description, price, image) {
    const { id } = useParams()

    const [post, setPost] = useState({})

    useEffect(()=>{
        blogData.forEach((postObj)=>{
            if(postObj.id == id){
                setPost(postObj)
            }
        })
    }, [id])

    return (
        <>
        <div>
        <img src={image} className="img-card" />
                    <h1>{name}</h1><br />
                    <p>{description}</p><br />
                    <h3 className="price-card">₹{price} /-</h3><br /><br />
                    <Link to="/order/id" className="btn-card">
                       Order
                    </Link>
        </div>
        </>
       
       
            )
}
            export default BuyPage