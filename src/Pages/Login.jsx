import React, {useContext, useState} from 'react'
import './CSS/Login.css'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {ShopContext} from "../context/ShopContext.jsx";

function Login() {
    const [email, setEmail] = useState('agarwal@gmail.com');
    const [password, setPassword] = useState('agarwal@gmail.com');
    const {setCurrentUser, addToCart} = useContext(ShopContext)
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/signin', {
                email, password,
            }, {
                withCredentials: true,
            });
            console.log(response)
            setCurrentUser({
                email: response.data.email,
                id: response.data.id,
            })
            const cartResponse = await axios.get(`http://localhost:5000/api/cart/${response.data.id}`, {
                withCredentials: true,
            });
            console.log(cartResponse)
            let cartItems = cartResponse.data.rows;
            console.log(cartItems)
            cartItems.forEach((item) => {
                addToCart(item.product_id, item.quantity)
            })
            navigate("/")
            // Perform any additional actions, such as redirecting to another page
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='login'>
            <div className="login-container">
                <h1>Login</h1>
                <div>
                    <form method='post' className="login-fields" onSubmit={handleSubmit}>
                        <label className='form-label'>Email</label>
                        <input type="text" value={'agarwal@gmail.com'} placeholder="abcd@example.com"
                               onChange={(e) => setEmail(e.target.value)}/>
                        <label className='form-label'>Password</label>
                        <input type="password" value={'agarwal@gmail.com'} placeholder="abcd@43"
                               onChange={(e) => setPassword(e.target.value)}/>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <p className="login-signup">Don't have an account? <Link to='/signup'><span>SignUp</span></Link></p>
            </div>
        </div>
    )
}

export default Login