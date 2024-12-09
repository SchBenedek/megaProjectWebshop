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
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer]=useState<string>();
    const [searchTerm, setSearchTerm]=useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof Product, direction: "asc" | "desc" } | null>(null);
    const [elerheto, setElerheto]=useState<boolean>(false);
    
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
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
        })
    }

    const sortPoducts=(key: keyof Product, direction: "asc" | "desc")=>{
        const sortedProducts=[...filterProducts].sort((a, b)=>{
            if(a[key]<b[key]){
                return direction==="asc" ? -1 : 1;
            }
            if(a[key]>b[key]){
                return direction==="asc" ? 1 : -1;
            }
            return 0;
        });
        setFilterProducts(sortedProducts);
        setSortConfig({key, direction});
    };

    const handleSearch=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const term=event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = products.filter((product) => {

            if (elerheto && !product.availability) {
                return false;
            }

            const availabilityText = product.availability ? "available" : "unavailable";
    
            return (
                product.event.toLowerCase().includes(term) ||
                product.type.toLowerCase().includes(term) ||
                product.price.toString().toLowerCase().includes(term) ||
                availabilityText.includes(term) ||
                product.seat.toString().includes(term)
            );
        });
    
        setFilterProducts(filtered);
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setElerheto(event.target.checked);
        const term = searchTerm.toLowerCase();
        const filtered = products.filter((product) => {
            if (event.target.checked && !product.availability) {
                return false;
            }
    
            const availabilityText = product.availability ? "available" : "unavailable";
    
            return (
                product.event.toLowerCase().includes(term) ||
                product.type.toLowerCase().includes(term) ||
                product.price.toString().toLowerCase().includes(term) ||
                availabilityText.includes(term) ||
                product.seat.toString().includes(term)
            );
        });
    
        setFilterProducts(filtered);
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
        <main>

        </main>
        <footer>

        </footer>
    </>

}