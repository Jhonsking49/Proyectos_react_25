import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useToast } from './ToastContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { user } = useContext(AuthContext);
    const { addToast } = useToast();

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
                addToast(`"${movie.title}" añadida a favoritos`, 'success');
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
        const movie = favorites.find(m => m.id === movieId);
        setFavorites(prevFavorites => {
            const newFavorites = prevFavorites.filter(movie => movie.id !== movieId);
            if (movie) {
                addToast(`"${movie.title}" eliminada de favoritos`, 'info');
            }
            return newFavorites;
        });
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