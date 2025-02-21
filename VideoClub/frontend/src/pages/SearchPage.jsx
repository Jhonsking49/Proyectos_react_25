
import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { searchMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import SearchBox from '../components/SearchBox';
import { PacmanLoader } from 'react-spinners';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const [data, loading, error] = useFetch(
        () => debouncedQuery ? searchMovies(debouncedQuery, page) : null,
        [debouncedQuery, page]
    );

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        setPage(1);
    };

    const handleChangePage = (newPage) => {
        if (newPage < 1) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setPage(newPage);
    };

    return (
        <div className="w-full space-y-8 bg-[#121212]">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-[#FF007F] drop-shadow-[0_0_5px_#FF007F]">
                    Buscar Películas
                </h1>
                <div className="mt-6">
                    <SearchBox onSearch={handleSearch} />
                </div>
            </header>

            <section>
                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <PacmanLoader color="#FF007F" />
                    </div>
                ) : error ? (
                    <div className="text-center p-8">
                        <h2 className="text-2xl font-bold text-[#FF007F]">{error.message}</h2>
                    </div>
                ) : (
                    <>
                        {data?.results?.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {data.results.map((movie) => (
                                        <MovieCard key={movie.id} movie={movie} />
                                    ))}
                                </div>
                                <div className="flex justify-center space-x-4 mt-8">
                                    <button
                                        onClick={() => handleChangePage(page - 1)}
                                        disabled={page === 1}
                                        className={`rounded-lg px-4 py-2 ${
                                            page === 1
                                                ? 'bg-[#6B7280] cursor-not-allowed'
                                                : 'bg-[#FF007F] hover:bg-[#FF007F]/80'
                                        } text-white transition-all duration-300`}
                                    >
                                        Anterior
                                    </button>
                                    <span className="text-[#FFC72C] font-medium">
                                        Página {page} de {data.total_pages}
                                    </span>
                                    <button
                                        onClick={() => handleChangePage(page + 1)}
                                        disabled={page === data.total_pages}
                                        className={`rounded-lg px-4 py-2 ${
                                            page === data.total_pages
                                                ? 'bg-[#6B7280] cursor-not-allowed'
                                                : 'bg-[#FF007F] hover:bg-[#FF007F]/80'
                                        } text-white transition-all duration-300`}
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </>
                        ) : debouncedQuery ? (
                            <div className="text-center p-10">
                                <h2 className="text-2xl text-[#1A1DFF]">
                                    No se encontraron resultados
                                </h2>
                                <p className="text-[#6B7280] mt-2">
                                    Intenta con otros términos de búsqueda
                                </p>
                            </div>
                        ) : (
                            <div className="text-center p-10">
                                <h2 className="text-2xl text-[#1A1DFF]">
                                    Comienza tu búsqueda
                                </h2>
                                <p className="text-[#6B7280] mt-2">
                                    Escribe algo para buscar películas
                                </p>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default SearchPage;
