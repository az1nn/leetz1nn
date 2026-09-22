export type PrefixSumPhase = 'seed' | 'accumulate' | 'query';

export type PrefixSumStep = {
  id: number;
  phase: PrefixSumPhase;
  index: number | null;
  value: number | null;
  prefix: number[];
  left: number;
  right: number;
  leftPrefixIndex: number;
  rightPrefixIndex: number;
  rangeSum: number | null;
  activeLine: number;
  message: string;
};

function assertRange(values: number[], left: number, right: number) {
  if (
    values.length === 0 ||
    !Number.isInteger(left) ||
    !Number.isInteger(right) ||
    left < 0 ||
    right < left ||
    right >= values.length
  ) {
    throw new RangeError('Range must satisfy 0 <= left <= right < values.length.');
  }
}

export function traceRangeSum(values: number[], left: number, right: number): PrefixSumStep[] {
  assertRange(values, left, right);

  const prefix = [0];
  const steps: PrefixSumStep[] = [
    {
      id: 0,
      phase: 'seed',
      index: null,
      value: null,
      prefix: [...prefix],
      left,
      right,
      leftPrefixIndex: left,
      rightPrefixIndex: right + 1,
      rangeSum: null,
      activeLine: 1,
      message: 'Seed prefix[0] = 0 so every prefix value means the sum before an array index.',
    },
  ];

  let id = 1;

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index]!;
    prefix.push(prefix[index]! + value);
    steps.push({
      id: id++,
      phase: 'accumulate',
      index,
      value,
      prefix: [...prefix],
      left,
      right,
      leftPrefixIndex: left,
      rightPrefixIndex: right + 1,
      rangeSum: null,
      activeLine: 3,
      message:
        'prefix[' +
        (index + 1) +
        '] = prefix[' +
        index +
        '] + nums[' +
        index +
        '] = ' +
        prefix[index] +
        ' + ' +
        value +
        ' = ' +
        prefix[index + 1] +
        '.',
    });
  }

  const leftPrefixIndex = left;
  const rightPrefixIndex = right + 1;
  const rangeSum = prefix[rightPrefixIndex]! - prefix[leftPrefixIndex]!;

  steps.push({
    id: id++,
    phase: 'query',
    index: null,
    value: null,
    prefix: [...prefix],
    left,
    right,
    leftPrefixIndex,
    rightPrefixIndex,
    rangeSum,
    activeLine: 7,
    message:
      'Range [' +
      left +
      ', ' +
      right +
      '] = prefix[' +
      rightPrefixIndex +
      '] - prefix[' +
      leftPrefixIndex +
      '] = ' +
      prefix[rightPrefixIndex] +
      ' - ' +
      prefix[leftPrefixIndex] +
      ' = ' +
      rangeSum +
      '.',
  });

  return steps;
}
