import { useSharedState } from '../context/SharedStateContext.jsx';
import Header from './Header.jsx';
import HomePage from '../pages/HomePage.jsx';
import PokemonDetail from '../pages/PokemonDetail.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import FavoritesPage from '../pages/FavoritesPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

const AppContent = () => {
  const { loading, error } = useSharedState();

  const renderPage = () => {
    if (loading) return <div className="text-center p-8">Loading Pokemons...</div>;
    if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-inter">
      <Header />
      <ToastContainer
        pauseOnHover
        theme="light" />
      <main className="container mx-auto p-4 md:p-8">
        <Suspense fallback={renderPage()}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon-detail" element={<PokemonDetail />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default AppContent;