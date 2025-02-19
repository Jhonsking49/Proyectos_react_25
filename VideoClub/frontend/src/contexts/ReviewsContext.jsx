import { createContext, useState } from "react";

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);

    const addReview = (review) => {
        setReviews((prevReviews) => [...prevReviews, review]);
    };

    return (
        <ReviewsContext.Provider value={{ reviews, addReview }}>
        {children}
        </ReviewsContext.Provider>
    );
};

