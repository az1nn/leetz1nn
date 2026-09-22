import { describe, expect, it } from 'vitest';

import { traceBinarySearch } from './binarySearch';
import { traceContainerWithMostWater } from './containerWithMostWater';
import { traceLongestSubstring } from './longestSubstring';
import { traceRangeSum } from './prefixSum';
import { traceTwoSum } from './twoSum';
import { traceValidParentheses } from './validParentheses';

describe('algorithm traces', () => {
  it('finds Two Sum through the hash-map trace', () => {
    const finalStep = traceTwoSum([3, 2, 4], 6).at(-1);
    expect(finalStep?.phase).toBe('match');
    expect(finalStep?.match).toEqual([1, 2]);
  });

  it('finds max container area', () => {
    const finalStep = traceContainerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7]).at(-1);
    expect(finalStep?.bestArea).toBe(49);
    expect(finalStep?.bestPair).toEqual([1, 8]);
  });

  it('handles the minimal two-wall container', () => {
    expect(traceContainerWithMostWater([1, 1]).at(-1)?.bestArea).toBe(1);
  });

  it('finds the longest unique substring with a sliding window', () => {
    const finalStep = traceLongestSubstring('abcabcbb').at(-1);
    expect(finalStep?.bestLength).toBe(3);
    expect(finalStep?.window).toBe('abc');
  });

  it('shrinks past duplicates inside the active window', () => {
    const repeatedStep = traceLongestSubstring('abba').find((step) => step.right === 2);
    expect(repeatedStep?.repeated).toBe(true);
    expect(repeatedStep?.left).toBe(2);
    expect(traceLongestSubstring('bbbbb').at(-1)?.bestLength).toBe(1);
  });

  it('handles an empty string as a zero-length window', () => {
    expect(traceLongestSubstring('').at(-1)?.bestLength).toBe(0);
  });

  it('finds a target by logarithmically shrinking the binary-search interval', () => {
    const steps = traceBinarySearch([-1, 0, 3, 5, 9, 12], 9);
    const finalStep = steps.at(-1);
    expect(finalStep?.decision).toBe('found');
    expect(finalStep?.foundIndex).toBe(4);
    expect(steps.length).toBeLessThanOrEqual(3);
  });

  it('returns a stable not-found terminal state', () => {
    const finalStep = traceBinarySearch([-1, 0, 3, 5, 9, 12], 2).at(-1);
    expect(finalStep?.decision).toBe('not-found');
    expect(finalStep?.foundIndex).toBeNull();
    expect(finalStep?.rangeSize).toBe(0);
  });

  it('accepts correctly nested parentheses and empties the stack', () => {
    const finalStep = traceValidParentheses('({[]})').at(-1);
    expect(finalStep?.phase).toBe('complete');
    expect(finalStep?.valid).toBe(true);
    expect(finalStep?.stack).toEqual([]);
  });

  it('fails immediately when a closing bracket mismatches the stack top', () => {
    const finalStep = traceValidParentheses('([)]').at(-1);
    expect(finalStep?.phase).toBe('mismatch');
    expect(finalStep?.index).toBe(2);
    expect(finalStep?.expectedOpening).toBe('(');
    expect(finalStep?.actualTop).toBe('[');
    expect(finalStep?.valid).toBe(false);
  });

  it('rejects input that ends with unmatched opening brackets', () => {
    const finalStep = traceValidParentheses('(([]').at(-1);
    expect(finalStep?.phase).toBe('complete');
    expect(finalStep?.valid).toBe(false);
    expect(finalStep?.stack).toEqual(['(', '(']);
  });

  it('builds a prefix array and answers an inclusive range in O(1)', () => {
    const finalStep = traceRangeSum([2, -1, 3, 5, -2], 1, 3).at(-1);
    expect(finalStep?.phase).toBe('query');
    expect(finalStep?.prefix).toEqual([0, 2, 1, 4, 9, 7]);
    expect(finalStep?.leftPrefixIndex).toBe(1);
    expect(finalStep?.rightPrefixIndex).toBe(4);
    expect(finalStep?.rangeSum).toBe(7);
  });

  it('handles a single-element Prefix Sum range without special casing', () => {
    const finalStep = traceRangeSum([4, -6, 9], 2, 2).at(-1);
    expect(finalStep?.rangeSum).toBe(9);
    expect(finalStep?.message).toContain('prefix[3] - prefix[2]');
  });

  it('rejects invalid range bounds in the pure Prefix Sum trace', () => {
    expect(() => traceRangeSum([1, 2, 3], 2, 1)).toThrow(RangeError);
    expect(() => traceRangeSum([], 0, 0)).toThrow(RangeError);
  });
});
