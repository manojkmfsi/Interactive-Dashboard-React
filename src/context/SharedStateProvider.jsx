import { useState, useEffect } from 'react';
import { SharedStateContext } from './SharedStateContext.jsx';
import { fetchPokemonData } from '../api/pokeapi.js';

export function SharedStateProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (e) {
      console.error("Could not load favorites from localStorage", e);
      return [];
    }
  });

  const fetchPokemons = async (page) => {
    try {
      setLoading(true);
      const data = await fetchPokemonData(page);
      setPokemonList(pokemonList.concat(data));
      setError(null);
      return data;
    } catch (e) {
      setError("Could not fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(1);
  }, []);

  const value = {
    pokemonList, setPokemonList,
    currentPage, setCurrentPage,
    loading, error,
    favorites, setFavorites,
    selectedPokemon, setSelectedPokemon,
  };

  return (
    <SharedStateContext.Provider value={value}>
      {children}
    </SharedStateContext.Provider>
  );
}
