import { useEffect, useState } from "react";
import { Product } from "../../lib/types";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../Navbar/Navbar";

export default function Card(){
    const [product, setProduct]=useState<Product>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer]=useState<string>();
    const [loggedIn, setLoggedIn]=useState(false);
    let { id } = useParams();
    const navigate = useNavigate();

    const fetchProduct=(id:number)=>{
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/products/${id}`)
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
            setProduct(data)
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
        })
    }

    useEffect(() => {
        if (id) fetchProduct(parseInt(id));
    }, [id]);

    const handleExit=()=>{
        navigate(`/kiiras`);
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
        <main className="container p-1 bg-warning text-dark rounded">
            <div className="card shadow-lg border-0">
                <button 
                    className="btn-close position-absolute top-0 end-0 m-2" 
                    onClick={handleExit}>
                </button>
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">{product?.event}</h1>
                    <hr />
                    <p className="fw-bold">Jegy típusa:</p>
                    <p className="fs-5"><strong>{product?.type}</strong></p>
                    <hr />
                    <p className="fw-bold">Jegy ára:</p>
                    <p className="fs-5"><strong>{(product?.price || 0)*100} Ft</strong></p>
                    <hr />
                    <p className="fw-bold">Ülőhely: (Szektor - Sor - Szék)</p>
                    <p className="fs-5"><strong>{product?.seat}</strong></p>
                    <hr />
                    <p className="fs-5 fw-bold"
                        style={{ color: product?.availability ? 'green' : 'red' }}>
                        {product?.availability ? "Elérhető" : "Elfogyott"}
                    </p>
                    <div className="text-center mt-4">
                        <button className={`btn ${product?.availability ? 'btn-warning' : 'btn-secondary'} px-4 py-2`}
                            disabled={!product?.availability||!loggedIn}>
                            Vásárlás
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </>
}