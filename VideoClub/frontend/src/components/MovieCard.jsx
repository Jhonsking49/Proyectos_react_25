import { Link } from "react-router-dom"
import { getImageUrl, IMAGES_SIZE } from "../services/tmdb";
import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import '../styles/animations.css';

const MovieCard = ({ movie }) => {
    const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const isMovieFavorite = isFavorite(movie.id);

    return (
        <div className="hover-scale scale-in bg-[#121212] rounded-lg overflow-hidden shadow-lg border border-[#1A1DFF]">
            <Link to={`/movie/${movie.id}`} className="block relative group">
                <img
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="w-full h-auto transition-opacity duration-300 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <span className="text-[#FF007F] font-medium text-lg transform scale-0 group-hover:scale-100 transition-all duration-300">
                        Ver detalles
                    </span>
                </div>
            </Link>
            <div className="p-4 border-t border-[#1A1DFF]/30">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 hover:text-[#1A1DFF] transition-colors duration-300">
                    {movie.title}
                </h3>
                <div className="flex items-center justify-between">
                    <span className="text-[#FFC72C] flex items-center">
                        ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                    <button
                        onClick={() => isMovieFavorite ? removeFavorite(movie.id) : addFavorite(movie)}
                        className="text-2xl transition-transform duration-300 hover:scale-110 hover:text-[#FF007F]"
                    >
                        {isMovieFavorite ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
