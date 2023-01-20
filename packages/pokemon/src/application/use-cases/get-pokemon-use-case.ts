import { UseCase } from '@acme/shared-kernel';
import { PokemonPort } from '../ports';
import { Pokemon } from '../domain';

export interface GetPokemonUseCaseInput {
  id: string;
}

class GetPokemonUseCase implements UseCase<GetPokemonUseCaseInput, Pokemon> {
  constructor(private port: PokemonPort) {}

  async execute(dto: GetPokemonUseCaseInput) {
    return await this.port.getPokemon(dto.id);
  }
}

export default GetPokemonUseCase;
