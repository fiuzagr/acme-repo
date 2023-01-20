import { request } from '@acme/shared-kernel';
import { Pokemon } from '../../application';
import PokemonDataSource from './pokemon-data-source';

interface ApiResponse {
  data: {
    data: {
      key: string;
      num: number;
      height: number;
      weight: number;
    };
  };
}

class GraphqlPokemonDataSource implements PokemonDataSource {
  constructor(private client: typeof request) {}

  getPokemon(id: string) {
    return this.client<ApiResponse>(`https://graphqlpokemon.favware.tech/v7`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            {
              data: getPokemon(pokemon: ${id}) {
                key
                num
                height
                weight
              }
            }
          `,
      }),
    })
      .then((response) => response.data.data)
      .then((pokemon) => {
        return {
          id: `${pokemon.num}`,
          name: pokemon.key,
          height: pokemon.height,
          weight: pokemon.weight,
          order: pokemon.num,
        } as Pokemon;
      })
      .then((pokemon) => new Pokemon(pokemon));
  }
}

export default GraphqlPokemonDataSource;
