import { useState } from "react"
import { useFetch } from "../hooks/useFetch";
import { getPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";



const Home = () => {
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
        <div className="space-y-8">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-sky-950">
                    Bienvenido a mi Videoclub
                </h1>
                <p className="text-sky-900 mt-2 font-medium text-lg">
                    Descubre las películas más populares
                </p>
            </header>
            <section>
                <h2 className="text-2xl font-bold text-sky-950">
                    Peliculas Populares
                </h2>
                {loading ? (<div>Cargando Peliculas</div>) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {
                                data?.results.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))
                            }
                        </div>
                        <div className="flex justify-center space-x-4 mt-8">
                            <button onClick={handleChangePage(page - 1)} className="rounded-lg transition-colors px-4 py-2 duration-200 bg-sky-800 text-white hover:bg-sky-950">
                                Anterior
                            </button>
                            <span>
                                
                            </span>
                            <button onClick={handleChangePage(page + 1)} className="rounded-lg transition-colors px-4 py-2 duration-200 bg-sky-800 text-white hover:bg-sky-950">
                                Siguiente
                            </button>
                            <span>
                                
                            </span>
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}

export default Home