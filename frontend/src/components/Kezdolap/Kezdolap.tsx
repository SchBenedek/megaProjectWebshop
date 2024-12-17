import NavBar from "../Navbar/Navbar";
import LoginForm from "../Profiles/LoginForm";
import RegisterForm from "../Profiles/RegisterForm";
import { useState } from "react";

export default function Kezdolap() {
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null); 
    const [isLoggedIn, SetIsLoggedIn]=useState(false);

    const handleLogin = async (email: string, password: string) => {
      setLoginError(null);
    
      try {
        const response = await fetch("http://localhost:3000/profiles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error("A szerver nem érhető el!");
        }
    
        const profiles = await response.json();
    
        const user = profiles.find((profile: any) => profile.email === email);
    
        if (!user) {
          throw new Error("Az email nem található a rendszerben!");
        }
    
        if (user.password !== password) {
          throw new Error("Hibás jelszó!");
        }
    
        console.log("Login successful:", user);
        alert("Sikeres bejelentkezés!");
      } catch (error: any) {
        setLoginError(error.message);
      }
    };
    

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    setRegisterError(null);
    setRegisterSuccess(null);

    if (password !== confirmPassword) {
      setRegisterError("A jelszavak nem egyeznek meg!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "A regisztráció sikertelen!");
      }

      setRegisterSuccess("Sikeres regisztráció! Jelentkezzen be!");
    } catch (error: any) {
      setRegisterError(error.message);
    }
  };

  return (
    <>
      <NavBar
        products={[]}
        filterProducts={[]}
        setFilterProducts={() => []}
        searchTerm={""}
      />
      <main className="container text-dark">
        <hr />
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
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5">
                    <LoginForm onSubmit={handleLogin} />
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-4 d-flex align-items-center">
                    <img
                      src="/images/login.jpg"
                      className="img-fluid rounded"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </section>
            <hr />
            <section>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-4 d-flex align-items-center">
                    <img
                      src="/images/register.jpg"
                      className="img-fluid rounded"
                      alt="Sample image"
                    />
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-5">
                    <RegisterForm onSubmit={handleRegister} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
