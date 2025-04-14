import React from 'react';
const BlankWord = ({ word, onClick, isCorrect, showResult }) => {
    const getBackgroundColor = () => {
      if (!showResult) return 'bg-gray-100';
      return isCorrect ? 'bg-green-100' : 'bg-red-100';
    };
  
    return (
      <span
        onClick={onClick}
        className={`inline-block min-w-[80px] border-b-2 border-blue-500 mx-1 px-2 cursor-pointer ${getBackgroundColor()}`}
      >
        {word || '______'}
      </span>
    );
  };
  
  export default BlankWord;