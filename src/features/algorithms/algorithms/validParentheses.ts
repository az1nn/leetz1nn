export type ParenthesisChar = '(' | ')' | '[' | ']' | '{' | '}';

export type ValidParenthesesPhase = 'push' | 'match' | 'mismatch' | 'complete';

export type ValidParenthesesStep = {
  id: number;
  index: number;
  char: string | null;
  stack: ParenthesisChar[];
  expectedOpening: ParenthesisChar | null;
  actualTop: ParenthesisChar | null;
  phase: ValidParenthesesPhase;
  valid: boolean | null;
  activeLine: number;
  message: string;
};

const OPENINGS = new Set<ParenthesisChar>(['(', '[', '{']);
const PAIRS: Record<string, ParenthesisChar> = {
  ')': '(',
  ']': '[',
  '}': '{',
};

export function traceValidParentheses(input: string): ValidParenthesesStep[] {
  const stack: ParenthesisChar[] = [];
  const steps: ValidParenthesesStep[] = [];
  let id = 0;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];

    if (!char) continue;

    if (OPENINGS.has(char as ParenthesisChar)) {
      stack.push(char as ParenthesisChar);
      steps.push({
        id: id++,
        index,
        char,
        stack: [...stack],
        expectedOpening: null,
        actualTop: stack.at(-1) ?? null,
        phase: 'push',
        valid: null,
        activeLine: 4,
        message: 'Opening bracket ' + char + ' goes onto the stack. It must be closed in LIFO order.',
      });
      continue;
    }

    const expectedOpening = PAIRS[char] ?? null;
    const actualTop = stack.at(-1) ?? null;

    if (!expectedOpening || actualTop !== expectedOpening) {
      steps.push({
        id: id++,
        index,
        char,
        stack: [...stack],
        expectedOpening,
        actualTop,
        phase: 'mismatch',
        valid: false,
        activeLine: 7,
        message: expectedOpening
          ? 'Closing bracket ' + char + ' expects ' + expectedOpening + ' on top, but found ' + (actualTop ?? 'an empty stack') + '.'
          : 'Character ' + char + ' is not a supported bracket.',
      });
      return steps;
    }

    stack.pop();
    steps.push({
      id: id++,
      index,
      char,
      stack: [...stack],
      expectedOpening,
      actualTop,
      phase: 'match',
      valid: null,
      activeLine: 8,
      message: 'Closing bracket ' + char + ' matches ' + expectedOpening + '. Pop the stack and continue.',
    });
  }

  const valid = stack.length === 0;
  steps.push({
    id: id++,
    index: Math.max(-1, input.length - 1),
    char: null,
    stack: [...stack],
    expectedOpening: null,
    actualTop: stack.at(-1) ?? null,
    phase: 'complete',
    valid,
    activeLine: 11,
    message: valid
      ? 'Input consumed and the stack is empty. Every opening bracket closed in the correct order.'
      : 'Input ended with unmatched opening brackets still on the stack.',
  });

  return steps;
}
