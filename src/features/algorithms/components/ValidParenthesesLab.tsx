import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { traceValidParentheses } from '../algorithms/validParentheses';
import { useAlgorithmPlayer } from '../hooks/useAlgorithmPlayer';

const CODE = [
  "const pairs = { ')': '(', ']': '[', '}': '{' }",
  'const stack = []',
  'for (const char of s) {',
  '  if (isOpening(char)) stack.push(char)',
  '  else {',
  '    const expected = pairs[char]',
  '    if (stack.at(-1) !== expected) return false',
  '    stack.pop()',
  '  }',
  '}',
  'return stack.length === 0',
];

function isBracketInput(value: string) {
  return value.length > 0 && [...value].every((char) => '()[]{}'.includes(char));
}

function ControlButton({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={disabled ? 'rounded-xl border border-zinc-800 px-4 py-3 opacity-40' : 'rounded-xl border border-zinc-700 px-4 py-3 active:bg-zinc-800'}
    >
      <Text className="text-center text-sm font-semibold text-ink">{label}</Text>
    </Pressable>
  );
}

export function ValidParenthesesLab() {
  const [inputText, setInputText] = useState('({[]})');
  const [input, setInput] = useState('({[]})');
  const [error, setError] = useState<string | null>(null);

  const steps = useMemo(() => traceValidParentheses(input), [input]);
  const player = useAlgorithmPlayer(steps, 900);
  const step = player.current;
  const stackTopFirst = [...(step?.stack ?? [])].reverse();

  const buildTrace = () => {
    const value = inputText.trim();

    if (!isBracketInput(value)) {
      setError('Use a non-empty sequence containing only (), [] and {}.');
      return;
    }

    setError(null);
    setInput(value);
  };

  return (
    <View className="rounded-3xl border border-line bg-panel p-4 md:p-6">
      <View className="mb-6 gap-2">
        <Text className="text-xs font-bold uppercase tracking-widest text-accent">Lab 005 · Stack</Text>
        <Text className="text-2xl font-bold text-ink">Valid Parentheses</Text>
        <Text className="max-w-3xl text-sm leading-6 text-muted">
          A stack models the nesting invariant: the next closing bracket must match the most recent unmatched opening bracket. Push openings, pop exact matches, and fail immediately on a mismatch.
        </Text>
      </View>

      <View className="mb-6 gap-3 md:flex-row">
        <View className="flex-1">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Bracket sequence</Text>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            autoCapitalize="none"
            autoCorrect={false}
            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 font-mono text-base text-ink"
            placeholder="({[]})"
            placeholderTextColor="#71717a"
          />
        </View>
        <View className="justify-end">
          <Pressable onPress={buildTrace} className="rounded-xl bg-accent px-5 py-3 active:opacity-80">
            <Text className="text-center font-bold text-black">Build trace</Text>
          </Pressable>
        </View>
      </View>

      {error ? <Text className="mb-4 text-sm text-red-400">{error}</Text> : null}

      <View className="gap-4 xl:flex-row">
        <View className="flex-1 gap-4">
          <View className="rounded-2xl border border-line bg-black p-4">
            <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Input cursor</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {[...input].map((char, index) => {
                  const current = step?.char !== null && step?.index === index;
                  const consumed = step ? index < step.index || (step.char !== null && index === step.index) : false;
                  return (
                    <View
                      key={index + '-' + char}
                      className={current ? 'min-w-14 rounded-xl border border-accent bg-lime-950 p-3' : consumed ? 'min-w-14 rounded-xl border border-zinc-800 bg-zinc-950 p-3 opacity-60' : 'min-w-14 rounded-xl border border-zinc-700 bg-zinc-900 p-3'}
                    >
                      <Text className="text-center font-mono text-[10px] text-zinc-500">i={index}</Text>
                      <Text className="mt-1 text-center font-mono text-2xl font-black text-ink">{char}</Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View className="rounded-2xl border border-line bg-black p-4">
            <View className="mb-3 flex-row items-center justify-between gap-3">
              <Text className="text-xs font-bold uppercase tracking-widest text-zinc-500">Stack · top first</Text>
              <Text className="font-mono text-xs text-accent">size {step?.stack.length ?? 0}</Text>
            </View>
            <View className="gap-2">
              {stackTopFirst.length === 0 ? (
                <Text className="text-sm text-zinc-600">empty</Text>
              ) : (
                stackTopFirst.map((char, index) => (
                  <View key={index + '-' + char} className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3">
                    <Text className="text-center font-mono text-lg font-bold text-ink">{char}{index === 0 ? '  ← top' : ''}</Text>
                  </View>
                ))
              )}
            </View>
          </View>

          <View className="rounded-2xl border border-line bg-black p-4">
            <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500">Invariant & decision</Text>
            <Text className="text-base leading-6 text-ink">{step?.message ?? 'No trace.'}</Text>
            <View className="mt-4 flex-row flex-wrap gap-2">
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">phase = {step?.phase ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">expected = {step?.expectedOpening ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">top = {step?.actualTop ?? '—'}</Text>
              {step?.valid !== null && step?.valid !== undefined ? (
                <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-accent">valid = {String(step.valid)}</Text>
              ) : null}
            </View>
          </View>
        </View>

        <View className="xl:w-[440px]">
          <View className="rounded-2xl border border-line bg-black p-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xs font-bold uppercase tracking-widest text-zinc-500">Implementation model</Text>
              <Text className="font-mono text-xs text-accent">O(n) time · O(n) space</Text>
            </View>
            {CODE.map((line, index) => (
              <View key={index + '-' + line} className={step?.activeLine === index + 1 ? 'rounded-md bg-zinc-800 px-2 py-1' : 'rounded-md px-2 py-1'}>
                <Text className={step?.activeLine === index + 1 ? 'font-mono text-sm text-accent' : 'font-mono text-sm text-zinc-400'}>
                  {String(index + 1).padStart(2, ' ')}  {line}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="mt-5 gap-3 md:flex-row md:items-center md:justify-between">
        <Text className="font-mono text-xs text-zinc-500">step {Math.min(player.cursor + 1, player.total)} / {player.total}</Text>
        <View className="flex-row flex-wrap gap-2">
          <ControlButton label="Reset" onPress={player.reset} disabled={player.cursor === 0} />
          <ControlButton label="Previous" onPress={player.previous} disabled={!player.canGoBack} />
          <ControlButton label={player.isPlaying ? 'Pause' : 'Play'} onPress={player.toggle} disabled={player.total <= 1} />
          <ControlButton label="Next" onPress={player.next} disabled={!player.canGoForward} />
        </View>
      </View>
    </View>
  );
}
