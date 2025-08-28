import { useState, useEffect } from 'react';
import { fetchAllPokemonData } from '../api/pokeapi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTypeData = (pokemons) => {
    const typeCount = {};
    pokemons.forEach(pokemon => {
      pokemon.types.forEach(type => {
        typeCount[type] = typeCount[type] || 0;
        typeCount[type] += 1;
      });
    });
    return Object.keys(typeCount).map(type => ({
      name: type,
      count: typeCount[type],
    }));
  };

  useEffect(() => {
    const getAllPokemons = async () => {
      setIsLoading(true);
      const pokemonsList = await fetchAllPokemonData();
      const chartDataList = getTypeData(pokemonsList);
      setChartData(chartDataList);
      setIsLoading(false);
    }
    getAllPokemons();
  }, []);


  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Pokemon Dashboard</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">500 Pokemons by Type</h3>
        {isLoading ? (
          <div className="text-center p-8">Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" className="capitalize text-sm" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
        }
      </div>
    </div>
  );
};

export default DashboardPage;
