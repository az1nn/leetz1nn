# Spec 001 — Playground Foundation

## Objective

Create a React Native + Web algorithm-learning playground where algorithm state can be inspected step by step.

## User story

As a learner, I want to run an algorithm against editable input and move through its execution so that I understand the invariant rather than memorize a final solution.

## Functional requirements

- Run on web, Android and iOS from one React Native codebase.
- Use TypeScript strict mode.
- Use NativeWind/Tailwind utility styling.
- Keep algorithm implementations independent from React.
- Represent execution as deterministic trace data.
- Provide play, pause, previous, next and reset controls.
- Display active array position, hash-map state and current reasoning.
- Display the currently active pseudocode line.
- Teach explicit time and space complexity.
- Allow editable Two Sum input and target.

## Acceptance criteria

### AC-001
Given `nums = [2, 7, 11, 15]` and `target = 9`, the Two Sum trace ends with indices `[0, 1]`.

### AC-002
At each lookup step, the visual hash map represents only values visited before the current element.

### AC-003
The algorithm module imports no React or React Native dependency.

### AC-004
The same screen and feature implementation is used on web and native platforms.

### AC-005
Invalid playground input does not execute and shows an inline validation message.

## Architecture decision

The app uses this pipeline:

```text
pure algorithm → trace → hook/player → visualizer
```

This is the foundation for all future patterns.

## Next wave

- Add automated tests for algorithm traces.
- Add Two Pointers lab.
- Add study progress persistence.
- Add pattern/problem routing once multiple labs exist.
