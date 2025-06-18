import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export const AuthContext = createContext({ user: null, auth: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const auth = getAuth();
    const [user, setUser] = useState(auth.currentUser);


    useEffect(() => {
        //Observer
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscribe;
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user, auth }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);