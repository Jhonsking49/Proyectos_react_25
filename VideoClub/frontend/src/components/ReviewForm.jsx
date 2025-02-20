import { useState, useContext } from 'react';
import { ReviewsContext } from '../contexts/ReviewsContext';
import { AuthContext } from '../contexts/AuthContext';

const ReviewForm = ({ movieId }) => {
    const [review, setReview] = useState({ text: '', rating: 5 });
    const { addReview } = useContext(ReviewsContext);
    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            alert('Debes iniciar sesión para añadir una reseña');
            return;
        }
        addReview(movieId, review);
        setReview({ text: '', rating: 5 }); // Reset form
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 bg-opacity-50 p-6 rounded-lg">
            <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-1">
                    Valoración
                </label>
                <select
                    id="rating"
                    value={review.rating}
                    onChange={(e) => setReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(num => (
                        <option key={num} value={num}>{num} ⭐</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="review" className="block text-sm font-medium text-gray-300 mb-1">
                    Tu reseña
                </label>
                <textarea
                    id="review"
                    value={review.text}
                    onChange={(e) => setReview(prev => ({ ...prev, text: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                    rows="4"
                    placeholder="Escribe tu opinión sobre la película..."
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors"
            >
                Publicar reseña
            </button>
        </form>
    );
};

export default ReviewForm;