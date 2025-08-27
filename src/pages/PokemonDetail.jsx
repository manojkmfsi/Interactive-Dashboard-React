import Favorite from '../components/Favorite.jsx';
import MyComments from '../components/MyComments.jsx';
import { useSharedState } from '../context/SharedStateContext.jsx';
import { useNavigate } from 'react-router-dom';

const PokemonDetail = () => {
  const { selectedPokemon, favorites } = useSharedState();
  const navigate = useNavigate();

  if (!selectedPokemon) {
    return (
      <div className="text-center p-8">
        <p>No Pokemon selected.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-red-500 underline">Go back</button>
      </div>
    );
  }

  const isFavorite = favorites.some(fav => fav.id === selectedPokemon.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-start">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-red-500"><span className="hidden md:inline">Back</span></button>
        <Favorite isFavorite={isFavorite}></Favorite>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex-shrink-0 text-center">
          <img src={selectedPokemon.image} alt={selectedPokemon.name} className="w-48 h-48 mx-auto bg-gray-100 rounded-full" />
          <h2 className="text-3xl font-bold capitalize mt-4">{selectedPokemon.name}</h2>
          <div className="flex justify-center gap-2 mt-2">
            {selectedPokemon.types.map(type => <span key={type} className="px-3 py-1 text-sm rounded-full bg-gray-200 capitalize">{type}</span>)}
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-xl font-bold mb-4">Base Stats</h3>
          <div className="space-y-3">
            {selectedPokemon.stats.map(stat => (
              <div key={stat.stat.name} className="flex items-center gap-4">
                <span className="capitalize font-semibold w-48">{stat.stat.name}:</span>
                <span className="font-bold w-10 text-right">{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MyComments></MyComments>
    </div>
  );
};

export default PokemonDetail;

