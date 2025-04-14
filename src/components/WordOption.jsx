import React from 'react';
const WordOption = ({ word, onClick, disabled, used }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-md transition-colors ${
          disabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        } ${
          used ? 'line-through opacity-70' : ''
        }`}
      >
        {word}
      </button>
    );
  };
  
  export default WordOption;