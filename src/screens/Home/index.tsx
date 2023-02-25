import React, { useState, useEffect } from "react";
/** Components */
import { Input, Card, Badge } from "../../components";
/** Apollo Client */
import { useQuery } from "@apollo/client";
/** Queries */
import { GET_ALL_POKEMON } from "../../queries/pokemon";
/** React Router Dom */
import { NavigateFunction, useNavigate } from "react-router-dom";

interface Props {}

const Home: React.FC<Props> = () => {
  const navigate: NavigateFunction = useNavigate();

  const { data, error, loading } = useQuery(GET_ALL_POKEMON);

  const [filterInputs, setFilterInputs] = useState<Record<string, any>[]>([]);

  const [pokemonList, setPokemonList] = useState<Record<string, any>>([]);

  useEffect(() => {
    if (!loading && data.getAllPokemon.length) {
      const { getAllPokemon } = data;

      const newAllPokemon: Record<string, any>[] = [];

      const types: Record<string, number> = {};

      getAllPokemon.forEach((pokemon: Record<string, any>) => {
        newAllPokemon.push({
          ...pokemon,
          isShown: true,
        });
        pokemon.types.forEach((pokemonType: Record<string, string>) => {
          if (!types[pokemonType.name]) {
            types[pokemonType.name] = 0;
          }
        });
      });

      setPokemonList(newAllPokemon);

      const arrObjTypes = Object.keys(types).map((key: string) => {
        return {
          attr: {
            type: "checkbox",
            id: key,
            name: key,
            value: false,
          },
        };
      });

      setFilterInputs(arrObjTypes);
    }
  }, [data, loading]);

  useEffect(() => {
    if (filterInputs.length > 0) {
      const checkInputs = filterInputs.filter((input: Record<string, any>) => {
        return input.attr.value;
      });

      let filterPokemon: Record<string, any> = [];

      if (checkInputs.length) {
        pokemonList.forEach((pokemon: Record<string, any>) => {
          let flag: boolean = false;
          pokemon.types.forEach((type: Record<string, string>) => {
            const { name } = type;
            filterInputs.forEach((input: Record<string, any>) => {
              if (input.attr.name === name && input.attr.value) {
                flag = true;
              }
            });
          });
          filterPokemon.push({
            ...pokemon,
            isShown: flag,
          });
        });
      } else {
        filterPokemon = pokemonList.map((pokemon: Record<string, any>) => {
          return {
            ...pokemon,
            isShown: true,
          };
        });
      }

      setPokemonList(filterPokemon);
    }
  }, [filterInputs]);

  return (
    <>
      <p className="text-center font-bold text-2xl text-red-light">Pokédex</p>
      <p className="text-center text-sm text-red-dark/[0.8] mt-2">
        Search a Pokémon by name or using its National Pokédex number
      </p>
      <div className="w-full flex flex-wrap mt-5 gap-[1.07rem] md:justify-center">
        {filterInputs.length > 0
          ? filterInputs.map((input: Record<string, any>, inputIdx: number) => (
              <div
                key={inputIdx}
                className="w-[30%] flex flex-wrap items-center justify-between"
              >
                <label className="text-sm">
                  {input.attr.name.charAt(0).toUpperCase() +
                    input.attr.name.slice(1)}
                </label>
                <Input
                  key={inputIdx}
                  inputs={filterInputs}
                  setInputs={setFilterInputs}
                  wrapperStyle="relative w-[20px] h-[20px]"
                  inputSyle="focus:outline-none focus:ring-1
                  focus:ring-orange-dark focus:border-orange-light border
                  border-gold p-2 text-sm w-full h-full text-center"
                  attr={input.attr}
                />
              </div>
            ))
          : new Array(18).fill(0).map((item: number, itemIdx: number) => (
              <div
                className="w-[30%] flex flex-wrap items-center justify-between"
                key={itemIdx}
              >
                <div className="w-[51.36px] h-[20px] bg-neutral-400 animate-pulse rounded"></div>
                <div className="w-[20px] h-[20px] bg-neutral-400 animate-pulse rounded"></div>
              </div>
            ))}
      </div>
      <div className="border border-blue w-full rounded-lg p-2 mt-8">
        <div className="w-full flex flex-wrap gap-3 md:gap-[2.165rem] lg:gap-3 xl:gap-[1.15rem]">
          {pokemonList.length > 0
            ? pokemonList.map(
                (pokemon: Record<string, any>, pokemonIdx: number) =>
                  pokemon.isShown && (
                    <Card
                      wrapperStyle="bg-red-light/[0.7] w-[48%] md:w-[30%] lg:w-[24%] shadow-red-dark cursor-pointer"
                      key={pokemonIdx}
                      contentStyle="w-full p-2"
                      action={() => navigate(`/detail?name=${pokemon.key}`)}
                    >
                      <div className="w-full flex flex-wrap justify-center">
                        <img
                          src={pokemon.sprite}
                          className="w-[90px] h-[90px]"
                        />
                      </div>
                      <div className="w-full flex flex-wrap mt-2 gap-1">
                        {pokemon.types.map(
                          (type: Record<string, string>, typeIdx: number) => (
                            <Badge
                              style="bg-white shadow-neutral-500 py-[0.1rem] px-3"
                              text={type.name}
                              textStyle="font-semibold text-[0.5rem]"
                              key={typeIdx}
                            />
                          )
                        )}
                      </div>
                      <p className="text-[0.725rem] mt-2 text-yellow">
                        {pokemon.key.charAt(0).toUpperCase() +
                          pokemon.key.slice(1)}
                      </p>
                    </Card>
                  )
              )
            : new Array(20)
                .fill(0)
                .map((skeleton: number, skeletonIdx: number) => (
                  <div
                    className="w-[48%] md:w-[30%] h-[154.49px] lg:w-[24%] xl:gap-[1.15rem] bg-neutral-400 rounded animate-pulse"
                    key={skeletonIdx}
                  ></div>
                ))}
        </div>
      </div>
    </>
  );
};

export default Home;
