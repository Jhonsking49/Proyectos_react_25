import { useState, useContext } from 'react';
import { ReviewsContext } from '../contexts/ReviewsContext';
import { AuthContext } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const ReviewForm = ({ movieId }) => {
    const [review, setReview] = useState({ text: '', rating: 5 });
    const { addReview } = useContext(ReviewsContext);
    const { user } = useContext(AuthContext);
    const { addToast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            addToast('Debes iniciar sesión para añadir una reseña', 'error');
            return;
        }
        addReview(movieId, review);
        addToast('Reseña publicada correctamente', 'success');
        setReview({ text: '', rating: 5 }); // Reset form
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-[#121212] border border-[#1A1DFF] p-6 rounded-lg scale-in">
            <div className="smooth-transition hover:transform hover:scale-101">
                <label htmlFor="rating" className="block text-sm font-medium text-[#FFC72C] mb-1">
                    Valoración
                </label>
                <select
                    id="rating"
                    value={review.rating}
                    onChange={(e) => setReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-[#121212] border border-[#1A1DFF] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF007F] transition-all duration-300"
                >
                    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(num => (
                        <option key={num} value={num} className="bg-[#121212]">{num} ⭐</option>
                    ))}
                </select>
            </div>
            <div className="smooth-transition hover:transform hover:scale-101">
                <label htmlFor="review" className="block text-sm font-medium text-[#FFC72C] mb-1">
                    Tu reseña
                </label>
                <textarea
                    id="review"
                    value={review.text}
                    onChange={(e) => setReview(prev => ({ ...prev, text: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#121212] border border-[#1A1DFF] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF007F] transition-all duration-300"
                    rows="4"
                    placeholder="Escribe tu opinión sobre la película..."
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-[#FF007F] text-white py-2 px-4 rounded-md hover:bg-[#FF007F]/80 focus:outline-none focus:ring-2 focus:ring-[#FF007F] focus:ring-offset-2 transition-all duration-300 transform hover:scale-102"
            >
                Publicar Reseña
            </button>
        </form>
    );
};

export default ReviewForm;