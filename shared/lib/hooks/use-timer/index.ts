import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useCallback, useEffect, useRef, useState } from 'react';

dayjs.extend(duration);

export type CountdownTimerReturn = {
  startTimer: (initialSeconds: number, onFinish?: () => void) => void;
  stopTimer: () => void;
  clearTimer: () => void;
  secondsLeft: number;
  isRunning: boolean;
  formattedTime: string;
};

const DELAY = 1000;

export const useCountdownTimer = (): CountdownTimerReturn => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);
  const finishCallback = useRef<(() => void) | null>(null);
  const finishedRef = useRef(false);

  const clearTimerInterval = useCallback(() => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  }, []);

  const startTimer = useCallback(
    (initialSeconds: number, onFinish?: () => void) => {
      if (!Number.isFinite(initialSeconds) || initialSeconds <= 0) {
        setSecondsLeft(0);
        return;
      }

      clearTimerInterval();
      finishedRef.current = false;

      setSecondsLeft(initialSeconds);
      setIsRunning(true);
      finishCallback.current = onFinish || null;

      timerId.current = setInterval(() => {
        setSecondsLeft((prev) => {
          const newSeconds = prev - 1;

          if (newSeconds <= 0) {
            clearTimerInterval();
            setIsRunning(false);

            if (finishCallback.current && !finishedRef.current) {
              finishedRef.current = true;
              setTimeout(() => finishCallback.current?.(), 0);
            }

            return 0;
          }

          return newSeconds;
        });
      }, DELAY);
    },
    [clearTimerInterval],
  );

  const stopTimer = useCallback(() => {
    clearTimerInterval();
    setIsRunning(false);
  }, [clearTimerInterval]);

  const clearTimer = useCallback(() => {
    clearTimerInterval();
    setSecondsLeft(0);
    setIsRunning(false);
    finishCallback.current = null;
    finishedRef.current = false;
  }, [clearTimerInterval]);

  useEffect(() => {
    return () => {
      clearTimerInterval();
    };
  }, [clearTimerInterval]);

  const formattedTime = dayjs
    .duration(secondsLeft, 'seconds')
    .format(secondsLeft >= 3600 ? 'HH:mm:ss' : 'mm:ss');

  return {
    startTimer,
    formattedTime,
    stopTimer,
    clearTimer,
    secondsLeft,
    isRunning,
  };
};
