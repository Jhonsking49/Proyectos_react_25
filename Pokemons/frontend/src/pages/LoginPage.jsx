import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../router/path';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(formData.username, formData.password);
        if (success) {
            navigate(ROUTES.HOME);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#000000]">
            <div className="bg-[#000000] p-8 rounded-lg shadow-lg w-96 border border-[#00B0FF]">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#00B0FF]">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-[#B0BEC5]">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border border-[#00B0FF] rounded mt-1 bg-transparent text-[#B0BEC5] focus:outline-none focus:ring-2 focus:ring-[#00B0FF]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-[#B0BEC5]">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-[#00B0FF] rounded mt-1 bg-transparent text-[#B0BEC5] focus:outline-none focus:ring-2 focus:ring-[#00B0FF]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#00B0FF] text-white py-2 rounded hover:bg-[#8E24AA] transition-colors duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;