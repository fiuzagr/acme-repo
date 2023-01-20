import { Pokemon } from '../../application';
import PokemonDataSource from './pokemon-data-source';

class CachedPokemonDataSource implements PokemonDataSource {
  constructor(private storage: Storage) {}

  async getPokemon(id: string) {
    const cachedPokemon = await this.storage.getItem(id);

    if (!cachedPokemon) throw new Error(`Pokemon '${id}' is not in the cache.`);

    return Promise.resolve(new Pokemon(JSON.parse(cachedPokemon) as Pokemon));
  }

  async savePokemon(id: string, pokemon: Pokemon) {
    return this.storage.setItem(id, JSON.stringify(pokemon.toObject()));
  }
}

export default CachedPokemonDataSource;
