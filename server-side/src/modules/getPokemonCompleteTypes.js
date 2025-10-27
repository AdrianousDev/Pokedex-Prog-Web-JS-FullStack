import chamarApi from "./chamarApi.js";

export default async function getPokemonCompleteTypes(pokemonDados) {
  const types = pokemonDados.types.map((t) => t.type.name);

  const typeDataArray = await Promise.all(
    types.map((type) => chamarApi(`https://pokeapi.co/api/v2/type/${type}`))
  );

  const weaknesses = new Set();
  const strengths = new Set();

  // for (const typeData of typeDataArray) {
  //   if (!typeData?.damage_relations) continue;

  //   for (const weak of typeData.damage_relations.double_damage_from) {
  //     weaknesses.add(weak.name);
  //   }

  //   for (const strong of typeData.damage_relations.double_damage_to) {
  //     strengths.add(strong.name);
  //   }
  // }

  typeDataArray.forEach((typeData) => {
    if (!typeData?.damage_relations) return;

    const doubleDamageFrom = typeData.damage_relations.double_damage_from;
    doubleDamageFrom.forEach((weak) => {
      weaknesses.add(weak.name);
    });

    const doubleDamageTo = typeData.damage_relations.double_damage_to;
    doubleDamageTo.forEach((strong) => {
      strengths.add(strong.name);
    });
  });

  return {
    types,
    strengths: [...strengths],
    weaknesses: [...weaknesses],
  };
}
