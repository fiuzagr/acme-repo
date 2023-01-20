import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import routesPath from './routes-path';

const ShowPokemonPage = lazy(
  () =>
    import(/* webpackChunkName: "show-pokemon" */ './pages/show-pokemon-page')
);

const Index = () => {
  return (
    <Routes>
      <Route path={routesPath.home}>
        <Route path={routesPath.show} element={<ShowPokemonPage />} />
      </Route>
    </Routes>
  );
};

export default Index;
