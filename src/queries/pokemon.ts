/** Apollo Client */
import { client } from "../helper";
import { gql } from "@apollo/client";

const GET_ALL_POKEMON = gql`
  query getAllPokemon($offset: Int, $take: Int) {
    getAllPokemon(offset: $offset, take: $take) {
      species
      types {
        name
      }
      sprite
      key
    }
  }
`;

const GET_ONE_POKEMON = gql`
  query getPokemon($pokemon: PokemonEnum!) {
    getPokemon(pokemon: $pokemon) {
      species
      types {
        name
      }
      sprite
      key
      gender {
        male
        female
      }
      baseStats {
        attack
        defense
        hp
        speed
      }
    }
  }
`;

export { GET_ALL_POKEMON, GET_ONE_POKEMON };
