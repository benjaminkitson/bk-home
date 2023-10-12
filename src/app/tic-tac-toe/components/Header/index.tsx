import React, { useContext } from "react";
import { AppContext } from "../AppContext";

function Header() {
  const { statusText } = useContext(AppContext);

  return (
    <div className="relative flex h-32 w-full flex-col items-center justify-center">
      <h1 className="mb-5 text-4xl">Tic-Tac-Toe!</h1>
      <div className="flex flex-col items-center justify-center">
        {
          // TODO: change this statusText thing
        }
        <h1 className="text-2xl">{statusText()}</h1>
      </div>
    </div>
  );
}

export default Header;
