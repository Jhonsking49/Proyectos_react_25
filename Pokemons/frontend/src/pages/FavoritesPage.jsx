import { usePokemon } from '../context/PokeContext';
import { Link } from 'react-router-dom';
import { ROUTES } from '../router/path';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesPage = () => {
    const { favorites, removeFromFavorites } = useFavorites();

    if (favorites.length === 0) {
        return (
            <div className='text-center mt-8'>
                <h1 className='text-3xl font-bold mb-4 text-[#00B0FF]'>
                    Favorites
                </h1>
                <p className='text-[#B0BEC5]'>
                    You don't have any favorite pokemons yet
                </p>
                <Link to={ROUTES.HOME} className='text-[#00B0FF] hover:text-[#FF1744] block mt-4 transition-colors duration-300'>
                    Return to Home Page
                </Link>
            </div>
        );
    }

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-3xl font-bold mb-6 text-[#00B0FF]'>Your Favorite Pokemons</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {favorites.map((pokemon) => (
                    <div key={pokemon.id} className='bg-[#000000] rounded-lg p-4 border border-[#00B0FF] hover:border-[#FF1744] transition-all duration-300'>
                        <img 
                            src={pokemon.sprites.other.dream_world.front_default}
                            alt={pokemon.name}
                            className='w-32 h-32 mx-auto filter drop-shadow-[0_0_8px_#00B0FF]'
                        />
                        <h2 className='text-xl font-semibold text-center capitalize mt-2 text-[#B0BEC5]'>
                            {pokemon.name}
                        </h2>
                        <div className='mt-4 flex flex-col gap-2'>
                            <Link 
                                to={`${ROUTES.SEARCH}/${pokemon.name}`} 
                                className='bg-[#00B0FF] text-white px-4 py-2 rounded hover:bg-[#8E24AA] transition-colors duration-300 text-center'
                            >
                                View Details
                            </Link>
                            <button 
                                className='w-full bg-[#FF1744] text-white px-4 py-2 rounded hover:bg-[#8E24AA] transition-colors duration-300' 
                                onClick={() => removeFromFavorites(pokemon.id)}
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;