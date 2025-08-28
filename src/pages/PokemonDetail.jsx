import Favorite from '../components/Favorite.jsx';
import MyComments from '../components/MyComments.jsx';
import { useSharedState } from '../context/SharedStateContext.jsx';
import { useNavigate } from 'react-router-dom';
import { fetchPokemonDetails } from '../api/pokeapi.js';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';

const PokemonDetail = () => {
  const { selectedPokemon, favorites } = useSharedState();
  const [pokemon, setPokemon] = useState(null); // Initialize with null instead of an empty object
  // const [isFavorite, setIsFavorite] = useState(fa); // Initialize with false

  const navigate = useNavigate();

  if (!selectedPokemon) {
    return (
      <div className="text-center p-8">
        <p>No Pokemon selected.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-red-500 underline">Go back</button>
      </div>
    );
  }

  useEffect(() => {
    if (selectedPokemon?.id) {
      // Use async/await for cleaner syntax
      const fetchDetails = async () => {
        try {
          const data = await fetchPokemonDetails(selectedPokemon.id);
          setPokemon(data);
        } catch (error) {
          console.error("Could not fetch data:", error);
        }
      };
      fetchDetails();
    }
  }, []);

  const isFavorite = favorites.some(fav => fav.id === selectedPokemon.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-start">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-red-500"><span className="md:inline">Back</span></button>
        <Favorite isFavorite={isFavorite} />
      </div>
      {!pokemon ? (
        <div className="text-center p-8">Loading...</div>
      ) : (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0 text-center">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-48 h-48 mx-auto bg-gray-100 rounded-full" />
            <h2 className="text-3xl font-bold capitalize mt-4">{pokemon.name}</h2>
            <div className="flex justify-center gap-2 mt-2">
              {pokemon.types.map(typeInfo => (
                <span key={typeInfo.type.name} className="px-3 py-1 text-sm rounded-full bg-gray-200 capitalize">
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-xl font-bold mb-4">Base Stats</h3>
            <div className="space-y-3">
              {pokemon.stats.map(statInfo => (
                <div key={statInfo.stat.name} className="flex items-center gap-4">
                  <span className="capitalize font-semibold w-48">{statInfo.stat.name}:</span>
                  <span className="font-bold w-10 text-right">{statInfo.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>)
      }
      <MyComments />
    </div>
  );
};

export default PokemonDetail;