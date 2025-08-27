import { useState } from 'react';
import { useSharedState } from '../context/SharedStateContext.jsx';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchPokemonData } from '../api/pokeapi.js';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search.jsx';


const HomePage = () => {
  const navigate = useNavigate();
  const { pokemonList, setSelectedPokemon, setPokemonList } = useSharedState();
  const [searchTerm, setSearchTerm] = useState('');
  const [loadMore, setLoadMore] = useState(true);

  let filteredPokemon = pokemonList.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    navigate('/pokemon-detail');
  };

  const handleLoadMoreData = async () => {
    const data = await fetchPokemonData(pokemonList.length);
    setLoadMore(data.length > 0);
    setPokemonList(pokemonList.concat(data));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPokemonList(filteredPokemon);

    if (term == '') {
      handleLoadMoreData();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Pokemons</h2>
      <Search onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={filteredPokemon.length}
        next={handleLoadMoreData}
        hasMore={loadMore}
        loader={!searchTerm ? <p className="text-center">Loading...</p> : ''}
        endMessage={!searchTerm ? <p className="text-center">No more data to load.</p> : ''}>

        <div className="grid  md:grid-cols-5 gap-4">
          {filteredPokemon.map(pokemon => (
            <div key={pokemon.id} onClick={() => handleSelectPokemon(pokemon)} className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg cursor-pointer">
              <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24" />
              <span className="capitalize font-medium text-center">{pokemon.name}</span>
            </div>
          ))}
        </div>
      </InfiniteScroll>

    </div>
  );
};

export default HomePage;