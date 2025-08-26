import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
   const navigate = useNavigate();
  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400">The page you are looking for does not exist.</p>
      <button onClick={() => navigate(-1)} className="mt-4 inline-block text-red-500 underline">Go back to the Home Page</button>
    </div>
  );
};

export default NotFoundPage;