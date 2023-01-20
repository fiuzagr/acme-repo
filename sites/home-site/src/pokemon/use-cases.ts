import { request } from '@acme/shared-kernel';
import {
  // FakePokemonDataSource as PokemonDataSource,
  GraphqlPokemonDataSource as PokemonDataSource,
  // RESTPokeApiDataSource as PokemonDataSource,
  CachedPokemonDataSource,
  PokemonRepository,
  GetPokemonUseCase,
} from '@acme/pokemon';

const cachedPokemonDataSource = new CachedPokemonDataSource(
  window.localStorage
);
const pokemonDataSource = new PokemonDataSource(request);
const pokemonRepository = new PokemonRepository(
  pokemonDataSource,
  cachedPokemonDataSource
);
const getPokemonUseCase = new GetPokemonUseCase(pokemonRepository);

export { getPokemonUseCase };
