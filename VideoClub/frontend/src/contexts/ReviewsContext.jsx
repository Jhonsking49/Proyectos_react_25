import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
    const [reviews, setReviews] = useState({});
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
        
        const newReview = {
            id: Date.now(),
            movieId,
            text: review.text,
            rating: review.rating,
            date: new Date().toISOString(),
            username: user.username
        };

        setReviews(prevReviews => ({
            ...prevReviews,
            [movieId]: [...(prevReviews[movieId] || []), newReview]
        }));
    };

    const removeReview = (movieId, reviewId) => {
        if (!user) return;

        setReviews(prevReviews => ({
            ...prevReviews,
            [movieId]: prevReviews[movieId]?.filter(review => review.id !== reviewId) || []
        }));
    };

    const getMovieReviews = (movieId) => {
        return reviews[movieId] || [];
    };

    const getUserReviews = () => {
        const userReviews = [];
        Object.values(reviews).forEach(movieReviews => {
            movieReviews.forEach(review => {
                if (review.username === user?.username) {
                    userReviews.push(review);
                }
            });
        });
        return userReviews;
    };

    const updateReview = (movieId, reviewId, updatedReview) => {
        if (!user) return;

        setReviews(prevReviews => ({
            ...prevReviews,
            [movieId]: prevReviews[movieId]?.map(review =>
                review.id === reviewId
                    ? { ...review, ...updatedReview, lastEdited: new Date().toISOString() }
                    : review
            ) || []
        }));
    };

    return (
        <ReviewsContext.Provider value={{
            reviews,
            addReview,
            removeReview,
            getMovieReviews,
            getUserReviews,
            updateReview
        }}>
            {children}
        </ReviewsContext.Provider>
    );
};