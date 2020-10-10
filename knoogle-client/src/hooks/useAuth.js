import { useEffect, useState } from "react";
import firebases from "../firebase";

function useAuthentication() {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebases.auth.onAuthStateChanged(user => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return authUser;
}

export default useAuthentication;
