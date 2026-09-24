import type { LabId } from '../../progress/domain/progress';

export type LabDefinition = {
  id: LabId;
  number: string;
  title: string;
  pattern: string;
  trigger: string;
  complexity: string;
};

export const LABS: readonly LabDefinition[] = [
  {
    id: 'two-sum',
    number: '001',
    title: 'Two Sum',
    pattern: 'Arrays & Hashing',
    trigger: 'Complement lookup and previously seen values',
    complexity: 'O(n) · O(n)',
  },
  {
    id: 'container-water',
    number: '002',
    title: 'Container With Most Water',
    pattern: 'Two Pointers',
    trigger: 'Opposite ends and a limiting boundary',
    complexity: 'O(n) · O(1)',
  },
  {
    id: 'longest-substring',
    number: '003',
    title: 'Longest Substring Without Repeating Characters',
    pattern: 'Sliding Window',
    trigger: 'Contiguous range with a validity invariant',
    complexity: 'O(n) · O(k)',
  },
  {
    id: 'binary-search',
    number: '004',
    title: 'Binary Search',
    pattern: 'Binary Search',
    trigger: 'Sorted input and monotonic elimination',
    complexity: 'O(log n) · O(1)',
  },
  {
    id: 'valid-parentheses',
    number: '005',
    title: 'Valid Parentheses',
    pattern: 'Stack',
    trigger: 'Nested structure requiring last-opened, first-closed matching',
    complexity: 'O(n) · O(n)',
  },
];

export function getLab(labId: LabId): LabDefinition {
  return LABS.find((lab) => lab.id === labId) ?? LABS[0]!;
}
