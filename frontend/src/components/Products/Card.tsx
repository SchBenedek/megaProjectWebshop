import { useEffect, useState } from "react";
import { Product } from "../../lib/types";
import { useParams } from "react-router-dom";

export default function Card(){
    const [product, setProduct]=useState<Product>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer]=useState<string>();
    let { id } = useParams();

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
        fetchProduct(parseInt(id));
    }, []);

    return<>
        <main className="container p-4 bg-warning text-dark rounded">
            <div className="card shadow-lg border-0">
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
                        <button className={`btn ${product?.availability ? 'btn-primary' : 'btn-secondary'} px-4 py-2`}
                            disabled={!product?.availability}>
                            Vásárlás
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </>
}