export type ContainerMove = 'left' | 'right' | 'done';

export interface ContainerStep {
  id: number;
  left: number;
  right: number;
  leftHeight: number;
  rightHeight: number;
  width: number;
  area: number;
  bestArea: number;
  bestPair: readonly [number, number];
  move: ContainerMove;
  activeLine: number;
  message: string;
}

export function traceContainerWithMostWater(heights: readonly number[]): ContainerStep[] {
  if (heights.length < 2) return [];

  let left = 0;
  let right = heights.length - 1;
  let bestArea = 0;
  let bestPair: readonly [number, number] = [left, right];
  let id = 0;
  const steps: ContainerStep[] = [];

  while (left < right) {
    const leftHeight = heights[left] ?? 0;
    const rightHeight = heights[right] ?? 0;
    const width = right - left;
    const area = Math.min(leftHeight, rightHeight) * width;

    if (area > bestArea) {
      bestArea = area;
      bestPair = [left, right];
    }

    const move: ContainerMove = leftHeight <= rightHeight ? 'left' : 'right';
    const reason =
      move === 'left'
        ? `Left wall (${leftHeight}) is the limiting wall, so move left inward.`
        : `Right wall (${rightHeight}) is the limiting wall, so move right inward.`;

    steps.push({
      id: id++,
      left,
      right,
      leftHeight,
      rightHeight,
      width,
      area,
      bestArea,
      bestPair,
      move,
      activeLine: move === 'left' ? 7 : 9,
      message: `Area = min(${leftHeight}, ${rightHeight}) × ${width} = ${area}. ${reason}`,
    });

    if (move === 'left') left += 1;
    else right -= 1;
  }

  const [bestLeft, bestRight] = bestPair;

  steps.push({
    id: id++,
    left: bestLeft,
    right: bestRight,
    leftHeight: heights[bestLeft] ?? 0,
    rightHeight: heights[bestRight] ?? 0,
    width: bestRight - bestLeft,
    area: bestArea,
    bestArea,
    bestPair,
    move: 'done',
    activeLine: 11,
    message: `Finished. The maximum container area is ${bestArea}, using indices ${bestLeft} and ${bestRight}.`,
  });

  return steps;
}
