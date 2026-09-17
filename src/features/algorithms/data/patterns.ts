import type { PatternDefinition } from '../domain/types';

export const PATTERNS: readonly PatternDefinition[] = [
  {
    id: 'arrays-hashing',
    title: 'Arrays & Hashing',
    trigger: 'Fast lookup, frequency, complement',
    complexity: 'Usually O(n)',
    status: 'active',
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    trigger: 'Pairs, sorted input, opposite ends',
    complexity: 'Usually O(n)',
    status: 'active',
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    trigger: 'Contiguous range with a condition',
    complexity: 'Usually O(n)',
    status: 'active',
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    trigger: 'Sorted or monotonic search space',
    complexity: 'Usually O(log n)',
    status: 'active',
  },
];
