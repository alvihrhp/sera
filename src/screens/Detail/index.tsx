import React, { useState, useEffect, useMemo } from "react";
/** Const */
import { images } from "../../const";
/** Components */
import { Badge } from "../../components";
/** React Router Dom */
import { useLocation, Link } from "react-router-dom";
/** Apollo Client */
import { useQuery } from "@apollo/client";
/** Queries */
import { GET_ONE_POKEMON } from "../../queries/pokemon";
/** Font Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {}

const Detail: React.FC<Props> = () => {
  const { search } = useLocation();

  const [query, setQuery] = useState<Record<string, string>>(() => {
    const newSearch: string[] = search.slice(1).split("&").join("").split("=");

    const newQuery: Record<string, string> = {};

    for (let i = 0; i < newSearch.length; i += 2) {
      newQuery[newSearch[i]] = newSearch[i + 1];
    }

    return newQuery;
  });

  const [pokemon, setPokemon] = useState<Record<string, any>>({});

  const { data, error, loading } = useQuery(GET_ONE_POKEMON, {
    variables: { pokemon: query.name },
  });

  const upperCaseFirstChar = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    if (data) {
      const { getPokemon } = data;

      setPokemon(getPokemon);
    }
  }, [data]);

  return (
    <div className="w-full">
      <Link to="/" className="mt-3 flex flex-wrap items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 text-red-dark"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <span className="font-semibold ml-2 text-red-dark">Back</span>
      </Link>
      <div className=" w-full flex flex-wrap justify-center">
        {Object.keys(pokemon).length > 0 ? (
          <div className="border border-blue w-full max-w-[425px] rounded-lg p-2 mt-8 flex flex-wrap md:justify-center gap-[0.925rem]">
            <div className="w-[48%]">
              <img src={pokemon.sprite} className="w-full" />
              <div className="w-full flex flex-wrap justify-center gap-2">
                {pokemon.types.map(
                  (type: Record<string, string>, typeIdx: number) => (
                    <Badge
                      style="bg-yellow shadow-gold py-1 px-4"
                      text={type.name}
                      textStyle="font-semibold text-[0.625rem] text-blue"
                      key={typeIdx}
                    />
                  )
                )}
              </div>
              <h1 className="text-center font-bold text-red-dark mt-3 text-base">
                {upperCaseFirstChar(pokemon.key)}
              </h1>
              <div className="w-full flex flex-wrap justify-center gap-2 mt-3">
                <div className="w-[30%] text-center">
                  <FontAwesomeIcon
                    icon={["fas", "mars"]}
                    size="xl"
                    className="text-blue"
                  />
                  <span className="ml-2 font-semibold">
                    {pokemon.gender.male}
                  </span>
                </div>
                <div className="w-[30%] text-center">
                  <FontAwesomeIcon
                    icon={["fas", "venus"]}
                    size="xl"
                    className="text-pink-500"
                  />
                  <span className="ml-2 font-semibold">
                    {pokemon.gender.male}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[48%] flex flex-col justify-center items-end p-2">
              <div className="w-full">
                <FontAwesomeIcon
                  icon={["fas", "laptop-medical"]}
                  size="xl"
                  className="text-blue w-8 h-8"
                />
                <span className="ml-3 text-red-dark font-semibold">
                  {pokemon.baseStats.hp}% HP
                </span>
              </div>
              <div className="w-full mt-3">
                <FontAwesomeIcon
                  icon={["fas", "hand-fist"]}
                  size="xl"
                  className="text-blue w-8 h-8"
                />
                <span className="ml-3 text-orange-dark font-semibold">
                  {pokemon.baseStats.hp}% Attack
                </span>
              </div>
              <div className="w-full mt-3">
                <FontAwesomeIcon
                  icon={["fas", "shield"]}
                  size="xl"
                  className="text-blue w-8 h-8"
                />
                <span className="ml-3 text-blue font-semibold">
                  {pokemon.baseStats.hp}% Defense
                </span>
              </div>
              <div className="w-full mt-3">
                <FontAwesomeIcon
                  icon={["fas", "wind"]}
                  size="xl"
                  className="text-blue w-8 h-8"
                />
                <span className="ml-3 text-gold font-semibold">
                  {pokemon.baseStats.hp}% Speed
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full mt-8 flex flex-col items-center">
            <img src={images.loading} />
            <h1>Please wait...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
