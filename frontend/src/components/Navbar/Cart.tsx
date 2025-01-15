import { useEffect, useState } from "react";
import { Product } from "../../lib/types";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../lib/CartContext";
import { useAuth } from "../../lib/AuthContext";

export default function Card() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
    const { isLoggedIn } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/products/${id}`)
                .then((response) => response.json())
                .then((data) => setProduct(data))
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handlePurchase = () => {
        if (!product) return;
        addToCart(product);
        setProduct({ ...product, availability: false });
    };

    const handleExit = () => navigate("/kiiras");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Hiba történt: {error}</p>;

    return (
        <main className="container p-1 bg-warning text-dark rounded">
            <div className="card shadow-lg border-0">
                <button
                    className="btn-close position-absolute top-0 end-0 m-2"
                    onClick={handleExit}
                ></button>
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">{product?.event}</h1>
                    <hr />
                    <p className="fw-bold">Jegy típusa:</p>
                    <p className="fs-5">
                        <strong>{product?.type}</strong>
                    </p>
                    <hr />
                    <p className="fw-bold">Jegy ára:</p>
                    <p className="fs-5">
                        <strong>{(product?.price || 0) * 100} Ft</strong>
                    </p>
                    <hr />
                    <p className="fw-bold">Ülőhely: (Szektor - Sor - Szék)</p>
                    <p className="fs-5">
                        <strong>{product?.seat}</strong>
                    </p>
                    <hr />
                    <p
                        className="fs-5 fw-bold"
                        style={{
                            color: product?.availability ? "green" : "red",
                        }}
                    >
                        {product?.availability ? "Elérhető" : "Elfogyott"}
                    </p>
                    <div className="text-center mt-4">
                        <button
                            className={`btn ${
                                product?.availability ? "btn-warning" : "btn-secondary"
                            } px-4 py-2`}
                            disabled={!product?.availability || !isLoggedIn}
                            onClick={handlePurchase}
                        >
                            Vásárlás
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
