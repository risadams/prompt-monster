import React from 'react';
import roles from './data/Role.json';
import templates from './data/Templates.json';
import Logo from '../logo.svg';

function App() {
  // ...existing code...
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f9fafb 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <header style={{ width: '100%', padding: '2em 0 1em 0', textAlign: 'center', position: 'relative' }}>
        <img src={Logo} alt="Prompt Monster Logo" style={{ width: 80, height: 80, marginBottom: '0.5em', filter: 'drop-shadow(0 2px 8px #a5b4fc)' }} />
        <h1 style={{ fontWeight: 700, fontSize: '2.5em', color: '#8B5CF6', marginBottom: '0.2em', letterSpacing: '1px', textShadow: '0 2px 8px #a5b4fc' }}>Prompt Monster</h1>
        <p style={{ color: '#6366f1', fontSize: '1.2em', marginBottom: 0, fontWeight: 500 }}>Unleash your creativity with monstrously good prompts!</p>
      </header>
      {/* ...existing main, aside, section, and footer code... */}
    </div>
  );
}

export default App;
