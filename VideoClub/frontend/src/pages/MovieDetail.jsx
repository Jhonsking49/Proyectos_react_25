import { useContext } from 'react';
import { ReviewsContext } from '../contexts/ReviewsContext';
import ReviewForm from '../components/ReviewForm';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getMovieDetail, getMovieVideos, getImageUrl } from "../services/tmdb";
import { PacmanLoader } from "react-spinners";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, loading, error] = useFetch(() => getMovieDetail(id), [id]);
    const [videos] = useFetch(() => getMovieVideos(id), [id]);

    const trailer = videos?.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <PacmanLoader color="#1d4ed8" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-8">
                <h1 className="text-2xl font-bold">Error</h1>
                <p>{error.message}</p>
            </div>
        );
    }

    const backdropUrl = movie?.backdrop_path 
        ? getImageUrl(movie.backdrop_path, 'original')
        : 'https://via.placeholder.com/1920x1080?text=No+Backdrop+Available';

    const posterUrl = movie?.poster_path
        ? getImageUrl(movie.poster_path, 'w500')
        : 'https://via.placeholder.com/500x750?text=No+Poster+Available';
    
    const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
    const isMovieFavorite = movie ? isFavorite(movie.id) : false;
    
    const handleFavoriteClick = () => {
        if (isMovieFavorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };
    const { getMovieReviews } = useContext(ReviewsContext);
    const reviews = getMovieReviews(id); // Changed movieId to id
    return (
        <div className="relative min-h-screen w-full">
            {/* Background Image */}
            <div 
                className="absolute inset-0 z-0 w-full"
                style={{
                    backgroundImage: `url(${backdropUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.3)'
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="md:w-1/3">
                        <img
                            src={posterUrl}
                            alt={movie?.title || 'Movie Poster'}
                            className="rounded-lg shadow-xl w-full"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster+Available';
                            }}
                        />
                        {/* Buttons for future features */}
                        <div className="flex gap-4 mt-4">
                            <button 
                                onClick={handleFavoriteClick}  
                                className={`flex-1 py-2 px-4 rounded transition duration-200 ${
                                    isMovieFavorite 
                                        ? 'bg-red-600 hover:bg-red-700' 
                                        : 'bg-blue-600 hover:bg-blue-700'
                                } text-white`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill={isMovieFavorite ? "currentColor" : "none"} 
                                        viewBox="0 0 24 24" 
                                        strokeWidth={1.5} 
                                        stroke="currentColor" 
                                        className="w-6 h-6"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" 
                                        />
                                    </svg>
                                    {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Movie Details */}
                    <div className="md:w-2/3 text-white">
                        <h1 className="text-4xl font-bold mb-4">{movie?.title}</h1>
                        <div className="mb-4 text-lg">
                            <span>{new Date(movie?.release_date).getFullYear()}</span>
                            <span className="mx-2">•</span>
                            <span>{Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m</span>
                            <span className="mx-2">•</span>
                            <span>{movie?.vote_average?.toFixed(1)} ⭐</span>
                        </div>
                        
                        {/* Genres */}
                        <div className="flex gap-2 mb-6">
                            {movie?.genres?.map((genre) => (
                                <span 
                                    key={genre.id}
                                    className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        {/* Overview */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                            <p className="text-gray-300 leading-relaxed">{movie?.overview}</p>
                        </div>

                        {/* Trailer */}
                        {trailer && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                        title="Movie Trailer"
                                        className="w-full h-[400px] rounded-lg"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}
                        {/* Reviews Section */}
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                            <div className="space-y-4">
                                <ReviewForm movieId={id} />
                                
                                {reviews.length > 0 ? (
                                    reviews.map(review => (
                                        <div key={review.id} className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <span className="font-medium text-white">
                                                        {review.username}
                                                    </span>
                                                    <span className="ml-2 text-yellow-500">
                                                        {review.rating} ⭐
                                                    </span>
                                                </div>
                                                <span className="text-sm text-gray-400">
                                                    {new Date(review.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-300">{review.text}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-400">
                                        No hay reseñas todavía. ¡Sé el primero en opinar!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Remove the duplicate reviews section that was here */}
        </div>
    );
};

export default MovieDetail;
