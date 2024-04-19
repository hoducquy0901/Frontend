import React, { useState } from "react";
import all_product from "../Components/Assets/all_product.js"
import { createContext } from "react";

export const ShopContext = createContext(null)

const getDefautltCart = () => {
    let cart = {};
    for(let i = 0; i < all_product.length +1; i++){
        cart[i] = 0;
    }
    return cart;
}
const ShopContextProvider = (props) =>{

    const [cartItems, setCartItem] = useState(getDefautltCart());
    
    console.log(cartItems);
    const addToCart = (itemId) => {
        setCartItem((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
        console.log(cartItems)
        alert("Item added to cart")
    }

    const RemoveFromCart = (itemId) => {
        setCartItem((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
        console.log(cartItems)
        alert("Item removed from cart")
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.new_price
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }

    const contextValue = {all_product, cartItems, addToCart, RemoveFromCart, getTotalCartAmount, getTotalCartItems};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;