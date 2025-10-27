import chamarApi from "./chamarApi.js";

export default async function cardPrincipal(id) {
  const pokemonDados = await chamarApi(`http://localhost:3000/pokemons/${id}`);

  updatePokemonImage(pokemonDados);

  updatePokemonId(pokemonDados);

  updatePokemonName(pokemonDados);

  updatePokemonDescription(pokemonDados);

  updatePokemonDimensions(pokemonDados);

  updatePokemonBaseExp(pokemonDados);

  updatePokemonStats(pokemonDados);

  updatePokemonTypes(pokemonDados);

  updatePreviousPokemon(pokemonDados);

  updateNextPokemon(pokemonDados);

  updatePokemonEvolution(pokemonDados);
}

function updatePokemonImage(pokemonDados) {
  const pokemonImg = document.querySelector("#pokemonImg");

  if (!pokemonImg) return;

  const imagemPadrao = "./images/not-found.png";

  if (pokemonDados === null || !pokemonDados.sprites?.front_default) {
    pokemonImg.src = imagemPadrao;
    return;
  }

  pokemonImg.src = pokemonDados.sprites.front_default;

  pokemonImg.onerror = () => {
    pokemonImg.src = imagemPadrao;
  };
}

function updatePokemonId(pokemonDados) {
  const pokemonId = document.querySelector("#pokemonId");

  if (!pokemonId) {
    return;
  }

  if (pokemonDados === null || !pokemonDados) {
    return;
  }

  const idFormatado = pokemonDados.id.toString().padStart(4, "0");

  pokemonId.textContent = `#${idFormatado}`;
}

function updatePokemonName(pokemonDados) {
  const pokemonName = document.querySelector("#pokemonName");

  if (!pokemonName) {
    return;
  }

  if (pokemonDados === null || !pokemonDados) {
    return;
  }

  pokemonName.textContent = pokemonDados.name;
}

function updatePokemonDescription(pokemonDados) {
  const pokemonDescription = document.querySelector("#pokemonDescription");

  if (!pokemonDescription) {
    return;
  }

  if (pokemonDados === null || !pokemonDados) {
    pokemonDescription.textContent = "Descrição Padrão.";
    return;
  }

  pokemonDescription.textContent = pokemonDados.description;
}

function updatePokemonDimensions(pokemonDados) {
  const pokemonHeight = document.querySelector("#pokemonHeight");
  const pokemonWeight = document.querySelector("#pokemonWeight");

  if (!pokemonHeight || !pokemonWeight) {
    return;
  }

  if (pokemonDados === null || !pokemonDados) {
    return;
  }

  pokemonHeight.textContent = `${pokemonDados.height.toFixed(2)}m`;
  pokemonWeight.textContent = `${pokemonDados.weight.toFixed(2)}kg`;
}

function updatePokemonBaseExp(pokemonDados) {
  const pokemonBaseExp = document.querySelector("#pokemonBaseExp");

  if (!pokemonBaseExp) {
    return;
  }

  if (pokemonDados === null || !pokemonDados) {
    return;
  }

  pokemonBaseExp.textContent = pokemonDados.base_experience;
}

function updatePokemonStats(pokemonDados) {
  const pokemonDivStats = document.querySelector("#pokemonDivStats");

  if (!pokemonDivStats) {
    return;
  }

  if (pokemonDados === null || !pokemonDados) {
    return;
  }

  pokemonDivStats.innerHTML = "";
  pokemonDados.stats.forEach((status) => {
    const span = document.createElement("span");
    span.textContent = status.base_value;
    span.className =
      "bg-white/20 text-white font-semibold px-4 py-2 rounded-full shadow-sm backdrop-blur-sm border border-white/10";
    pokemonDivStats.appendChild(span);
  });
}

function updatePokemonTypes(pokemonDados) {
  const pokemonDivTypes = document.querySelector("#pokemonDivTypes");

  if (!pokemonDivTypes) {
    return;
  }

  if (pokemonDados === null || !pokemonDados) {
    return;
  }

  const colorsTypes = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-400 text-black",
    ice: "bg-cyan-300 text-black",
    fighting: "bg-orange-700",
    poison: "bg-purple-500",
    ground: "bg-amber-700",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-600",
    rock: "bg-stone-500",
    ghost: "bg-violet-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-700",
    steel: "bg-slate-400",
    fairy: "bg-pink-300 text-black",
  };

  pokemonDivTypes.innerHTML = "";
  pokemonDados.types.forEach((type) => {
    const span = document.createElement("span");
    const pokemonType = type.toLowerCase();
    span.textContent = pokemonType;
    const colorType = colorsTypes[pokemonType] || "bg-gray-500";
    span.className = `${colorType} text-white font-semibold px-4 py-2 rounded-full shadow-sm backdrop-blur-sm border border-white/10`;
    pokemonDivTypes.appendChild(span);
  });
}

async function updatePreviousPokemon(pokemonDados) {
  const divPreviousLateral = document.querySelector("#divPreviousLateral");
  const previousImg = document.querySelector("#previousImg");
  const previousName = document.querySelector("#previousName");
  const previousId = document.querySelector("#previousId");

  if (!divPreviousLateral || !previousImg || !previousName || !previousId) {
    return;
  }

  if (pokemonDados === null || !pokemonDados) {
    return;
  }

  const idAtual = pokemonDados.id;
  if (idAtual <= 1) {
    previousImg.onerror = null;
    divPreviousLateral.dataset.id = "";
    previousImg.src = "";
    previousName.textContent = "";
    previousId.textContent = "";
    return;
  }

  const previousPokemon = await chamarApi(`http://localhost:3000/pokemons/${
    idAtual - 1
  }
`);

  if (!previousPokemon) {
    return;
  }

  const idPrevious = previousPokemon.id;
  divPreviousLateral.dataset.id = idPrevious;

  previousImg.src = previousPokemon.sprites.front_default;
  previousImg.onerror = () => {
    previousImg.src = "./images/not-found.png";
  };

  previousName.textContent = previousPokemon.name;

  const idFormatado = idPrevious.toString().padStart(4, "0");
  previousId.textContent = `#${idFormatado}`;
}

async function updateNextPokemon(pokemonDados) {
  const divNextLateral = document.querySelector("#divNextLateral");
  const nextImg = document.querySelector("#nextImg");
  const nextName = document.querySelector("#nextName");
  const nextId = document.querySelector("#nextId");

  if (!divNextLateral || !nextImg || !nextName || !nextId) {
    return;
  }

  if (pokemonDados === null || !pokemonDados) {
    return;
  }

  const idAtual = +pokemonDados.id;
  const nextPokemon = await chamarApi(`http://localhost:3000/pokemons/${
    idAtual + 1
  }
`);

  if (!nextPokemon) {
    return;
  }

  const idNext = nextPokemon.id;

  divNextLateral.dataset.id = idNext;

  nextImg.src = nextPokemon.sprites.front_default;
  nextImg.onerror = () => {
    nextImg.src = "./images/not-found.png";
  };

  nextName.textContent = nextPokemon.name;

  const idFormatado = idNext.toString().padStart(4, "0");
  nextId.textContent = `#${idFormatado}`;
}

function updatePokemonEvolution(pokemonDados) {
  const container = document.querySelector("#pokemonEvolutions");
  if (!container) {
    return;
  }

  if (pokemonDados === null || !pokemonDados) {
    return;
  }

  if (!pokemonDados.evolutions?.chain) {
    container.textContent = "Este Pokémon não possui evoluções.";
    return;
  }

  container.innerHTML = "";
  const evolucoes = pokemonDados.evolutions.chain;
  evolucoes.forEach((evo, index) => {
    const img = document.createElement("img");
    img.src = evo.sprite;
    img.alt = evo.nome;
    img.className = "w-20 h-20 drop-shadow-lg";

    container.appendChild(img);

    if (index < evolucoes.length - 1) {
      const motivo = document.createElement("span");
      motivo.textContent = evolucoes[index + 1].condicion || "→";
      motivo.className = "text-sm font-semibold text-white/80 px-2 select-none";
      container.appendChild(motivo);
    }
  });
}
