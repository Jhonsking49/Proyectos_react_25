
import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import MovieCard from '../components/MovieCard';

const FavoritesPage = () => {
    const { favorites } = useContext(FavoritesContext);

    if (favorites.length === 0) {
        return (
            <div className="w-full space-y-8">
                <header className="text-center">
                    <h1 className="text-4xl font-bold text-sky-950">
                        Mis Películas Favoritas
                    </h1>
                </header>
                <div className="text-center p-10">
                    <h2 className="text-2xl text-gray-600">
                        No tienes películas favoritas todavía
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Añade películas a tus favoritos para verlas aquí
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-8">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-sky-950">
                    Mis Películas Favoritas
                </h1>
                <p className="text-sky-900 mt-2 font-medium text-lg">
                    {favorites.length} {favorites.length === 1 ? 'película' : 'películas'} en tu lista
                </p>
            </header>
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FavoritesPage;
