import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { user } = useContext(AuthContext);

    // Load favorites from localStorage on mount and when user changes
    useEffect(() => {
        if (user) {
            const savedFavorites = localStorage.getItem(`favorites_${user.username}`);
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } else {
            setFavorites([]);
        }
    }, [user]);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        if (user) {
            localStorage.setItem(`favorites_${user.username}`, JSON.stringify(favorites));
        }
    }, [favorites, user]);

    const addFavorite = (movie) => {
        if (!user) return;
        setFavorites(prevFavorites => {
            if (!prevFavorites.some(fav => fav.id === movie.id)) {
                return [...prevFavorites, {
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    vote_average: movie.vote_average,
                    release_date: movie.release_date
                }];
            }
            return prevFavorites;
        });
    };

    const removeFavorite = (movieId) => {
        if (!user) return;
        setFavorites(prevFavorites => 
            prevFavorites.filter(movie => movie.id !== movieId)
        );
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    const getFavorites = () => {
        return favorites;
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            addFavorite,
            removeFavorite,
            isFavorite,
            getFavorites
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};