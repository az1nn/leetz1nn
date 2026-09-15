# Architecture

## Goal

`leetz1nn` is both a study environment and a real cross-platform application. UI concerns must never contaminate algorithm implementations.

## Dependency direction

```text
screens/components
      ↓
     hooks
      ↓
execution traces
      ↓
pure algorithms + domain types
```

The algorithm layer must be runnable without React Native.

## Feature structure

```text
src/features/algorithms/
├── algorithms/   # pure implementations and trace builders
├── components/   # interactive visualizers
├── data/         # study catalog
├── domain/       # shared contracts
├── hooks/        # playback/state orchestration
└── screens/      # composition only
```

## Rules

1. **Pure core** — algorithms do not import React, React Native, Expo or UI libraries.
2. **Trace, do not mutate UI from algorithms** — a trace is data describing execution.
3. **Hooks orchestrate behavior** — timers, playback and interaction belong in hooks.
4. **Components visualize state** — components receive state and render it.
5. **Complexity is part of the feature contract** — every lab teaches time and space complexity.
6. **Pattern-first curriculum** — problems are grouped by transferable technique rather than difficulty alone.
7. **Web and native share the same feature code** — platform forks require a concrete reason.

## Lab contract

Each lab should eventually contain:

- problem statement
- recognition trigger
- brute-force reasoning
- optimized invariant
- executable input
- deterministic execution trace
- step controls
- highlighted implementation/pseudocode
- time/space complexity
- edge cases
- review prompt

## State philosophy

Start local. A lab uses local state and focused custom hooks. Add global state only when cross-feature persistence justifies it.

This prevents a learning playground from becoming architecture-heavy before the product requires it.
