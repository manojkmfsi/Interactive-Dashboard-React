import { useSharedState } from '../context/SharedStateContext.jsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const { pokemonList } = useSharedState();

  const getTypeData = () => {
    const typeCount = {};
    pokemonList.forEach(pokemon => {
      pokemon.types.forEach(type => {
        typeCount[type] = (typeCount[type] || 0) + 1;
      });
    });
    return Object.keys(typeCount).map(type => ({
      name: type,
      count: typeCount[type],
    }));
  };

  const chartData = getTypeData();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Pokemon Dashboard</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">Pokemon by Type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" className="capitalize text-sm" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
