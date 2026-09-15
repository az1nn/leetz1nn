import type { TwoSumStep } from '../domain/types';

function snapshot(seen: Map<number, number>): Record<string, number> {
  return Object.fromEntries([...seen.entries()].map(([value, index]) => [String(value), index]));
}

export function traceTwoSum(nums: readonly number[], target: number): TwoSumStep[] {
  const seen = new Map<number, number>();
  const steps: TwoSumStep[] = [];
  let id = 0;

  for (let index = 0; index < nums.length; index += 1) {
    const value = nums[index];

    if (value === undefined) continue;

    const complement = target - value;

    steps.push({
      id: id++,
      phase: 'scan',
      index,
      value,
      complement,
      seen: snapshot(seen),
      activeLine: 2,
      message: `Read nums[${index}] = ${value}. We need ${complement}.`,
      match: null,
    });

    steps.push({
      id: id++,
      phase: 'lookup',
      index,
      value,
      complement,
      seen: snapshot(seen),
      activeLine: 3,
      message: `Look up complement ${complement} in the hash map.`,
      match: null,
    });

    const matchIndex = seen.get(complement);

    if (matchIndex !== undefined) {
      steps.push({
        id: id++,
        phase: 'match',
        index,
        value,
        complement,
        seen: snapshot(seen),
        activeLine: 4,
        message: `Found ${complement} at index ${matchIndex}. Pair complete.`,
        match: [matchIndex, index],
      });

      return steps;
    }

    seen.set(value, index);

    steps.push({
      id: id++,
      phase: 'store',
      index,
      value,
      complement,
      seen: snapshot(seen),
      activeLine: 6,
      message: `Store ${value} → ${index} for future lookups.`,
      match: null,
    });
  }

  steps.push({
    id: id++,
    phase: 'done',
    index: Math.max(0, nums.length - 1),
    value: nums.at(-1) ?? 0,
    complement: 0,
    seen: snapshot(seen),
    activeLine: 8,
    message: 'Finished scanning. No valid pair exists.',
    match: null,
  });

  return steps;
}
