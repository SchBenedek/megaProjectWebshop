import { useEffect, useState } from "react";
import { Profile } from "../../lib/types";
import LoginForm from "./LoginForm";

export default function Profiles(){
    const [profile, setProfile]=useState<Profile>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [errorServer, setErrorServer]=useState<string>();
    const [loggedIn, setLoggedIn]=useState(false);

    const fetchProfile=()=>{
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/profiles`)
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
            setProfile(data)
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
        })
    };

    const handleLogin = (username: string, password: string) => {
        setLoading(true);
        setError(null);

    fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Invalid credentials");
          }
          setLoggedIn(true);
          fetchProfile();
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    useEffect(() => {
        if (loggedIn) {
          fetchProfile();
        }
      }, [loggedIn]);
    
      if (!loggedIn) {
        <LoginForm onSubmit={handleLogin}/>
    };

    return (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {errorServer && <p style={{ color: "red" }}>{errorServer}</p>}
          {profile && (
            <div>
              <h1>Helló, {profile.name}</h1>
              <p>Email: {profile.email}</p>
            </div>
          )}
        </div>
      );
}