import React from 'react';

const AppHeader = () => {
  return (
    <header className="app-header" role="banner">
      <div className="header-content">
        <img
          src={`${process.env.PUBLIC_URL}/logo.svg`}
          alt="Prompt Monster - A friendly purple monster mascot"
          className="monster-logo"
        />
        <h1 className="app-title">Prompt Monster</h1>
        <p className="app-subtitle">
          Unleash your creativity with monstrously good prompts! 🎭
        </p>
      </div>
    </header>
  );
};

export default AppHeader;
