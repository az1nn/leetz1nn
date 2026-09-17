export type BinarySearchDecision = 'move-left' | 'move-right' | 'found' | 'not-found';

export type BinarySearchStep = {
  id: number;
  left: number;
  right: number;
  mid: number | null;
  midValue: number | null;
  target: number;
  rangeSize: number;
  decision: BinarySearchDecision;
  foundIndex: number | null;
  activeLine: number;
  message: string;
};

export function traceBinarySearch(nums: readonly number[], target: number): BinarySearchStep[] {
  const steps: BinarySearchStep[] = [];
  let left = 0;
  let right = nums.length - 1;
  let id = 0;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const midValue = nums[mid];

    if (midValue === undefined) break;

    if (midValue === target) {
      steps.push({
        id: id++,
        left,
        right,
        mid,
        midValue,
        target,
        rangeSize: right - left + 1,
        decision: 'found',
        foundIndex: mid,
        activeLine: 5,
        message: `nums[${mid}] = ${midValue}, exactly the target. Search complete.`,
      });
      return steps;
    }

    if (midValue < target) {
      steps.push({
        id: id++,
        left,
        right,
        mid,
        midValue,
        target,
        rangeSize: right - left + 1,
        decision: 'move-right',
        foundIndex: null,
        activeLine: 7,
        message: `${midValue} < ${target}. Discard indices ${left}..${mid}; any match must be to the right.`,
      });
      left = mid + 1;
    } else {
      steps.push({
        id: id++,
        left,
        right,
        mid,
        midValue,
        target,
        rangeSize: right - left + 1,
        decision: 'move-left',
        foundIndex: null,
        activeLine: 9,
        message: `${midValue} > ${target}. Discard indices ${mid}..${right}; any match must be to the left.`,
      });
      right = mid - 1;
    }
  }

  steps.push({
    id: id++,
    left,
    right,
    mid: null,
    midValue: null,
    target,
    rangeSize: 0,
    decision: 'not-found',
    foundIndex: null,
    activeLine: 12,
    message: `The search interval is empty (${left} > ${right}). Target ${target} is not present.`,
  });

  return steps;
}
