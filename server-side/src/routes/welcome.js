export default function welcome(req, res) {
  const welcome = {
    title: "Hello, World!",
    url: req.url,
    method: req.method,
    msg: "Meu mano, esse endpoint é só o seu bem-vindo.",
    endPoints: [
      {
        name: "Endpoint para paginação.",
        endpoint: "http://localhost:3000/pokemons?offset=${offset}",
        why: "Retorna uma lista de 20 pokemons usando o offset como pokemon inicial da lista.",
      },
      {
        name: "Endpoint para pokemon único.",
        endpoint: "http://localhost:3000/pokemons/${id}",
        why: "Retorna uma lista completa de 1 pokemon usando o id como base.",
      },
    ],
  };

  return res.end(JSON.stringify(welcome));
}
