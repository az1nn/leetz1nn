# leetz1nn

A practical LeetCode and algorithms playground built with React Native + Web, TypeScript, hooks and NativeWind.

The project is intentionally pattern-first: every algorithm is implemented as pure logic, instrumented as an execution trace, exposed through a hook, and rendered as an interactive visual lab.

## Stack

- Expo SDK 57
- React Native 0.86 + React Native Web
- React 19
- TypeScript strict mode
- NativeWind 4 / Tailwind CSS
- Hooks-first state and behavior

## Run

```bash
npm install
npm run web
```

Native targets:

```bash
npm run android
npm run ios
```

Quality checks:

```bash
npm run typecheck
npm run doctor
```

## Learning architecture

```text
algorithm (pure)
    ↓
execution trace
    ↓
hook/player
    ↓
visualizer
    ↓
pattern recognition
```

The first lab is **Two Sum / Arrays & Hashing**. Next waves add Two Pointers, Sliding Window, Binary Search, Stack, Trees, Graphs and Dynamic Programming.

See `docs/ARCHITECTURE.md` and `specs/001-playground-foundation/spec.md`.
