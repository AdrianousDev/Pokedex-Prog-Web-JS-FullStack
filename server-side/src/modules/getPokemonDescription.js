import chamarApi from "./chamarApi.js";

export default async function getPokemonDescription(id) {
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

  return descriptionTratada;
}
