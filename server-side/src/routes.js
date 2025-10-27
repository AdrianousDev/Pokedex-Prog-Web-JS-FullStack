import welcome from "./routes/welcome.js";
import pokemonId from "./routes/pokemon-id.js";
import pokemonsOffset from "./routes/pokemons-offset.js";

export default async function routes(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const offset = url.searchParams.get("offset");

  try {
    // endpoint welcome/hello world!
    if (req.method === "GET" && req.url === "/") {
      welcome(req, res);
      return;
    }

    // endpoint paginação (offset)
    if (
      req.method === "GET" &&
      path.startsWith("/pokemons") &&
      url.search.startsWith("?offset=")
    ) {
      await pokemonsOffset(res, offset);
      return;
    }

    // endpoint para id's
    if (req.method === "GET" && path.startsWith("/pokemons/")) {
      await pokemonId(res, path);
      return;
    }

    // pior cenário/padrão (caso nenhuma rota corresponda)
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "Rota não encontrada" }));
  } catch (error) {
    // internal server error (caso dê B.O no processamento)
    console.log(error);
    res.statusCode = 500;
    return res.end(JSON.stringify({ message: "Erro interno do servidor" }));
  }
}
