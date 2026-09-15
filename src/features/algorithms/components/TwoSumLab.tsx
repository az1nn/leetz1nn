import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { traceTwoSum } from '../algorithms/twoSum';
import { useAlgorithmPlayer } from '../hooks/useAlgorithmPlayer';

const CODE = [
  'const seen = new Map()',
  'for (let i = 0; i < nums.length; i++) {',
  '  const complement = target - nums[i]',
  '  if (seen.has(complement)) {',
  '    return [seen.get(complement), i]',
  '  }',
  '  seen.set(nums[i], i)',
  '}',
];

function parseNumbers(value: string): number[] | null {
  const pieces = value.split(',').map((piece) => piece.trim());
  if (pieces.length === 0 || pieces.some((piece) => piece.length === 0)) return null;

  const numbers = pieces.map(Number);
  return numbers.every(Number.isFinite) ? numbers : null;
}

function ControlButton({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={`rounded-xl border px-4 py-3 ${
        disabled ? 'border-zinc-800 opacity-40' : 'border-zinc-700 active:bg-zinc-800'
      }`}
    >
      <Text className="text-center text-sm font-semibold text-ink">{label}</Text>
    </Pressable>
  );
}

export function TwoSumLab() {
  const [numbersText, setNumbersText] = useState('2, 7, 11, 15');
  const [targetText, setTargetText] = useState('9');
  const [numbers, setNumbers] = useState<number[]>([2, 7, 11, 15]);
  const [target, setTarget] = useState(9);
  const [error, setError] = useState<string | null>(null);

  const steps = useMemo(() => traceTwoSum(numbers, target), [numbers, target]);
  const player = useAlgorithmPlayer(steps);
  const step = player.current;

  const run = () => {
    const parsedNumbers = parseNumbers(numbersText);
    const parsedTarget = Number(targetText);

    if (!parsedNumbers || parsedNumbers.length < 2 || !Number.isFinite(parsedTarget)) {
      setError('Use at least two comma-separated numbers and a numeric target.');
      return;
    }

    setError(null);
    setNumbers(parsedNumbers);
    setTarget(parsedTarget);
  };

  return (
    <View className="rounded-3xl border border-line bg-panel p-4 md:p-6">
      <View className="mb-6 gap-2">
        <Text className="text-xs font-bold uppercase tracking-widest text-accent">Lab 001 · Arrays & Hashing</Text>
        <Text className="text-2xl font-bold text-ink">Two Sum</Text>
        <Text className="max-w-3xl text-sm leading-6 text-muted">
          Replace the O(n²) nested search with an O(n) hash-map lookup. Move through the trace and watch the invariant: every value already visited is available for constant-time complement lookup.
        </Text>
      </View>

      <View className="mb-6 gap-3 md:flex-row">
        <View className="flex-1">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Numbers</Text>
          <TextInput
            value={numbersText}
            onChangeText={setNumbersText}
            autoCapitalize="none"
            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-base text-ink"
            placeholder="2, 7, 11, 15"
            placeholderTextColor="#71717a"
          />
        </View>
        <View className="md:w-40">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Target</Text>
          <TextInput
            value={targetText}
            onChangeText={setTargetText}
            keyboardType="numeric"
            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-base text-ink"
            placeholder="9"
            placeholderTextColor="#71717a"
          />
        </View>
        <View className="justify-end">
          <Pressable onPress={run} className="rounded-xl bg-accent px-5 py-3 active:opacity-80">
            <Text className="text-center font-bold text-black">Build trace</Text>
          </Pressable>
        </View>
      </View>

      {error ? <Text className="mb-4 text-sm text-red-400">{error}</Text> : null}

      <View className="gap-4 xl:flex-row">
        <View className="flex-1 gap-4">
          <View className="rounded-2xl border border-line bg-black p-4">
            <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Array</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {numbers.map((value, index) => {
                  const matched = step?.match?.includes(index) ?? false;
                  const current = step?.index === index;
                  return (
                    <View
                      key={`${index}-${value}`}
                      className={`min-w-16 rounded-xl border p-3 ${
                        matched
                          ? 'border-accent bg-lime-950'
                          : current
                            ? 'border-zinc-400 bg-zinc-800'
                            : 'border-line bg-zinc-950'
                      }`}
                    >
                      <Text className="text-center text-[10px] text-zinc-500">i={index}</Text>
                      <Text className="text-center text-xl font-bold text-ink">{value}</Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View className="rounded-2xl border border-line bg-black p-4">
            <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500">Current reasoning</Text>
            <Text className="text-base leading-6 text-ink">{step?.message ?? 'No trace.'}</Text>
            <View className="mt-4 flex-row flex-wrap gap-2">
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">value = {step?.value ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">complement = {step?.complement ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">target = {target}</Text>
            </View>
          </View>

          <View className="rounded-2xl border border-line bg-black p-4">
            <Text className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Hash map · value → index</Text>
            <View className="flex-row flex-wrap gap-2">
              {Object.entries(step?.seen ?? {}).length === 0 ? (
                <Text className="text-sm text-zinc-600">Empty</Text>
              ) : (
                Object.entries(step?.seen ?? {}).map(([value, index]) => (
                  <View key={value} className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">
                    <Text className="font-mono text-sm text-ink">{value} → {index}</Text>
                  </View>
                ))
              )}
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
              <View key={`${index}-${line}`} className={`rounded-md px-2 py-1 ${step?.activeLine === index + 1 ? 'bg-zinc-800' : ''}`}>
                <Text className={step?.activeLine === index + 1 ? 'font-mono text-sm text-accent' : 'font-mono text-sm text-zinc-400'}>
                  {String(index + 1).padStart(2, ' ')}  {line}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="mt-5 gap-3 md:flex-row md:items-center md:justify-between">
        <Text className="font-mono text-xs text-zinc-500">
          step {Math.min(player.cursor + 1, player.total)} / {player.total}
        </Text>
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
