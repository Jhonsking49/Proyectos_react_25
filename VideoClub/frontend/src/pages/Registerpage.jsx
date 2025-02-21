
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
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

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            if (response.ok) {
                navigate("/login");
            } else {
                const data = await response.json();
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            setError("An error occurred during registration");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212]">
            <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-96 border border-[#1A1DFF]">
                <h2 className="text-3xl font-bold text-[#FF007F] mb-6 text-center drop-shadow-[0_0_5px_#FF007F]">
                    Registro
                </h2>
                {error && (
                    <div className="bg-[#FF007F]/20 text-[#FF007F] p-3 rounded mb-4 text-center border border-[#FF007F]">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-[#FFC72C] mb-2">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-[#121212] text-white border border-[#1A1DFF] focus:border-[#FF007F] focus:ring-1 focus:ring-[#FF007F] focus:outline-none transition-all duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-[#FFC72C] mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-[#121212] text-white border border-[#1A1DFF] focus:border-[#FF007F] focus:ring-1 focus:ring-[#FF007F] focus:outline-none transition-all duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-[#FFC72C] mb-2">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-[#121212] text-white border border-[#1A1DFF] focus:border-[#FF007F] focus:ring-1 focus:ring-[#FF007F] focus:outline-none transition-all duration-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#FF007F] text-white py-2 rounded hover:bg-[#FF007F]/80 transition-all duration-300"
                    >
                        Registrarse
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <a href="/login" className="text-[#1A1DFF] hover:text-[#FF007F] transition-colors duration-300">
                        ¿Ya tienes una cuenta? Inicia sesión
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
