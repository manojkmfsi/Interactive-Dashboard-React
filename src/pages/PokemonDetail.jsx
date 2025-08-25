import MyComments from '../components/MyComments.jsx';
import { useSharedState } from '../context/SharedStateContext.jsx';

const HeartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>);

const PokemonDetail = () => {
  const { selectedPokemon, favorites, setFavorites, setCurrentPage } = useSharedState();

  if (!selectedPokemon) {
    return (
      <div className="text-center p-8">
        <p>No Pokemon selected.</p>
        <button onClick={() => setCurrentPage('home')} className="mt-4 text-red-500 underline">Go back</button>
      </div>
    );
  }

  const isFavorite = favorites.some(fav => fav.id === selectedPokemon.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      const favs = favorites.filter(fav => fav.id !== selectedPokemon.id);
      localStorage.setItem('favorites', JSON.stringify(favs));
      setFavorites(favs);
    } else {
      const favs = [...favorites, selectedPokemon];
      localStorage.setItem('favorites', JSON.stringify(favs));
      setFavorites(favs);
    }
  };


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-start">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-gray-600 hover:text-red-500"><span className="hidden md:inline">Back</span></button>
        <button onClick={handleToggleFavorite} className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200'}`}><HeartIcon /></button>
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
                <span className="capitalize font-semibold w-24">{stat.stat.name}:</span>
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

