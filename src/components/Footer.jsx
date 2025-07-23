import React from 'react';

function Footer() {
  return (
    <footer className="w-full py-6 px-4 text-center text-sm text-slate-500 border-t border-slate-100 bg-white/80" role="contentinfo">
      <p>
        &copy; {new Date().getFullYear()}{' '}
        <a href="https://risadams.com" target="_blank" rel="noopener noreferrer" className="text-violet-700 hover:underline font-semibold">
          Ris Adams
        </a>
        . All rights reserved. Made with <span role="img" aria-label="love">💜</span> for the AI community.
      </p>
    </footer>
  );
}

export default Footer;
