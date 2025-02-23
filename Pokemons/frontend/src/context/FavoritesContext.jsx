import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated && user) {
            const savedFavorites = localStorage.getItem(`pokemonFavorites_${user.username}`);
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } else {
            setFavorites([]);
        }
    }, [user, isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated && user) {
            localStorage.setItem(`pokemonFavorites_${user.username}`, JSON.stringify(favorites));
        }
    }, [favorites, user, isAuthenticated]);

    const addToFavorites = (pokemon) => {
        if (!isAuthenticated) {
            toast.error('Please login to add favorites', {
                style: {
                    background: '#fef2f2',
                    color: '#991b1b',
                }
            });
            return;
        }

        if (favorites.some(fav => fav.id === pokemon.id)) {
            toast.error(`${pokemon.name} is already in favorites!`);
            return;
        }

        setFavorites(prev => [...prev, pokemon]);
        toast.success(`${pokemon.name} added to favorites!`);
    };

    const removeFromFavorites = (pokemonId) => {
        if (!isAuthenticated) {
            return;
        }
        setFavorites(prev => prev.filter(pokemon => pokemon.id !== pokemonId));
        toast.info('Pokemon removed from favorites');
    };

    const isFavorite = (pokemonId) => {
        return favorites.some(pokemon => pokemon.id === pokemonId);
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            addToFavorites,
            removeFromFavorites,
            isFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};