/**
 * Fetches the initial list of Pokemon and their detailed data.
 */

function getPokeImg(pokemonId) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
}

export async function fetchPokemonData(offset = 0) {
  const params = `limit=20&offset=${offset}`;
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?'+params);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const detailedPokemon = await Promise.all(
      data.results.map(async (pokemon) => {
        const id = pokemon.url.split('/')[6];
        return {
          id: id,
          name: pokemon.name,
          image: getPokeImg(id),
        };
      })
    );
    return detailedPokemon;
  } catch (e) {
    console.error("Could not fetch Pokemon data", e);
    throw e;
  }
}

export  async function fetchPokemonDetails(pokemonId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return  await response.json();

  } catch (e) {
    console.error("Could not fetch Pokemon details", e);
    throw e;
  }
}

export async function fetchAllPokemonData() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    
    // API does not provide all details in list, so fetch in loop 
    const detailedPokemon = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        const detailData = await detailResponse.json();
        return {
          id: detailData.id,
          name: detailData.name,
          types: detailData.types.map(t => t.type.name),
          image: detailData.sprites.front_default,
          stats: detailData.stats,
        };
      })
    );
    return detailedPokemon;
  } catch (e) {
    console.error("Could not fetch Pokemon data", e);
    throw e;
  }
}