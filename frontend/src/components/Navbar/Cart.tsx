import { Product } from "../../lib/types";

interface CartProps {
    cartItems: Product[];
    isLoggedIn: boolean;
}

export default function Cart({ cartItems, isLoggedIn }: CartProps) {
    if (!isLoggedIn) {
        return (
            <div className="container mt-5">
                <h2 className="text-center text-danger">Hozzáférés megtagadva!</h2>
                <p className="text-center">Kérjük, jelentkezz be a kosár megtekintéséhez.</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center text-warning">Kosár</h2>
            {cartItems.length === 0 ? (
                <p className="text-center">A kosár üres.</p>
            ) : (
                <ul className="list-group">
                    {cartItems.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                            <span>{item.event} - {item.type} ({item.price} Ft)</span>
                            <span>Ülőhely: {item.seat}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
