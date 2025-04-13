import React from 'react';
const Timer = ({ timeLeft }) => {
    const getColor = () => {
      if (timeLeft > 15) return 'text-green-500';
      if (timeLeft > 5) return 'text-yellow-500';
      return 'text-red-500';
    };
  
    return (
      <div className="flex items-center justify-center mb-4">
        <div className={`text-xl font-bold ${getColor()}`}>
          Time Left: {timeLeft}s
        </div>
        <div className="w-full ml-4 bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${getColor().replace('text', 'bg')}`}
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  export default Timer;