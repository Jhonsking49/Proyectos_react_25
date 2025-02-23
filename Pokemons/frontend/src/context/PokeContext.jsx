import { createContext, useContext, useState } from "react";
import { toast } from "sonner";


export const PokeContext = createContext();

export const Pokeprovider = ({ children }) => {
    const [pokeFav, setPokeFav] = useState([]);

    const addToFav = (poke) => {
        // comprobamos si el poke ya existe en la lista
        if (pokeFav.some((p) => p?.id === poke.id)) {
            toast.error(`El pokemon ${poke.name} ya esta en favoritos`, {
                style: {
                    background: "red",
                    color: "white",
                    border: "1px solid black"
                },
                icon: "⭐",
            });
            return;
        }
        setPokeFav((prevPokeFav) => [...prevPokeFav, poke]);
        toast.success(`El pokemon ${poke.name} se ha añadido a favoritos`, {
            style: {
                background: "green",
                color: "white",
                border: "1px solid black",
            },
            icon: "⭐",
        });
        return;
    };

    const removeFromFav = (pokeId) => {
        setPokeFav((prevPokeFav) => prevPokeFav.filter((p) => p?.id !== pokeId));
        toast.info("Pokemon elimindo de favoritos", {
            style: {
                background: "blue",
                color: "white",
                border: "1px solid black",
            },
            icon: "🗑️",
        })
    };

    return (
        <PokeContext.Provider value={{ pokeFav, addToFav, removeFromFav }}>
            {children}
        </PokeContext.Provider>
    );
};

export const usePokemon = () => {
    const context = useContext(PokeContext);
    if(context === undefined) {
        throw new Error("usePokemon debe ser usado dentro de un PokeProvider");
    }
    return context;
}