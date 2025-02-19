import { Link } from "react-router-dom"
import { getImageUrl } from "../services/tmdb"

const MovieCard = ({ movie }) => {
    //console.log(movie);
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
    return (
        <Link to={`/movie/${movie.id}`} className="bg-sky-800">
            <article className="card transform transition-transform duration-300 hover:scale-105">
            <div className="relative aspect-[2/3]">
                <img
                src={movie.poster_path ? getImageUrl("w500", movie.poster_path) : "/placeholder-movie.jpg"} 
                alt={movie.title} 
                className="object-cover w-full h-full rounded-lg shadow-lg"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white py-1  px-2 rounded">
                ⭐ {rating}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg line-clamp-2 text-white">{movie.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2" >
                {movie.release_date}
                </p>
            </div>
            </article>
        </Link>
        );
};

export default MovieCard;
