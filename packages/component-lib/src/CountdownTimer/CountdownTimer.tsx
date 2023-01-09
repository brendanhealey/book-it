import React, { useState } from 'react';
import Typography from '@mui/joy/Typography';
import { useInterval } from 'component-lib';

const UPDATE_INTERVAL = 1000; // milliseconds, update the display every 1 second

export interface TimerProps {
  interval: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  };
  callback?: () => void;
  colour?: string;
}

export const CountdownTimer = ({ interval, callback = undefined, colour = 'red' }: TimerProps) => {
  const { hours = 0, minutes = 0, seconds = 0 } = interval;
  // the line check is confused by the destructuring but I think it's ok
  // eslint-disable-next-line react/hook-use-state
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
  const [millisecs, setMillisecs] = useState<number | null>(UPDATE_INTERVAL);

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      setMillisecs(null);
      if (callback) callback();
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  useInterval(() => {
    tick();
  }, millisecs);

  return (
    <Typography display="inline" component="span" textColor={colour}>
      {`${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
    </Typography>
  );
};

export default CountdownTimer;
