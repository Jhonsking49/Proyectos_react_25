import { useState } from "react";

const ProtectedRoute = () => {

    const [auth, setAuth] = useState({
        username: "",
        password: ""
    });
    
    const handleLogin = (e) => {
        e.preventDefault();
        setAuth({
            username: e.target.username.value,
            password: e.target.password.value
        });
        console.log(auth);
    }
    
    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="Usuario" />
                <input type="password" name="password" placeholder="Contraseña" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default ProtectedRoute