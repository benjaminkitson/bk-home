import { Header } from "@/components/Molecules/Header";
import Content from "./components/Content";
import { Pokeball } from "./components/Pokeball";

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
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <Pokeball />
      <Header title="Pokedex" />
      <Content pokemon={pokemon} />
    </div>
  );
}
