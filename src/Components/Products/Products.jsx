import React, {useContext} from 'react'
import Item from "../../Components/Item/Item.jsx";
import './Products.css'
import {ShopContext} from "../../context/ShopContext.jsx";
function Products() {
    const {allProducts} = useContext(ShopContext)
    return (
        <div className='products'>
            <h1>All Products</h1>
            <hr/>
            <div className='products-item'>
                {allProducts.map((product, i) => {
                    return <Item key={i} product={product} />
                })}
            </div>
        </div>
    )
}

export default Products
