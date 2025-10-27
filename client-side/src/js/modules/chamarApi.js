export default async function chamarApi(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    const stack = new Error().stack;
    console.log("Chamar API foi chamado por:\n", stack);
    console.error("Erro ao chamar API:", error);
    return null;
  }
}
