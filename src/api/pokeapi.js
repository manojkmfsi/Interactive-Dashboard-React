/**
 * Fetches the initial list of Pokemon and their detailed data.
 */
export async function fetchPokemonData(offset = 0) {
  const params = (offset === -1) ? 'limit=500' : `limit=20&offset=${offset}`;
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?'+params);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
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