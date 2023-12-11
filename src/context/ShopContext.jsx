import React, {createContext, useState, useEffect} from "react";
import {useQuery} from 'react-query'
import axios from "axios";
import login from "../Pages/Login.jsx";

export const ShopContext = createContext(null);

// async function fetchProducts() {
//     const response = await axios.get("http://localhost:5000/api/products");
//     return response.data.items;
// }

// const getDefaultCart = (all_products) => {
//     const defaultCart = {};
//     for (let i = 0; i < all_products.length; i++) {
//         defaultCart[all_products[i].id] = 0;
//     }
//     return defaultCart;
// };

// async function getInitialData() {
//     const all_products = await fetchProducts();
//     const defaultCart = getDefaultCart(all_products);
//
//     return {
//         all_products,
//         defaultCart,
//     };
// }

function ShopContextProvider(props) {

    // const [data, setData] = useState(null);
    const {isLoading, error, data, isFetching} = useQuery('allProducts', async () =>
        await axios.get(
            "http://localhost:5000/api/products"
        ).then((res) =>
            res.data.items.rows
        ), {
        initialData: [], // Provide an initial empty array or any other initial data
        refetchOnWindowFocus: false, // Disable automatic refetching on window focus
    });
    const allProducts = data ? data : [];
    const [cartItems, setCartItems] = useState({});
    const [currentUser, setUser] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const {all_products, defaultCart} = await getInitialData();
    //
    //         setData({all_products, defaultCart});
    //         setCartItems(defaultCart);
    //     };
    //
    //     fetchData();
    // }, []);

    const setCurrentUser = (user) => {
        setUser(user);
    };
    const addToCart = (itemId, quantity = 1) => {
        setCartItems((prevCartItems) => ({
            ...prevCartItems,
            [itemId]: (prevCartItems[itemId] || 0) + quantity,
        }));
    };
    const removeFromCart = (itemId) => {
        setCartItems((prevCartItems) => ({
            ...prevCartItems,
            [itemId]: (prevCartItems[itemId] || 0) - 1,
        }));
    };

    const getTotalCartAmount = () => {
        let total = 0;
        for (let productId in cartItems) {
            const product = allProducts.find(e => e.id === Number(productId));
            const price = (product.price - (product.discount / 100) * product.price).toFixed(2);
            total += cartItems[productId] * price;
        }
        return total;
    };

    const getTotalCartItems = () => {
        let total = 0;
        for (let productId in cartItems) {
            total += cartItems[productId]
        }
        return total;
    }

    const contextValue = {
        allProducts,
        currentUser,
        setCurrentUser,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
