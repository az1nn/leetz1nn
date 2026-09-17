export interface SlidingWindowStep {
  id: number;
  phase: 'scan' | 'done';
  left: number;
  previousLeft: number;
  right: number;
  char: string;
  previousIndex: number | null;
  window: string;
  seen: Readonly<Record<string, number>>;
  bestLength: number;
  bestRange: readonly [number, number];
  repeated: boolean;
  activeLine: number;
  message: string;
}

function snapshot(seen: Map<string, number>): Record<string, number> {
  return Object.fromEntries(seen.entries());
}

export function traceLongestSubstring(value: string): SlidingWindowStep[] {
  const seen = new Map<string, number>();
  const steps: SlidingWindowStep[] = [];
  let left = 0;
  let bestLength = 0;
  let bestRange: readonly [number, number] = [0, -1];
  let id = 0;

  if (value.length === 0) {
    return [
      {
        id,
        phase: 'done',
        left: 0,
        previousLeft: 0,
        right: -1,
        char: '',
        previousIndex: null,
        window: '',
        seen: {},
        bestLength: 0,
        bestRange,
        repeated: false,
        activeLine: 10,
        message: 'Empty string: the longest substring without repeating characters has length 0.',
      },
    ];
  }

  for (let right = 0; right < value.length; right += 1) {
    const char = value[right] ?? '';
    const previousIndex = seen.get(char) ?? null;
    const previousLeft = left;

    if (previousIndex !== null && previousIndex >= left) {
      left = previousIndex + 1;
    }

    seen.set(char, right);

    const windowLength = right - left + 1;
    if (windowLength > bestLength) {
      bestLength = windowLength;
      bestRange = [left, right];
    }

    const repeated = left !== previousLeft;
    const window = value.slice(left, right + 1);

    steps.push({
      id: id++,
      phase: 'scan',
      left,
      previousLeft,
      right,
      char,
      previousIndex,
      window,
      seen: snapshot(seen),
      bestLength,
      bestRange,
      repeated,
      activeLine: repeated ? 4 : 7,
      message: repeated
        ? `“${char}” was already inside the active window at index ${previousIndex}. Move left from ${previousLeft} to ${left}; the valid window is now “${window}”.`
        : `Add “${char}” at index ${right}. The window “${window}” still contains unique characters.`,
    });
  }

  const [bestLeft, bestRight] = bestRange;
  const bestWindow = bestRight >= bestLeft ? value.slice(bestLeft, bestRight + 1) : '';

  steps.push({
    id: id++,
    phase: 'done',
    left: bestLeft,
    previousLeft: bestLeft,
    right: bestRight,
    char: '',
    previousIndex: null,
    window: bestWindow,
    seen: snapshot(seen),
    bestLength,
    bestRange,
    repeated: false,
    activeLine: 10,
    message: `Finished. Best length = ${bestLength} with substring “${bestWindow}”.`,
  });

  return steps;
}
