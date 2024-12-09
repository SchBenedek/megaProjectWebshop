import { useState, useEffect } from "react";
import { Product } from "../../lib/types";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "../Navbar/Navbar";

export default function Products(){
    const [products, setProducts] = useState<Product[]>([]);
    const [filterProducts, setFilterProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer]=useState<string>();
    const [searchTerm, setSearchTerm]=useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof Product, direction: "asc" | "desc" } | null>(null);
    const [elerheto, setElerheto]=useState<boolean>(false);
    
    const fetchProducts=()=>{
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/megapropjectwebshop`)
        .then((response) => {
            if (response.status === 404) {
                setErrorServer('A kért erőforrás nem található (404)!');
            }
            if (!response.ok) {
                setErrorServer(`Server responded with status ${response.status}`);
            }
            return response.json()
        })
        .then((data)=>{
            setProducts(data)
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
        })
    }


    if (errorServer) {
        return <p>{errorServer}</p>
    }
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Hiba történt: {error}.</p>
    }

    return<>
    <NavBar fetchResult={[]} searchTerm={""}/>
        <main>

        </main>
        <footer>

        </footer>
    </>

}