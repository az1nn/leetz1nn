export type AlgorithmPhase = 'scan' | 'lookup' | 'store' | 'match' | 'done';

export type TwoSumStep = {
  id: number;
  phase: AlgorithmPhase;
  index: number;
  value: number;
  complement: number;
  seen: Record<string, number>;
  activeLine: number;
  message: string;
  match: readonly [number, number] | null;
};

export type PatternStatus = 'active' | 'next' | 'planned';

export type PatternDefinition = {
  id: string;
  title: string;
  trigger: string;
  complexity: string;
  status: PatternStatus;
};
