import React from "react";
/** Components */
import { Navbar } from "./components";
/** Const */

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen overflow-y-scroll">
      <Navbar />
      <div className="max-w-[1440px] p-4 w-full">
        <p className="text-center font-bold text-2xl text-red-light">Pokédex</p>
        <p className="text-center text-sm text-red-dark/[0.8] mt-2">
          Search a Pokémon by name or using its National Pokédex number
        </p>
      </div>
    </div>
  );
};

export default App;
