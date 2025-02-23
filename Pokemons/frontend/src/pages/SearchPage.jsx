import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchPokemonByName } from "../hooks/useFetch";

const SearchPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetchPokemonByName(search);
            navigate(`/search/${search.toLowerCase()}`);
        } catch (error) {
            toast.error("Pokemon no encontrado", {
                style: {
                    background: "#000000",
                    border: "1px solid #FF1744",
                    color: "#FF1744",
                }
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-[#00B0FF] text-center">
                Buscar Pokemon
            </h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ingresa el nombre del Pokemon"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-3 bg-[#000000] border-2 border-[#00B0FF] rounded-lg 
                                     text-[#B0BEC5] placeholder-[#8E24AA] 
                                     focus:outline-none focus:border-[#FF1744] focus:ring-2 focus:ring-[#FF1744]
                                     transition-all duration-300"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg 
                                className="w-6 h-6 text-[#00B0FF]" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                />
                            </svg>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#00B0FF] text-white py-3 rounded-lg
                                 hover:bg-[#8E24AA] transform hover:scale-105
                                 transition-all duration-300 font-medium
                                 shadow-[0_0_15px_rgba(0,176,255,0.3)]"
                    >
                        Buscar Pokemon
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchPage;