import { Pokemon } from '../../application';

interface PokemonDataSource {
  getPokemon: (id: string) => Promise<Pokemon>;
}

export default PokemonDataSource;
