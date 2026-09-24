import { useEffect, useMemo, useState } from 'react';

export function useAlgorithmPlayer<T>(steps: readonly T[], intervalMs = 900) {
  const [cursor, setCursor] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setCursor(0);
    setIsPlaying(false);
  }, [steps]);

  useEffect(() => {
    if (!isPlaying) return;

    if (cursor >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCursor((current) => Math.min(current + 1, steps.length - 1));
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [cursor, intervalMs, isPlaying, steps.length]);

  const current = useMemo(() => steps[cursor] ?? null, [cursor, steps]);

  return {
    current,
    cursor,
    isPlaying,
    total: steps.length,
    canGoBack: cursor > 0,
    canGoForward: cursor < steps.length - 1,
    next: () => setCursor((value) => Math.min(value + 1, steps.length - 1)),
    previous: () => setCursor((value) => Math.max(value - 1, 0)),
    reset: () => {
      setCursor(0);
      setIsPlaying(false);
    },
    toggle: () => setIsPlaying((value) => !value),
  };
}
