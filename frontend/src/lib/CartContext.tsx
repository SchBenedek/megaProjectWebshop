// src/lib/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "./types";

interface CartContextProps {
    cartItems: Product[];
    addToCart: (product: Product) => void; 
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCartItems((prev) => [...prev, product]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
