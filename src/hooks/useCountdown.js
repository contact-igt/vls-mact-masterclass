import { useEffect, useState } from 'react';

const formatUnit = (value) => String(value).padStart(2, '0');

export default function useCountdown(initialSeconds) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => Math.max(currentSeconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return {
    hours: formatUnit(Math.floor(secondsLeft / 3600)),
    minutes: formatUnit(Math.floor((secondsLeft % 3600) / 60)),
    seconds: formatUnit(secondsLeft % 60),
  };
}