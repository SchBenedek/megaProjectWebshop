import NavBar from "../Navbar/Navbar";

export default function Kezdolap(){
    return<>
        <NavBar products={[]}
                filterProducts={[]}
                setFilterProducts={()=>[]}
                searchTerm={""} />
        <main className="container text-dark">
            <hr></hr>
            <div className="card shadow-lg border-0">
                <div className="card-body">
                <div className="card-body text-dark rounded">
                    <h1 className="card-title text-center mb-4 display-4 fw-bold text-warning">
                        Motorsport Jegyek
                    </h1>
                    <h2 className="text-center mb-3 text-warning-50">
                        Legnépszerűbb motorsport események egy helyen
                    </h2>
                    <hr className="border-2 border-dark mt-4 opacity-50" />

                </div>
                <section>
                    <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-lg-12 col-xl-11">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-5">
                            <p className="text-center h1 fw-bold mb-4">Bejelentkezés</p>
                            <form>
  
                                <div className="mb-3">
                                <label htmlFor="form3Example3c" className="form-label">
                                    Email:
                                </label>
                                <input type="email" id="form3Example3c" className="form-control" />
                                </div>
                                <div className="mb-3">
                                <label htmlFor="form3Example4c" className="form-label">
                                    Jelszó:
                                </label>
                                <input type="password" id="form3Example4c" className="form-control" />
                                </div>
                                <div className="text-center">
                                <button
                                    type="button"
                                    className="btn btn-warning px-4 py-2"
                                >
                                    Login
                                </button>
                                </div>
                            </form>
                            </div>
                            <div className="col-md-10 col-lg-6 col-xl-5 d-flex align-items-center">
                            <img
                                src="/images/login.jpg"
                                className="img-fluid rounded"
                                alt="Sample image"
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
                <hr></hr>
                <section>
                    <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-lg-12 col-xl-11">
                        <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 d-flex align-items-center">
                            <img
                                src="/images/register.jpg"
                                className="img-fluid rounded"
                                alt="Sample image"
                            />
                        </div>
                            <div className="col-md-10 col-lg-6 col-xl-5">
                            <p className="text-center h1 fw-bold mb-4">Regisztráció</p>
                            <form>
                                <div className="mb-3">
                                <label htmlFor="form3Example1c" className="form-label">
                                    Név:
                                </label>
                                <input type="text" id="form3Example1c" className="form-control" />
                                </div>
                                <div className="mb-3">
                                <label htmlFor="form3Example3c" className="form-label">
                                    Email:
                                </label>
                                <input type="email" id="form3Example3c" className="form-control" />
                                </div>
                                <div className="mb-3">
                                <label htmlFor="form3Example4c" className="form-label">
                                    Jelszó:
                                </label>
                                <input type="password" id="form3Example4c" className="form-control" />
                                </div>
                                <div className="mb-3">
                                <label htmlFor="form3Example4cd" className="form-label">
                                    Jelszó újra:
                                </label>
                                <input type="password" id="form3Example4cd" className="form-control" />
                                </div>
                                <div className="form-check mb-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="form2Example3c"
                                />
                                <label className="form-check-label" htmlFor="form2Example3c">
                                    Elfogadom a <a href="/feltetelek">felhasználási feltételeket </a>
                                </label>
                                </div>
                                <div className="text-center">
                                <button
                                    type="button"
                                    className="btn btn-warning px-4 py-2"
                                >
                                    Regisztrálok
                                </button>
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
                </div>
            </div>
        </main>

    </>
}