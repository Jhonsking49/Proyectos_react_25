import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LoginPage = () => {

    const { login } = useContext("AuthContext")

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div>
                <h2 className="text-3xl font-bold">Iniciar Sesión</h2>
                <p className="text-sm">Ingresa tus credenciales para iniciar sesión</p>
            </div>
            <div className="flex flex-col items-center justify-center w-full mt-10">
                <input 
                    type="text" 
                    placeholder="Usuario" 
                    value={username} 
                    onChange={handleUsernameChange} 
                    className="mb-4 rounded-md bg-gray-200 p-2"
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    className="mb-4 rounded-md bg-gray-200 p-2"
                />
                <button 
                    onClick={() => login(username, password)} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
