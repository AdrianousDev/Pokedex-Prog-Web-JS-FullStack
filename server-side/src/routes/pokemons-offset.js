import chamarApi from "../modules/chamarApi.js";

export default async function pokemonsOffset(res, offset) {
  const pokemons = await chamarApi(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
  );

  return res.end(JSON.stringify(pokemons));
}
