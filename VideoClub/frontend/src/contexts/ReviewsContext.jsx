import { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from './ToastContext';
import { AuthContext } from './AuthContext';

export const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
    const [reviews, setReviews] = useState({});
    const { addToast } = useToast();
    const { user } = useContext(AuthContext);

    // Load reviews from localStorage when component mounts or user changes
    useEffect(() => {
        if (user) {
            const savedReviews = localStorage.getItem(`reviews_${user.username}`);
            if (savedReviews) {
                setReviews(JSON.parse(savedReviews));
            }
        } else {
            setReviews({});
        }
    }, [user]);

    // Save reviews to localStorage whenever they change
    useEffect(() => {
        if (user) {
            localStorage.setItem(`reviews_${user.username}`, JSON.stringify(reviews));
        }
    }, [reviews, user]);

    const addReview = (movieId, review) => {
        if (!user) return;
        
        setReviews(prevReviews => {
            const movieReviews = prevReviews[movieId] || [];
            const newReview = {
                id: Date.now(),
                ...review,
                username: user.username,
                date: new Date().toISOString(),
            };
            return {
                ...prevReviews,
                [movieId]: [...movieReviews, newReview]
            };
        });
    };

    const getMovieReviews = (movieId) => {
        return reviews[movieId] || [];
    };

    const deleteReview = (movieId, reviewId) => {
        if (!user) return;

        setReviews(prevReviews => {
            const movieReviews = prevReviews[movieId] || [];
            const updatedReviews = movieReviews.filter(review => review.id !== reviewId);
            addToast('Reseña eliminada correctamente', 'info');
            return {
                ...prevReviews,
                [movieId]: updatedReviews
            };
        });
    };

    return (
        <ReviewsContext.Provider value={{ 
            reviews, 
            addReview, 
            deleteReview,
            getMovieReviews 
        }}>
            {children}
        </ReviewsContext.Provider>
    );
};