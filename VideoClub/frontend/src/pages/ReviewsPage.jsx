
import { useContext, useEffect, useState } from 'react';
import { ReviewsContext } from '../contexts/ReviewsContext';
import { Link } from 'react-router-dom';
import { getMovieDetail } from '../services/tmdb';

const ReviewsPage = () => {
    const { reviews } = useContext(ReviewsContext);
    const [moviesData, setMoviesData] = useState({});

    useEffect(() => {
        const fetchMoviesData = async () => {
            const movieIds = Object.keys(reviews);
            const moviesInfo = {};

            for (const movieId of movieIds) {
                try {
                    const movieData = await getMovieDetail(movieId);
                    moviesInfo[movieId] = movieData;
                } catch (error) {
                    console.error(`Error fetching movie ${movieId}:`, error);
                }
            }

            setMoviesData(moviesInfo);
        };

        if (Object.keys(reviews).length > 0) {
            fetchMoviesData();
        }
    }, [reviews]);

    const moviesWithReviews = Object.entries(reviews).map(([movieId, movieReviews]) => ({
        movieId,
        movieData: moviesData[movieId],
        reviews: movieReviews
    }));

    return (
        <div className="w-full space-y-8 bg-[#121212]">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-[#FF007F] drop-shadow-[0_0_5px_#FF007F]">
                    Reseñas de Películas
                </h1>
            </header>

            <section className="max-w-6xl mx-auto px-4">
                {moviesWithReviews.length > 0 ? (
                    <div className="space-y-8">
                        {moviesWithReviews.map(({ movieId, movieData, reviews }) => (
                            <div key={movieId} className="bg-[#121212] border border-[#1A1DFF] rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <Link 
                                        to={`/movie/${movieId}`}
                                        className="text-2xl font-bold text-[#FFC72C] hover:text-[#FF007F] transition-colors duration-300"
                                    >
                                        {movieData?.title || 'Cargando...'}
                                    </Link>
                                    
                                    <div className="mt-4 space-y-4">
                                        {reviews.map(review => (
                                            <div 
                                                key={review.id} 
                                                className="bg-[#121212] border border-[#1A1DFF]/30 p-4 rounded-lg"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <span className="font-medium text-[#FF007F]">
                                                            {review.username}
                                                        </span>
                                                        <span className="ml-2 text-[#FFC72C]">
                                                            {review.rating} ⭐
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-[#6B7280]">
                                                        {new Date(review.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-white">{review.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-10">
                        <h2 className="text-2xl text-[#1A1DFF]">
                            No hay reseñas todavía
                        </h2>
                        <p className="text-[#6B7280] mt-2">
                            Sé el primero en escribir una reseña
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ReviewsPage;
