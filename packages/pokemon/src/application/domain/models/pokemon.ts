import { Entity } from '@acme/shared-kernel';

interface PokemonData {
  id?: string;
  name: string;
  height: number;
  weight: number;
  order: number;
}

class Pokemon extends Entity {
  readonly id?: string;
  readonly name: string;
  readonly height: number;
  readonly weight: number;
  readonly order: number;

  constructor({ id, name, height, weight, order }: PokemonData) {
    super();
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.order = order;
  }

  // some business logic
  get bmi() {
    return Math.round(this.weight / this.height);
  }
}

export default Pokemon;
