import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            const success = await login(formData.username, formData.password);
            if (success) {
                navigate("/");
            } else {
                setError("Credenciales inválidas");
            }
        } catch (err) {
            setError("Ocurrió un error durante el inicio de sesión");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212]">
            <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-96 border-2 border-[#1A1DFF] hover:shadow-[0_0_15px_#1A1DFF] transition-all duration-300">
                <h1 className="text-4xl font-bold text-[#FF007F] mb-6 text-center drop-shadow-[0_0_5px_#FF007F]">
                    Login
                </h1>
                {error && (
                    <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-[#FFC72C] mb-2 font-medium">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-[#121212] text-white border-2 border-[#1A1DFF] 
                                     focus:border-[#FF007F] focus:outline-none focus:ring-1 focus:ring-[#FF007F] 
                                     transition-all duration-300 hover:border-[#FF007F]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-[#FFC72C] mb-2 font-medium">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-[#121212] text-white border-2 border-[#1A1DFF] 
                                     focus:border-[#FF007F] focus:outline-none focus:ring-1 focus:ring-[#FF007F] 
                                     transition-all duration-300 hover:border-[#FF007F]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#FF007F] text-white py-3 rounded-lg hover:bg-[#FF007F]/80 
                                 transition-all duration-300 font-medium text-lg hover:shadow-[0_0_10px_#FF007F]"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <a 
                        href="/register" 
                        className="text-[#1A1DFF] hover:text-[#FF007F] transition duration-300 
                                 font-medium drop-shadow-[0_0_3px_#1A1DFF] hover:drop-shadow-[0_0_3px_#FF007F]"
                    >
                        ¿No tienes cuenta? Regístrate
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;