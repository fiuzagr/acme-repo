import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CounterButton } from '@acme/ui';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h2>Home Site</h2>
        <img src={logo} className="app-logo" alt="logo" />
        <CounterButton />
      </header>
    </div>
  );
}

export default App;
