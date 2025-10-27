import getPokemonById from "../modules/getPokemonById.js";

export default async function pokemonId(res, path) {
  const id = path.split("/")[2];

  if (!id) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "Rota não encontrada" }));
  }

  const pokemon = await getPokemonById(id);

  return res.end(JSON.stringify(pokemon));
}
