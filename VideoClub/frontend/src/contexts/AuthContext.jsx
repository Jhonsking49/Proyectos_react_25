import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    //---------------------------------------Declaración de estados del contexto-------------------------------------------

    const [user, setUser] = useState(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        return user ? JSON.parse(user) : null;
    });

    const [token, setToken] = useState(()=> {
        const token = localStorage.getItem("token");
        return token ? JSON.parse(token) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
        //localStorage.getItem("token") === "true"? true : false;
        /* !!localStorage.getItem("token");*/
        token? true : false;
    });

    const [authError, setAuthError] = useState(false);

    //---------------------------Declaracion de funciones que utilizarán los estados del contexto-----------------------------

    // cuando haces un login, te devolverá un token si el usuario y contraseña son correctos
    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        setIsAuthenticated(true);
        //guardo los cambios en el localStorage
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(userData));
        setAuthError(false);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };


    const value = {
        user,
        token,
        isAuthenticated,
        authError,
        setAuthError,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}