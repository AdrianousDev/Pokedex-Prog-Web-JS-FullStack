import getPokemonById from "./modules/getPokemonById.js";

export default async function routes(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    // endpoint welcome/hello world!
    if (req.url === "/" && req.method === "GET") {
      const welcome = {
        title: "Hello, World!",
        url: req.url,
        method: req.method,
        msg: "Meu mano, esse endpoint é só o seu bem-vindo. Usa o endpoint /pokemon/${id} que da boa.",
      };

      return res.end(JSON.stringify(welcome));
    }

    // endpoint para id's
    if (req.method === "GET" && path.startsWith("/pokemon/")) {
      const id = path.split("/")[2];
      const pokemon = await getPokemonById(id);

      res.statusCode = 200;
      return res.end(JSON.stringify(pokemon));
    }

    // pior cenário/padrão (caso nenhuma rota corresponda)
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "Rota não encontrada" }));
  } catch (error) {
    // internal server error
    console.log(error);
    res.statusCode = 500;
    return res.end(JSON.stringify({ message: "Erro interno do servidor" }));
  }
}
