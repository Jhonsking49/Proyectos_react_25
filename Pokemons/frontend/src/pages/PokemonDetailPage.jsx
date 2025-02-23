import { useLoaderData, useNavigate } from 'react-router-dom'

const PokemonDetailPage = () => {
    const pokemon = useLoaderData();
    const navigate = useNavigate();
    return (
        <div className='container mx-auto p-4'>
            <div className='max-w-2xl mx-auto bg-[#000000] rounded-md shadow-lg p-6 border border-[#00B0FF]'>
                <button className='mb-4 text-[#00B0FF] hover:text-[#FF1744] transition-colors duration-300' onClick={() => navigate(-1)}>
                    Volver
                </button>
                <img 
                    src={pokemon.sprites.other.dream_world.front_default} 
                    alt={pokemon.name} 
                    className='w-32 h-32 mx-auto filter drop-shadow-[0_0_8px_#00B0FF]' 
                />
                <div className='grid grid-cols-2 gap-4 mt-6'>
                    <div>
                        <h2 className='text-[#00B0FF] text-xl font-bold mb-4'>Estadisticas</h2>
                        {pokemon.stats.map((stat) => (
                            <div key={stat.stat.name} className='flex justify-between text-[#B0BEC5] mb-2'>
                                <span className='font-semibold capitalize'>
                                    {stat.stat.name} : {stat.base_stat}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className='text-[#00B0FF] text-xl font-bold mb-4'>Tipos</h2>
                        <div className='flex flex-wrap gap-2'>
                            {pokemon.types.map((type) => (
                                <span key={type.type.name} className='bg-[#8E24AA] text-white px-3 py-1 rounded-md'>
                                    {type.type.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <button className='mt-6 w-full bg-[#FF1744] hover:bg-[#8E24AA] text-white px-4 py-2 rounded-md transition-colors duration-300'>
                    Añadir a favoritos
                </button>
            </div>
        </div>
    );
};

export default PokemonDetailPage;