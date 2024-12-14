import { useEffect, useState } from "react";
import { Profile } from "../../lib/types";

export default function Profiles(){
    const [profile, setProfile]=useState<Profile>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer]=useState<string>();

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
    }

    useEffect(()=>{
        fetchProfile();
    });
}