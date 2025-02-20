import { Link } from "react-router-dom"
import { getImageUrl, IMAGES_SIZE } from "../services/tmdb";

const MovieCard = ({ movie }) => {
    const posterUrl = movie.poster_path 
        ? getImageUrl(movie.poster_path, IMAGES_SIZE.POSTER)
        : 'https://via.placeholder.com/500x750?text=No+Image';

    return (
        <Link to={`/movie/${movie.id}`} className="block transition-transform hover:scale-105">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-[400px] object-cover"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                    }}
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {movie.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {new Date(movie.release_date).getFullYear()}
                    </p>
                    <div className="mt-2 flex items-center">
                        <span className="text-yellow-500">⭐</span>
                        <span className="ml-1 text-gray-600">
                            {movie.vote_average.toFixed(1)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
