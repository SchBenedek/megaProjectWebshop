import React, { useState } from "react";
import { Product } from "../../lib/types";
import { sortProducts } from "../../lib/utils";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface NavBarProps {
  products: Product[];
  setFilterProducts: (products: Product[]) => void;
  searchTerm: string;
  isLoggedIn: boolean;
}

export const NavBar = ({ products, setFilterProducts }: NavBarProps) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: "asc" | "desc" } | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): Product[] => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    return products.filter((product) =>
      product.event.toLowerCase().includes(term)
    );
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = handleSearch(e);
    setFilterProducts(filtered);
  };

  const handleSort = (key: keyof Product) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const { sortedProducts } = sortProducts(key, direction, products);
    setFilterProducts(sortedProducts);
    setSortConfig({ key, direction });
  };

  const handleClick = () => {
    navigate(`/cart/${id}`);
  };

  return (
    <header className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded shadow-sm p-3">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <strong>
                <a className="nav-link text-warning" href="/">
                  Kezdőlap
                </a>
              </strong>
            </li>
            <li className="nav-item">
              <a className="nav-link text-warning" href="/kiiras">
                Jegyek
              </a>
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
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSort("event")}
                  >
                    Esemény
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSort("type")}
                  >
                    Típus
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSort("price")}
                  >
                    Ár
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSort("seat")}
                  >
                    Ülőhely
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-flex ms-auto">
            {isLoggedIn && (
              <div className="d-flex align-items-center ms-3">
                <Link to="/cart" className="nav-link">
                  <i className="bi bi-cart text-warning fs-5"></i>
                </Link>
                <div className="dropdown ms-3">
                  <img
                    src="/images/profile.png"
                    alt="Profile"
                    className="rounded-circle"
                    width="40"
                    height="40"
                    role="button"
                    data-bs-toggle="dropdown"
                  />
                  <span
                    className="ms-2 text-warning"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Profile
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" onClick={() => {handleClick();}}>
                        Kosár
                      </a>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Kijelentkezés
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <form className="d-flex ms-auto">
            <input
              className="form-control me-2"
              type="text"
              value={searchTerm}
              onChange={onSearch}
              placeholder="Keresés..."
            />
          </form>
        </div>
      </nav>
    </header>
  );
};
