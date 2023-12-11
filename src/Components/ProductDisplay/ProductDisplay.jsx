import React, {useCallback, useContext} from "react";
import './ProductDisplay.css'
import {ShopContext} from "../../context/ShopContext.jsx";
function ProductDisplay({product}) {
    const {addToCart, removeFromCart} = useContext(ShopContext);
    return(
        <div className='product-display'>
            <div className="product-display-left">
                <div className="product-display-img">
                    <img src={product.cover_image} alt=""/>
                </div>

            </div>
            <div className="product-display-right">
                <h1>{product.name}</h1>
                <div className="product-display-right-prices">
                    <div className="product-display-right-price-old">₹{product.price}</div>
                    <div className="product-display-right-price-new"> ₹{(product.price - (product.discount/100)*product.price).toFixed(2)}</div>
                </div>
                <div className="product-display-right-description">
                    <p>{product.description}</p>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>Add to Cart</button>
            </div>
        </div>
    )
}
export default ProductDisplay