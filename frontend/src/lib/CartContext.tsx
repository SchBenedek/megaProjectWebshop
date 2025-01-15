import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "./types";

// Define the CartContext structure
interface CartContextProps {
    cartItems: Product[];
    addToCart: (product: Product) => void;
}

// Initialize context with a default value
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Define the CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCartItems((prevCart) => [...prevCart, product]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to use the CartContext
export const useCart = (): CartContextProps => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
