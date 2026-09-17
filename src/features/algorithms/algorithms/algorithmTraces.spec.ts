import { describe, expect, it } from 'vitest';

import { traceContainerWithMostWater } from './containerWithMostWater';
import { traceLongestSubstring } from './longestSubstring';
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

  it('finds the longest unique substring with a sliding window', () => {
    const steps = traceLongestSubstring('abcabcbb');
    const finalStep = steps.at(-1);

    expect(finalStep?.bestLength).toBe(3);
    expect(finalStep?.window).toBe('abc');
  });

  it('shrinks past duplicates that are still inside the active window', () => {
    const repeatedStep = traceLongestSubstring('abba').find((step) => step.right === 2);

    expect(repeatedStep?.repeated).toBe(true);
    expect(repeatedStep?.left).toBe(2);
    expect(traceLongestSubstring('bbbbb').at(-1)?.bestLength).toBe(1);
  });

  it('handles an empty string as a zero-length window', () => {
    const finalStep = traceLongestSubstring('').at(-1);

    expect(finalStep?.bestLength).toBe(0);
    expect(finalStep?.window).toBe('');
  });
});
