import { useState, useEffect, useRef } from 'react';
import { Text } from 'react-native';

interface Props {
  value: number;
  decimals?: number;
  duration?: number;
  style?: any;
}

export function AnimatedNumber({ value, decimals = 0, duration = 600, style }: Props) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplay(from + (value - from) * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        fromRef.current = value;
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  return <Text style={style}>{display.toFixed(decimals)}</Text>;
}
