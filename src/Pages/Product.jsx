import React, {useContext} from 'react'
import {ShopContext} from "../context/ShopContext.jsx";
import {useParams} from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum.jsx";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay.jsx";
function Product() {
    const {allProducts} = useContext(ShopContext)
    const {productId} = useParams()
    const product = allProducts.find((e) => e.id === Number(productId))
    return (
        <div>
            <Breadcrum product={product}/>
            <ProductDisplay product={product}/>
        </div>
    )
}

export default Product
