import "./App.css";
import React from "react";
import Navbar from "./Components/Navbar/navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Signup from "./Pages/Signup.jsx";

function App() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Shop/>}/>
                        <Route path="/mens" element={<ShopCategory category="men"/>}/>
                        <Route path="/womens" element={<ShopCategory category="women"/>}/>
                        <Route path="/kids" element={<ShopCategory category="kid"/>}/>
                        <Route path="/product" element={<Product/>}>
                            <Route path=":productId" element={<Product/>}/>
                        </Route>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;