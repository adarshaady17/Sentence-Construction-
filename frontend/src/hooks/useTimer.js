import { useEffect, useState } from 'react';

const useTimer = (initialTime, onTimeout) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onTimeout]);

  const resetTimer = (newTime = initialTime) => {
    setTimeLeft(newTime);
    setIsRunning(true);
  };

  const pauseTimer = () => setIsRunning(false);
  const resumeTimer = () => setIsRunning(true);

  return { timeLeft, resetTimer, pauseTimer, resumeTimer };
};

export default useTimer;