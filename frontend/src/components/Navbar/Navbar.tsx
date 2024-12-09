export default function NavBar(){
    return<>
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded shadow-sm p-3">
                <a className="navbar-brand" href="/">
                    <h1 className="text-primary m-0">Tabletek</h1>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link text-secondary" href="/">Kezdőlap</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-secondary" href="/tabletFelvetel">Tablet felvétel</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-secondary" href="/tabletTorles">Tablet törlése</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-secondary" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Rendezés
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#" onClick={()=>sortPoducts("event", "asc")}>Esemény</a></li>
                                <li><a className="dropdown-item" href="#" onClick={()=>sortPoducts("type", "asc")}>Típus</a></li>
                                <li><a className="dropdown-item" href="#" onClick={()=>sortPoducts("price", "asc")}>Ár</a></li>
                                <li><a className="dropdown-item" href="#" onClick={()=>sortPoducts("seat", "asc")}>Ülőhely</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-secondary" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Találatok száma <span className="badge bg-primary text-wrap">{limit}</span>
                            </a>

                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item d-flex justify-content-center" href="#" onClick={()=>setLimit(25)}>25</a></li>
                                <li><a className="dropdown-item d-flex justify-content-center" href="#" onClick={()=>setLimit(50)}>50</a></li>
                                <li><a className="dropdown-item d-flex justify-content-center" href="#" onClick={()=>setLimit(75)}>75</a></li>
                                <li><a className="dropdown-item d-flex justify-content-center" href="#" onClick={()=>setLimit(100)}>100</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="availableCheckbox"
                            onChange={handleCheckboxChange}
                            checked={elerheto}
                        />
                        <label className="form-check-label text-secondary" htmlFor="availableCheckbox">
                            Csak elérhető
                        </label>
                    </div>
                    <form className="d-flex ms-auto">
                        <label>
                            <input className="form-control me-2" type="text" value={searchTerm} onChange={handleSearch} placeholder="Keresés..."/>
                        </label>
                    </form>
                </div>
            </nav>
        </header>
    </>
}