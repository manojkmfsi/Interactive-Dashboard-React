import { useSharedState } from '../context/SharedStateContext.jsx';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, setSelectedPokemon } = useSharedState();

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    navigate('/pokemon-detail');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Your Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map(fav => (
            <div key={fav.id} onClick={() => handleSelectPokemon(fav)} className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg cursor-pointer">
              <img src={fav.image} alt={fav.name} className="w-24 h-24" />
              <span className="capitalize font-medium text-center">{fav.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;