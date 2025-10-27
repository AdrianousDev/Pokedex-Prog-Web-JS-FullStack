export default function welcome(req, res) {
  const welcome = {
    title: "Hello, World!",
    url: req.url,
    method: req.method,
    msg: "Meu mano, esse endpoint é só o seu bem-vindo. Usa o endpoint /pokemon/${id} que da boa.",
  };

  return res.end(JSON.stringify(welcome));
}
