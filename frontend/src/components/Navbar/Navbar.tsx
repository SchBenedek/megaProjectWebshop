import React, { useState } from "react";
import { Product } from "../../lib/types";
import { sortProducts, handleSearch } from "../../lib/utils";
import { Link } from "react-router-dom";

interface NavBarProps {
    products: Product[];
    filterProducts: Product[];
    setFilterProducts: (products: Product[]) => void;
    searchTerm:string;
    isLoggedIn: boolean;
}

export default function NavBar({
    products,
    filterProducts,
    setFilterProducts,
    isLoggedIn,
}: NavBarProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Product | null;
        direction: "asc" | "desc";
    }>({ key: null, direction: "asc" });

    const handleSort = (key: keyof Product) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        const { sortedProducts } = sortProducts(key, direction, filterProducts);
        setFilterProducts(sortedProducts);
        setSortConfig({ key, direction });
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = handleSearch(e, term, filterProducts);
        setFilterProducts(filtered);
    };

    return (
        <header className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded shadow-sm p-3">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <strong><a className="nav-link text-warning" href="/">Kezdőlap</a></strong>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-warning" href="/kiiras">Jegyek</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle text-warning"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Rendezés
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <a className="dropdown-item" href="#" onClick={() => handleSort("event")}>
                                        Esemény
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" onClick={() => handleSort("type")}>
                                        Típus
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" onClick={() => handleSort("price")}>
                                        Ár
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" onClick={() => handleSort("seat")}>
                                        Ülőhely
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex ms-auto">
                        <input
                            className="form-control me-2"
                            type="text"
                            value={searchTerm}
                            onChange={onSearch}
                            placeholder="Keresés..."
                        />
                    </form>
                    {isLoggedIn && (
                        <Link to="/cart" className="nav-link ms-3">
                            <i className="bi bi-cart text-warning fs-5"></i> {/* Bootstrap cart icon */}
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
