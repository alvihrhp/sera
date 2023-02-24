import React, { useState, useEffect } from "react";
/** Components */
import { Navbar, Input, Card } from "./components";
/** Apollo Client */
import { useQuery } from "@apollo/client";
import type { Query } from "@favware/graphql-pokemon";
/** Queries */
import { GET_ALL_POKEMON } from "./queries/pokemon";

interface GraphQLPokemonResponse<K extends keyof Omit<Query, "__typename">> {
  data: Record<K, Omit<Query[K], "__typename">>;
}

const App: React.FC = () => {
  const [pagination, setPagonation] = useState<Record<string, number>>({
    take: 10,
    offset: 0,
  });

  const [searchInput, setSearchInput] = useState<Record<string, any>[]>([
    {
      attr: {
        type: "text",
        id: "search",
        name: "search",
        value: "",
        placeholder: "Name or Number",
        autoFocus: true,
      },
      icon: {
        render: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute top-[6.5px] left-[7px] text-neutral-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        ),
      },
    },
  ]);

  const { data, error, loading } = useQuery(GET_ALL_POKEMON, {
    variables: { offset: pagination.offset, take: pagination.take },
  });

  return (
    <div className="w-screen h-screen overflow-y-scroll">
      <Navbar />
      <div className="max-w-[1440px] p-4 w-full">
        <p className="text-center font-bold text-2xl text-red-light">Pokédex</p>
        <p className="text-center text-sm text-red-dark/[0.8] mt-2">
          Search a Pokémon by name or using its National Pokédex number
        </p>
        {searchInput.map(
          (input: Record<string, any>, inputIdx: number) =>
            input.icon && (
              <Input
                key={inputIdx}
                inputs={searchInput}
                setInputs={setSearchInput}
                wrapperStyle="relative w-full mt-5"
                inputSyle="w-full focus:outline-none focus:ring-1 focus:ring-orange-dark focus:border-orange-light border border-gold py-2 pl-9 pr-3 rounded-lg text-sm"
                icon={input.icon}
                attr={input.attr}
              />
            )
        )}
        <div className="border border-blue w-full rounded-lg p-2 mt-8">
          <div className="w-full flex flex-wrap gap-3">
            {!loading && data.getAllPokemon.length ? (
              data.getAllPokemon.map(
                (pokemon: Record<string, any>, pokemonIdx: number) => (
                  <Card
                    wrapperStyle="bg-red-light/[0.7] w-[48%] shadow-red-dark"
                    key={pokemonIdx}
                    contentStyle="w-full p-2 flex flex-col items-center"
                  >
                    <img src={pokemon.sprite} className="w-[90px] h-[90px]" />
                    <div className="w-full flex flex-wrap"></div>
                  </Card>
                )
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
