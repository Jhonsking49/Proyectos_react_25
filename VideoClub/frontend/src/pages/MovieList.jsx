
import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { getPopularMovies, searchMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { PacmanLoader } from 'react-spinners';
import { getMovieDetails } from '../services/tmdb';

const MovieList = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        category: 'popular',
        year: '',
        rating: '',
        duration: ''
    });

    const [data, loading, error] = useFetch(() => getPopularMovies(page), [page]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [moviesWithDetails, setMoviesWithDetails] = useState([]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (data?.results) {
                const detailedMovies = await Promise.all(
                    data.results.map(async (movie) => {
                        try {
                            const details = await getMovieDetails(movie.id);
                            return { ...movie, runtime: details.runtime };
                        } catch (error) {
                            console.error(`Error fetching details for movie ${movie.id}:`, error);
                            return { ...movie, runtime: 0 };
                        }
                    })
                );
                setMoviesWithDetails(detailedMovies);
            }
        };

        fetchMovieDetails();
    }, [data]);

    useEffect(() => {
        if (moviesWithDetails.length > 0) {
            let filtered = [...moviesWithDetails];

            // Filter by year
            if (filters.year) {
                filtered = filtered.filter(movie => 
                    movie.release_date?.split('-')[0] === filters.year
                );
            }

            // Filter by rating
            if (filters.rating) {
                filtered = filtered.filter(movie => 
                    movie.vote_average >= parseFloat(filters.rating)
                );
            }

            // Filter by duration
            if (filters.duration) {
                const [min, max] = filters.duration.split('-').map(Number);
                filtered = filtered.filter(movie => 
                    movie.runtime >= min && movie.runtime <= max
                );
            }

            setFilteredMovies(filtered);
        } else {
            setFilteredMovies(data?.results || []);
        }
    }, [moviesWithDetails, filters, data]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="w-full space-y-8 bg-[#121212]">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-[#FF007F] drop-shadow-[0_0_5px_#FF007F]">
                    Explorar Películas
                </h1>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <select
                        name="year"
                        value={filters.year}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded-lg bg-[#121212] border-2 border-[#1A1DFF] text-white 
                                hover:border-[#FF007F] focus:border-[#FF007F] focus:ring-1 focus:ring-[#FF007F] 
                                transition-all duration-300 hover:shadow-[0_0_10px_#1A1DFF]"
                    >
                        <option value="">Año de estreno</option>
                        {Array.from({ length: 25 }, (_, i) => 
                            new Date().getFullYear() - i
                        ).map(year => (
                            <option key={year} value={year} className="bg-[#121212]">{year}</option>
                        ))}
                    </select>

                    <select
                        name="rating"
                        value={filters.rating}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded-lg bg-[#121212] border-2 border-[#1A1DFF] text-white 
                                 hover:border-[#FF007F] focus:border-[#FF007F] focus:ring-1 focus:ring-[#FF007F] 
                                 transition-all duration-300 hover:shadow-[0_0_10px_#1A1DFF]"
                    >
                        <option value="">Valoración mínima</option>
                        {[9, 8, 7, 6, 5].map(rating => (
                            <option key={rating} value={rating} className="bg-[#121212]">{rating}+ ⭐</option>
                        ))}
                    </select>

                    <select
                        name="duration"
                        value={filters.duration}
                        onChange={handleFilterChange}
                        className="px-4 py-2 rounded-lg bg-[#121212] border-2 border-[#1A1DFF] text-white 
                                 hover:border-[#FF007F] focus:border-[#FF007F] focus:ring-1 focus:ring-[#FF007F] 
                                 transition-all duration-300 hover:shadow-[0_0_10px_#1A1DFF]"
                    >
                        <option value="">Duración</option>
                        <option value="0-90" className="bg-[#121212]">Menos de 90 min</option>
                        <option value="90-120" className="bg-[#121212]">90-120 min</option>
                        <option value="120-150" className="bg-[#121212]">120-150 min</option>
                        <option value="150-999" className="bg-[#121212]">Más de 150 min</option>
                    </select>
                </div>
            </header>

            <section>
                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <PacmanLoader color="#FF007F" />
                    </div>
                ) : error ? (
                    <div className="text-center text-[#FF007F] p-8">
                        <h2 className="text-2xl font-bold drop-shadow-[0_0_3px_#FF007F]">Error</h2>
                        <p>{error.message}</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        {filteredMovies.length === 0 && (
                            <div className="text-center p-10">
                                <h2 className="text-2xl text-[#1A1DFF] drop-shadow-[0_0_3px_#1A1DFF]">
                                    No se encontraron películas
                                </h2>
                                <p className="text-[#6B7280] mt-2">
                                    Prueba con otros filtros
                                </p>
                            </div>
                        )}

                        {filteredMovies.length > 0 && (
                            <div className="flex justify-center space-x-4 mt-8">
                                <button
                                    onClick={() => setPage(prev => prev - 1)}
                                    disabled={page === 1}
                                    className={`rounded-lg px-4 py-2 transition-all duration-300 ${
                                        page === 1
                                            ? 'bg-[#6B7280] cursor-not-allowed'
                                            : 'bg-[#FF007F] hover:bg-[#FF007F]/80 hover:shadow-[0_0_10px_#FF007F]'
                                    } text-white`}
                                >
                                    Anterior
                                </button>
                                <span className="text-[#FFC72C] font-medium drop-shadow-[0_0_3px_#FFC72C]">
                                    Página {page}
                                </span>
                                <button
                                    onClick={() => setPage(prev => prev + 1)}
                                    className="rounded-lg px-4 py-2 bg-[#FF007F] hover:bg-[#FF007F]/80 
                                             text-white transition-all duration-300 hover:shadow-[0_0_10px_#FF007F]"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default MovieList;
