
import { useSharedState } from '../context/SharedStateContext';
import { toast } from 'react-toastify';

const HeartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>);

const Favorite = ({ isFavorite }) => {
    const { selectedPokemon, favorites, setFavorites } = useSharedState();
    const handleToggleFavorite = () => {
        if (isFavorite) {
            const favs = favorites.filter(fav => fav.id !== selectedPokemon.id);
            localStorage.setItem('favorites', JSON.stringify(favs));
            setFavorites(favs);
            toast('Favorite removed.');
        } else {
            const favs = [...favorites, selectedPokemon];
            localStorage.setItem('favorites', JSON.stringify(favs));
            setFavorites(favs);
            toast('Favorite added.');
        }
    };

    return <button onClick={handleToggleFavorite} className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200'}`}><HeartIcon /></button>

};

export default Favorite;