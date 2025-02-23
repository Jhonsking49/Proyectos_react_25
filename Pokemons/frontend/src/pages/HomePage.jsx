import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import { fetchPokemonList } from "../hooks/useFetch";

const HomePage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPokemons = async () => {
            try {
                const pokemonData = await fetchPokemonList();
                setPokemons(pokemonData);
            } catch (error) {
                console.log("Error fetching pokemons", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPokemons();
    }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { addToFavorites } = useFavorites();
  const { isAuthenticated } = useAuth();

  const handleAddToFavorites = (pokemon) => {
      addToFavorites(pokemon);
  };

  return (
      <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-[#00B0FF]">Pokemons disponibles</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pokemons.map((pokemon) => (
                  <div key={pokemon.id} className="bg-[#000000] shadow-lg rounded-md p-6 border border-[#00B0FF] hover:border-[#FF1744] transition-all duration-300">
                      <div className="relative group">
                          <img
                              src={pokemon.sprites.front_default}
                              alt={pokemon.name}
                              className="w-32 h-32 mx-auto transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_0_8px_#00B0FF]"
                          />
                      </div>
                      <h2 className="text-xl font-semibold text-center capitalize mt-2 text-[#B0BEC5]">
                          {pokemon.name}
                      </h2>
                      <div className="flex justify-center space-x-2 mt-4">
                          <button
                              className={`${
                                  isAuthenticated 
                                      ? "bg-[#FF1744] hover:bg-[#8E24AA]" 
                                      : "bg-[#B0BEC5] cursor-not-allowed"
                              } text-white px-4 py-2 rounded transition-colors duration-300`}
                              onClick={() => handleAddToFavorites(pokemon)}
                              disabled={!isAuthenticated}
                          >
                              Añadir a Favoritos
                          </button>
                          <Link
                              to={`/search/${pokemon.name}`}
                              className="bg-[#00B0FF] text-white px-4 py-2 rounded hover:bg-[#8E24AA] transition-colors duration-300"
                          >
                              Ver Detalles
                          </Link>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default HomePage;