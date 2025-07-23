import React from 'react';

function Footer() {
  return (
    <footer className="app-footer" role="contentinfo">
      <p>
        &copy; {new Date().getFullYear()}{' '}
        <a href="https://risadams.com" target="_blank" rel="noopener noreferrer">
          Ris Adams
        </a>
        . All rights reserved. Made with 💜 for the AI community.
      </p>
    </footer>
  );
}

export default Footer;
