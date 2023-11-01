import "./ProductCard.css";

function ProductCard(name, description, price, image) {
    return (
        <>
            <div className="product-card-design">
                <img src={image} className="img-card" />
                <h1>{name}</h1>
                <p>{description}</p>
                <h3>{price}</h3>
                <button type="button" className="btn">Buy Now</button>
            </div>
        </>
    )
}
export default ProductCard;