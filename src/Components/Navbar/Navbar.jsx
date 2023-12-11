import {useContext, useState} from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import cart_icon from '../../assets/cart_icon.png';
import {Link} from "react-router-dom";
import {ShopContext} from "../../context/ShopContext.jsx";
import axios from "axios";
import {useCookies} from "react-cookie";

const Navbar = () => {
    const {getTotalCartItems, currentUser, setCurrentUser, cartItems} = useContext(ShopContext)
    const [menu, setMenu] = useState("shop");
    const  [cookies, setCookie, removeCookie] = useCookies(['authToken'])
    async function handleLogout() {
        try {
            const deleteCartResponse = await axios.delete(`http://localhost:5000/api/cart/${currentUser.id}`, {
                withCredentials: true,
            });
            console.log(deleteCartResponse);

            const addCartItemsResponse = await axios.post('http://localhost:5000/api/cart', {
                cartItems: cartItems,
                currentUser: currentUser,
            }, {
                withCredentials: true,
            });
            console.log(addCartItemsResponse)

            const logoutResponse = await axios.get('http://localhost:5000/api/users/logout')
            console.log(logoutResponse);

            setCurrentUser(null);

            removeCookie('authToken', {path: '/'})

        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt=""/>
                <p>SHOPPER</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => setMenu("shop")}><Link style={{textDecoration: 'none'}}
                                                          to='/'>Shop</Link>{menu === 'shop' ? <hr/> : <> </>}</li>
                <li onClick={() => setMenu("mens")}><Link style={{textDecoration: 'none'}}
                                                          to='/mens'>Mens</Link>{menu === 'mens' ? <hr/> : <> </>}</li>
                <li onClick={() => setMenu("women")}><Link style={{textDecoration: 'none'}}
                                                           to='/mens'>Women</Link>{menu === 'women' ? <hr/> : <> </>}
                </li>
                <li onClick={() => setMenu("kids")}><Link style={{textDecoration: 'none'}}
                                                          to='/mens'>Kids</Link>{menu === 'kids' ? <hr/> : <> </>}</li>
            </ul>
            <div className='nav-login-cart'>
                {currentUser === null ? <Link to='/login'>
                    <button>Login</button>
                </Link> : <Link to='/'>
                    <button onClick={handleLogout}>Logout</button>
                </Link>}
                <Link to='/cart'> <img src={cart_icon} alt=""/> </Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default Navbar;
