import { createServer } from "http";
import routes from "./routes.js";

const server = createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  await routes(req, res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server rodando na porta http://localhost:3000`);
});
