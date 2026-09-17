import { describe, expect, it } from 'vitest';

import { traceContainerWithMostWater } from './containerWithMostWater';
import { traceTwoSum } from './twoSum';

describe('algorithm traces', () => {
  it('finds Two Sum through the hash-map trace', () => {
    const steps = traceTwoSum([3, 2, 4], 6);
    const finalStep = steps.at(-1);

    expect(finalStep?.phase).toBe('match');
    expect(finalStep?.match).toEqual([1, 2]);
  });

  it('preserves the two-pointer invariant and finds max container area', () => {
    const steps = traceContainerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7]);
    const finalStep = steps.at(-1);

    expect(finalStep?.move).toBe('done');
    expect(finalStep?.bestArea).toBe(49);
    expect(finalStep?.bestPair).toEqual([1, 8]);
  });

  it('handles the minimal two-wall container', () => {
    const steps = traceContainerWithMostWater([1, 1]);

    expect(steps.at(-1)?.bestArea).toBe(1);
  });
});
