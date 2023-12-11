import React from 'react'
import './Item.css'
import {Link} from "react-router-dom";

function Item({product}) {
    return (
        <div className='item'>
            <Link to={`/product/${product.id}`}><img src={product.cover_image} alt=""/></Link>
            <p>{product.name}</p>
            <div className="item-prices">
                <div className="item-price-new">
                    ₹{(product.price - (product.discount/100)*product.price).toFixed(2)}
                </div>
                <div className="item-price-old">
                    {product.price}
                </div>
            </div>
        </div>
    )
}

export default Item;