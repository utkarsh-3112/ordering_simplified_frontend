import React, {useContext} from "react";
import './CartItem.css'
import {ShopContext} from "../../context/ShopContext.jsx";
import remove_icon from '../../assets/cart_cross_icon.png'


function CartItem() {
    const {allProducts, addToCart, removeFromCart, cartItems, getTotalCartAmount} = useContext(ShopContext)

    function checkout() {

    }


    return (
        <div className='cart-items'>
            <div className="cart-items-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr/>
            {
                Object.entries(cartItems).map(([itemId, quantity]) => {
                    const product = allProducts.find(e => e.id === Number(itemId));

                    if (!product || quantity <= 0) {
                        return null;
                    }
                    console.log(product)
                    const new_price = (product.price - (product.discount / 100) * product.price).toFixed(2);

                    return (
                        <div className="cart-items-format cart-items-format-main" key={itemId}>
                            <img src={product.cover_image} alt="" className='cart-icon-product-icon'/>
                            <p>{product.name}</p>
                            <p>₹{new_price}</p>
                            <button className="cart-item-quantity-icon">{quantity}</button>
                            <p>{(new_price * quantity).toFixed(2)}</p>
                            <img
                                src={remove_icon}
                                alt=""
                                className='cart-item-remove-icon'
                                onClick={() => removeFromCart(itemId)}
                            />
                        </div>
                    );
                })
            }
            <div className='cart-items-down'>
                <div className="cart-items-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cart-items-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cart-items-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr/>
                        <div className="cart-items-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()} </h3>
                        </div>
                    </div>
                    <button onClick={checkout}>Proceed to checkout</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem