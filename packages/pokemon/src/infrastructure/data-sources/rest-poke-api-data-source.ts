import { request } from '@acme/shared-kernel';
import { Pokemon } from '../../application';
import PokemonDataSource from './pokemon-data-source';

interface ApiResponse {
  id: string;
  name: string;
  order: number;
  height: number;
  weight: number;
}

class RESTPokeApiDataSource implements PokemonDataSource {
  constructor(private client: typeof request) {}

  getPokemon(id: string) {
    return this.client<ApiResponse>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    ).then((pokemon) => new Pokemon(pokemon));
  }
}

export default RESTPokeApiDataSource;
