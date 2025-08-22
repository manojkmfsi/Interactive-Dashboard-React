import { useSharedState } from '../context/SharedStateContext.jsx';
import Header from './Header.jsx';
import HomePage from '../pages/HomePage.jsx';
import PokemonDetail from '../pages/PokemonDetail.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import FavoritesPage from '../pages/FavoritesPage.jsx';

const AppContent = () => {
  const { currentPage, loading, error } = useSharedState();

  const renderPage = () => {
    if (loading) return <div className="text-center p-8">Loading Pokemons...</div>;
    if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'pokemon-detail': return <PokemonDetail />;
      case 'favorites': return <FavoritesPage />;

      default: return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-inter">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default AppContent;