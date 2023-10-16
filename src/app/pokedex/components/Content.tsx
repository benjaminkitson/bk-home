import { useQuery } from "@tanstack/react-query";
import { ListItem } from "./ListItem";

export const Content = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["pokedex"],
    queryFn: () =>
      fetch("https://pokedex.benjaminkitson.com/api").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred";

  console.log(data);

  return (
    <>
      <div className="flex h-full w-full grow flex-col items-center justify-start">
        {data.map((pokemon) => (
          <ListItem key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
      <div className="flex h-full w-full grow flex-col items-center justify-start">
        Hello
      </div>
    </>
  );
};
