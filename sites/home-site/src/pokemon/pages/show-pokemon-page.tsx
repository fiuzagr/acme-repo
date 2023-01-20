import React from 'react';
import { useParams } from 'react-router-dom';
import { GetPokemonUseCaseInput, Pokemon } from '@acme/pokemon';
import { useUseCase } from '../../shared';
import { getPokemonUseCase } from '../use-cases';

const ShowPokemonPage = () => {
  const { slug } = useParams();
  const input = { id: slug || 'unknow' };
  const { loading, data: pokemon } = useUseCase<
    GetPokemonUseCaseInput,
    Pokemon
  >(getPokemonUseCase, input);

  return loading || !pokemon ? null : (
    <>
      <h2>Pokemon: {pokemon.name}</h2>
      <div>Height: {pokemon.height}</div>
      <div>Weight: {pokemon.weight}</div>
      <div>BMI: {pokemon.bmi}</div>
    </>
  );
};

export default ShowPokemonPage;
