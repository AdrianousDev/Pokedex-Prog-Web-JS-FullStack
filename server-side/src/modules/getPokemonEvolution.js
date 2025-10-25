import chamarApi from "./chamarApi.js";

export default async function getPokemonEvolution(pokemonDados) {
  const speciesData = await chamarApi(pokemonDados.species.url);
  if (!speciesData?.evolution_chain) return null;

  const evolutionData = await chamarApi(speciesData.evolution_chain.url);

  const evolucoes = extrairEvolucoes(evolutionData.chain);

  const evolucoesCompletas = [];

  for (const evo of evolucoes) {
    const dadosPokemon = await chamarApi(
      `https://pokeapi.co/api/v2/pokemon/${evo.nome}`
    );

    evolucoesCompletas.push({
      id: dadosPokemon.id,
      name: evo.nome,
      condicion: evo.condicao,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dadosPokemon.id}.png`,
    });
  }

  return {
    chain: evolucoesCompletas,
  };
}

function extrairEvolucoes(chain, resultado = []) {
  const especie = chain.species.name;
  const detalhes = chain.evolution_details[0];

  let condicao = null;

  if (detalhes) {
    if (detalhes.min_level) condicao = `Lvl ${detalhes.min_level}`;
    else if (detalhes.item) condicao = detalhes.item.name;
    else if (detalhes.trigger)
      condicao = detalhes.trigger.name.replace("-", " ");
  }

  resultado.push({ nome: especie, condicao });

  if (chain.evolves_to.length > 0) {
    extrairEvolucoes(chain.evolves_to[0], resultado);
  }

  return resultado;
}
