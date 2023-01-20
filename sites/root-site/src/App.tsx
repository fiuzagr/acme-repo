import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { CounterButton } from '@acme/ui';

const HomeApp = React.lazy(() => import('@acme/home-site/app'));

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Root Site</h1>
        <img src={logo} className="app-logo" alt="logo" />
        <CounterButton />

        <Suspense fallback={'loading...'}>
          <HomeApp />
        </Suspense>
      </header>
    </div>
  );
}

export default App;
