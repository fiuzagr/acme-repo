import { request } from '@acme/shared-kernel';
import { Pokemon } from '../../application';
import PokemonDataSource from './pokemon-data-source';

const randomNumber = (max: number) => Math.floor(Math.random() * max);

class FakePokemonDataSource implements PokemonDataSource {
  constructor(private client: typeof request) {}

  getPokemon(id: string) {
    return Promise.resolve(
      new Pokemon({
        id,
        name: 'Fake Pokemon',
        height: randomNumber(10),
        weight: randomNumber(100),
        order: randomNumber(150),
      })
    );
  }
}

export default FakePokemonDataSource;
