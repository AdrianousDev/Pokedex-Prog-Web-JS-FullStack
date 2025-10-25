import chamarApi from "./chamarApi.js";
import getPokemonEvolution from "./getPokemonEvolution.js";

export default async function getPokemonById(id) {
  const pokemonDados = await chamarApi(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );

  const dadosDescription =
    await chamarApi(`https://pokeapi.co/api/v2/pokemon-species/${id}/
`);

  // preocura o flavor que está em "en"
  const enDescription = dadosDescription.flavor_text_entries.find(
    (item) => item.language.name == "en"
  );

  // regex para tirar \n \f \r
  const descriptionTratada = enDescription.flavor_text
    .replace(/[\f\n\r]/g, " ")
    .toLowerCase();

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
    types: pokemonDados.types.map((t) => t.type.name),
    evolutions,
  };
}
