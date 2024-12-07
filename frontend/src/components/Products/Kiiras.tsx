import { useState, useEffect } from "react";

interface Product{
    id: number;
    event: string;
    type: string;
    price: number;
    availability: boolean;
    seat: string;
}

export default function Products(){
    const [products, setProducts] = useState<Product[]>([]);
    const [filterProducts, setFilterProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
}