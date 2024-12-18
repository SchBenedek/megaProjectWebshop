import { useState, useEffect } from "react";
import { Product } from "../../lib/types";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import { sortProducts } from "../../lib/utils";
import Card from "./Card";
import { useNavigate } from "react-router-dom";


export default function Products(){
    const [products, setProducts] = useState<Product[]>([]);
    const [filterProducts, setFilterProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer]=useState<string>();
    const [searchTerm, setSearchTerm]=useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof Product, direction: "asc" | "desc" } | null>(null);
    const [elerheto, setElerheto]=useState<boolean>(false);
    const navigate = useNavigate();

    
    const fetchProducts=()=>{
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/products`)
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
            setFilterProducts(data)
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
        })
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleClick = (id:number) => {
        navigate(`/products/${products[id].id}`);
      };

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
        <NavBar products={products}
                filterProducts={filterProducts}
                setFilterProducts={setFilterProducts}
                searchTerm={""} 
                isLoggedIn={true}/>
        <p></p>
        <main className="container">
            <div className="row">
                    {filterProducts.map((product) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={product.id} onClick={()=>{handleClick(product.id-1)}}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title font-weight-bold text-warning">
                                        {product.event}
                                    </h5>
                                    <p className="card-text text-muted">
                                        <strong>Típus:</strong> {product.type}<br />
                                        <strong>Ár:</strong> {product.price*100} Ft<br />
                                        <strong>Ülőhely:</strong> {product.seat}<br />
                                        <span style={{ color: product.availability ? 'green' : 'red' }}>
                                            <strong>{product.availability ? "Elérhető" : "Elfogyott"}</strong>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        <footer>

        </footer>
    </>

}