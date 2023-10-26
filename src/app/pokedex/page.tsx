import Content from "./components/Content";

const getPokemon = async () => {
  const pokemon = await fetch("https://pokedex.benjaminkitson.com/api").then(
    (res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    },
  );

  return pokemon;
};

export default async function Pokedex() {
  const pokemon = await getPokemon();

  return (
    <div className="bg-green flex h-screen w-screen items-center justify-center">
      <Content pokemon={pokemon} />
    </div>
  );
}
