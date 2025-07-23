import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMasksTheater } from '@awesome.me/kit-1792c0f8ba/icons/sharp-duotone/thin'

function Header() {
  return (
    <header className="w-full py-10 px-4 text-center relative bg-gradient-to-b from-violet-100/60 to-white" role="banner">
      <div className="relative z-10 flex flex-col items-center">
        <img
          src={`${process.env.PUBLIC_URL}/logo.svg`}
          alt="Prompt Monster - A friendly purple monster mascot"
          className="w-24 h-24 mb-4 drop-shadow-lg animate-[float_3s_ease-in-out_infinite]"
        />
        <h1 className="font-extrabold text-4xl md:text-5xl bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent mb-2">Prompt Monster</h1>
        <p className="text-indigo-700 text-lg font-medium opacity-90">
          Unleash your creativity with monstrously good prompts! <FontAwesomeIcon icon={faMasksTheater} />
        </p>
      </div>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="w-full h-full bg-gradient-radial from-violet-200/40 to-transparent" />
      </div>
    </header>
  );
}

export default Header;
