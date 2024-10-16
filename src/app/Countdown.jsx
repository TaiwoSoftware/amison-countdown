'use client';
import { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentDate = new Date();
      const tomorrow = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
      const difference = tomorrow - currentDate;

      let timeLeft = {};
      if (difference > 0) {
        timeLeft = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      setLoading(false);
    }, 1000);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div key={interval} className="text-center p-2 m-2 bg-gray-800 text-white rounded-lg flex-1">
      <span className="text-3xl sm:text-4xl md:text-5xl font-bold">{timeLeft[interval]}</span>
      <div className="text-gray-400 text-sm sm:text-base">{interval}</div>
    </div>
  ));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">Countdown to Tomorrow</h1>
      
      {loading ? (
        <div className="flex items-center justify-center space-x-2 animate-pulse">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded-full"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-500 rounded-full"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-400 rounded-full"></div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-center">
          {timerComponents.length ? (
            <div className="flex flex-col sm:flex-row">
              {timerComponents.map((component, index) => (
                <div key={index} className="w-full sm:w-auto">
                  {component}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Countdown;
