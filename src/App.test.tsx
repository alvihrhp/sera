import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ALL_POKEMON, GET_ONE_POKEMON } from "./queries/pokemon";
import { Home, Detail } from "./screens";

afterEach(() => {
  cleanup();
});

const getAllPokemonMock = [
  {
    request: {
      query: GET_ALL_POKEMON,
      variables: {},
    },
    result: {
      data: {
        getAllPokemon: [
          {
            species: "Pokestar",
            types: [
              {
                name: "Normal",
              },
            ],
            sprite:
              "https://play.pokemonshowdown.com/sprites/gen5/pokestarsmeargle.png",
            key: "pokestarsmeargle",
          },
        ],
      },
    },
  },
]; // We'll fill this in next

it("Should fetch all pokemons and render it", async () => {
  render(
    <BrowserRouter>
      <MockedProvider mocks={getAllPokemonMock} addTypename={false}>
        <Home />
      </MockedProvider>
    </BrowserRouter>
  );

  expect(await screen.findByTestId("pokemon-types")).toBeInTheDocument();
  expect(await screen.findByTestId("image-pokemon")).toBeInTheDocument();
  expect(await screen.findByText("Pokestarsmeargle")).toBeInTheDocument();
});

const route = "/detail?name=pokestarsmeargle";

const getOnePokemonMock = [
  {
    request: {
      query: GET_ONE_POKEMON,
      variables: { pokemon: "pokestarsmeargle" },
    },
    result: {
      data: {
        getAllPokemon: [
          {
            species: "Pokestar",
            types: [
              {
                name: "Normal",
              },
            ],
            sprite:
              "https://play.pokemonshowdown.com/sprites/gen5/pokestarsmeargle.png",
            key: "pokestarsmeargle",
            gender: {
              male: "50%",
              female: "50%",
            },
          },
        ],
      },
    },
  },
];

it("Should fetch one pokemon and render it", async () => {
  render(
    <MemoryRouter initialEntries={[route]}>
      <MockedProvider mocks={getOnePokemonMock} addTypename={false}>
        <Detail />
      </MockedProvider>
    </MemoryRouter>
  );
  expect(await screen.findByTestId("pokemon-hp")).toBeInTheDocument();
  expect(await screen.findByTestId("pokemon-attack")).toBeInTheDocument();
  expect(await screen.findByTestId("pokemon-defense")).toBeInTheDocument();
  expect(await screen.findByTestId("pokemon-speed")).toBeInTheDocument();
  expect(await screen.findByTestId("pokemon-types")).toBeInTheDocument();
  expect(await screen.findByTestId("image-pokemon")).toBeInTheDocument();
  expect(await screen.findByText("Pokestarsmeargle")).toBeInTheDocument();
});
