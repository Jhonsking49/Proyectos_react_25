import { useState, useEffect } from 'react';

export const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        if (url) {
            fetchData();
        }

        return () => {
            // Cleanup if needed
        };
    }, [url]);

    return { data, loading, error };
};

export const fetchPokemonList = async (limit = 30) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        if (!response.ok) {
            throw new Error('Failed to fetch Pokemon list');
        }
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon) => {
                const detailResponse = await fetch(pokemon.url);
                if (!detailResponse.ok) {
                    throw new Error(`Failed to fetch details for ${pokemon.name}`);
                }
                return await detailResponse.json();
            })
        );
        
        return pokemonDetails;
    } catch (error) {
        throw new Error(`Error fetching Pokemon data: ${error.message}`);
    }
};

export const fetchPokemonByName = async (name) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching Pokemon: ${error.message}`);
    }
};