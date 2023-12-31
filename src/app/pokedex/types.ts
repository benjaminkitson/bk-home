export type PokemonType =
  | "Grass"
  | "Poison"
  | "Fire"
  | "Flying"
  | "Water"
  | "Bug"
  | "Normal"
  | "Electric"
  | "Ground"
  | "Fairy"
  | "Fighting"
  | "Psychic"
  | "Rock"
  | "Steel"
  | "Ice"
  | "Ghost"
  | "Dragon"
  | "Dark";

export type Pokemon = {
  ability: string;
  description: string;
  evolutionChain: string[];
  height: number;
  id: string;
  mainImageSrc: string;
  name: string;
  thumbImageSrc: string;
  types: PokemonType[];
  weight: 7;
};
