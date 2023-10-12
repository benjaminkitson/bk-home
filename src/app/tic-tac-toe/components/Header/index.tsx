import React, { useContext } from "react";
import { AppContext } from "../AppContext";

function Header() {
  const { statusText } = useContext(AppContext);

  return (
    <div className="relative w-full flex flex-col items-center justify-center h-48">
      <h1 className="text-5xl mb-5">Tic-Tac-Toe!</h1>
      <div className="flex flex-col items-center justify-center">
        {
          // TODO: change this statusText thing
        }
        <h1 className="text-3xl">{statusText()}</h1>
      </div>
    </div>
  );
}

export default Header;
