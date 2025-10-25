import { createServer } from "node:http";
import routes from "./routes.js";

const server = createServer(async (req, res) => {
  // Trecho do cors feito pelo chatgpt, pois estava sendo barrado quando eu fazia uma requisição.
  // 🧩 Configurações CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // permite acesso de qualquer origem
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  // 🧠 Tratamento da requisição prévia (pré-flight request)
  if (req.method === "OPTIONS") {
    res.writeHead(204); // sem conteúdo, apenas confirma que o servidor aceita a requisição
    res.end();
    return;
  }

  await routes(req, res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server rodando na porta http://localhost:3000`);
});
