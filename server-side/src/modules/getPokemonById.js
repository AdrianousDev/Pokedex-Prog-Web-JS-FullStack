import chamarApi from "./chamarApi.js";
import getPokemonDescription from "./getPokemonDescription.js";
import getPokemonCompleteTypes from "./getPokemonCompleteTypes.js";
import getPokemonEvolution from "./getPokemonEvolution.js";

export default async function getPokemonById(id) {
  const pokemonDados = await chamarApi(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );

  const descriptionTratada = await getPokemonDescription(id);

  const typesComplete = await getPokemonCompleteTypes(pokemonDados);

  const evolutions = await getPokemonEvolution(pokemonDados);

  return {
    id: pokemonDados.id,
    name: pokemonDados.name,
    sprites: {
      front_default: pokemonDados.sprites.front_default,
      front_shiny: pokemonDados.sprites.front_shiny,
      back_default: pokemonDados.sprites.back_default,
      back_shiny: pokemonDados.sprites.back_shiny,
    },
    description: descriptionTratada,
    height: pokemonDados.height / 10,
    weight: pokemonDados.weight / 10,
    base_experience: pokemonDados.base_experience,
    stats: pokemonDados.stats.map((s) => ({
      name: s.stat.name,
      base_value: s.base_stat,
    })),
    types: typesComplete.types,
    strengths: typesComplete.strengths,
    weaknesses: typesComplete.weaknesses,
    evolutions,
  };
}
