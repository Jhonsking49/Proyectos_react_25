
import { useState } from "react"
import { useFetch } from "../hooks/useFetch";
import { getPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

const HomePage = () => {
    const [page, setPage] = useState(1);
    const [data, loading, error] = useFetch(()=> getPopularMovies(page), [page]);
    // que pasa con el scroll

    const handleChangePage = (newPage) => () => {
        if(newPage < 1) return;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setPage(newPage);
    }

    // si hay error
    if(error){
        return (
        <div className="text-center p-10">
            <h2 className="text-2xl font-bold text-red-500">
                Error al obtener las películas
            </h2>
            <p className="text-gray-600 mt-2">
                {error.message}
            </p>
        </div>

    )}
    return (
        <div className="w-full space-y-8 bg-[#121212]">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-[#FF007F] drop-shadow-[0_0_5px_#FF007F]">
                    Bienvenido a mi Videoclub
                </h1>
                <p className="text-[#1A1DFF] mt-2 font-medium text-lg drop-shadow-[0_0_3px_#1A1DFF]">
                    Descubre las películas más populares
                </p>
            </header>
            <section>
                <h2 className="text-2xl font-bold text-[#FFC72C] drop-shadow-[0_0_3px_#FFC72C]">
                    Películas Populares
                </h2>
                {loading ? (
                    <div className="text-[#FF007F]">Cargando Películas...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {data?.results.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                        <div className="flex justify-center space-x-4 mt-8">
                            <button 
                                onClick={handleChangePage(page - 1)} 
                                className="rounded-lg px-4 py-2 bg-[#FF007F] text-white hover:bg-[#FF007F]/80 transition-all duration-300"
                            >
                                Anterior
                            </button>
                            <button 
                                onClick={handleChangePage(page + 1)} 
                                className="rounded-lg px-4 py-2 bg-[#FF007F] text-white hover:bg-[#FF007F]/80 transition-all duration-300"
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

// Add the default export
export default HomePage;
