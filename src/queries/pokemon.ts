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

export { GET_ALL_POKEMON };
