import { PokemonPort } from '../../application';
import { PokemonDataSource, CachedPokemonDataSource } from '../data-sources';

class PokemonRepository implements PokemonPort {
  constructor(
    private dataSource: PokemonDataSource,
    private cacheDataSource: CachedPokemonDataSource
  ) {}

  async getPokemon(id: string) {
    try {
      return await this.cacheDataSource.getPokemon(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.info(error.message);
      }
    }

    const pokemon = await this.dataSource.getPokemon(id);

    await this.cacheDataSource.savePokemon(id, pokemon);

    return pokemon;
  }
}

export default PokemonRepository;
