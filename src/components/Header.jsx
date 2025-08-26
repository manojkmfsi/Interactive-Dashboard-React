// import { useSharedState } from '../context/SharedStateContext.jsx';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-gray-950 text-white shadow-lg py-4 px-6 md:px-12 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Pokemon Site</h1>
      <nav>
        <ul className="flex space-x-4 md:space-x-6">
          <li><button onClick={() => navigate('/')} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"><span className="hidden md:inline">Home</span></button></li>
          <li><button onClick={() => navigate('/favorites')} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"><span className="hidden md:inline">Favorites</span></button></li>
          <li><button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"><span className="hidden md:inline">Dashboard</span></button></li>
          <li><button onClick={() => navigate('/about')} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"> <span className="hidden md:inline">About</span></button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
