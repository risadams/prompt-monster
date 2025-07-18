import logo from './logo.svg';
import './App.css';
import Gun from 'gun';
import React from 'react';

import personas from './data/Persona.json';
import roles from './data/Role.json';

function App() {
  const [gunValue, setGunValue] = React.useState('');

  React.useEffect(() => {
    const gun = Gun();
    // Set a trivial value
    gun.get('test').put({ hello: 'world' });
    // Get the value
    gun.get('test').on(data => {
      setGunValue(data.hello);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          GunDB value: <strong>{gunValue}</strong>
        </p>
        <h2>Personas</h2>
        <ul>
          {personas.map(persona => (
            <li key={persona.id}>
              <strong>{persona.name}</strong> ({persona.occupation}, Age: {persona.age})<br />
              Traits: {persona.traits.join(', ')}
            </li>
          ))}
        </ul>
        <h2>Roles</h2>
        <ul>
          {roles.map(role => (
            <li key={role.id}>
              <strong>{role.name}</strong>: {role.description}
            </li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
