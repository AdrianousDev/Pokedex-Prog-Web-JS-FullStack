import chamarApi from "./modules/chamarApi.js";
import criarCard from "./modules/criarCard.js";
import navegacao from "./modules/navegacao.js";
import cardPrincipal from "./modules/cardPrincipal.js";

const dados = await chamarApi("http://localhost:3000/pokemons?offset=0");
criarCard(dados);

cardPrincipal(1);

navegacao();
