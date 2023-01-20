import { Pokemon } from '../domain';

interface PokemonPort {
  getPokemon(id: string): Promise<Pokemon>;
}

export default PokemonPort;
