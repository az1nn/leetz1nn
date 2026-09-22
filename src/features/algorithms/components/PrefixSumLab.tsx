import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { traceRangeSum } from '../algorithms/prefixSum';
import { useAlgorithmPlayer } from '../hooks/useAlgorithmPlayer';

const CODE = [
  'const prefix = [0]',
  'for (let i = 0; i < nums.length; i++) {',
  '  prefix[i + 1] = prefix[i] + nums[i]',
  '}',
  'const leftBase = prefix[left]',
  'const rightBase = prefix[right + 1]',
  'return rightBase - leftBase',
];

function parseValues(value: string): number[] | null {
  const parts = value.split(',').map((part) => part.trim());
  if (parts.length === 0 || parts.length > 12 || parts.some((part) => part.length === 0)) return null;

  const values = parts.map(Number);
  return values.every(Number.isFinite) ? values : null;
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

export function PrefixSumLab() {
  const [valuesText, setValuesText] = useState('2, -1, 3, 5, -2');
  const [leftText, setLeftText] = useState('1');
  const [rightText, setRightText] = useState('3');
  const [values, setValues] = useState([2, -1, 3, 5, -2]);
  const [left, setLeft] = useState(1);
  const [right, setRight] = useState(3);
  const [error, setError] = useState<string | null>(null);

  const steps = useMemo(() => traceRangeSum(values, left, right), [values, left, right]);
  const player = useAlgorithmPlayer(steps, 850);
  const step = player.current;

  const buildTrace = () => {
    const nextValues = parseValues(valuesText);
    const nextLeft = Number(leftText);
    const nextRight = Number(rightText);

    if (!nextValues) {
      setError('Use 1–12 finite numbers separated by commas.');
      return;
    }

    if (
      !Number.isInteger(nextLeft) ||
      !Number.isInteger(nextRight) ||
      nextLeft < 0 ||
      nextRight < nextLeft ||
      nextRight >= nextValues.length
    ) {
      setError('Range must satisfy 0 <= left <= right < array length.');
      return;
    }

    setError(null);
    setValues(nextValues);
    setLeft(nextLeft);
    setRight(nextRight);
  };

  return (
    <View className="rounded-3xl border border-line bg-panel p-4 md:p-6">
      <View className="mb-6 gap-2">
        <Text className="text-xs font-bold uppercase tracking-widest text-accent">Lab 006 · Prefix Sum</Text>
        <Text className="text-2xl font-bold text-ink">Range Sum Query</Text>
        <Text className="max-w-3xl text-sm leading-6 text-muted">
          Precompute cumulative sums once, then answer an inclusive range query by subtracting the prefix before the left boundary from the prefix after the right boundary.
        </Text>
      </View>

      <View className="mb-6 gap-3 lg:flex-row">
        <View className="flex-[2]">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Array</Text>
          <TextInput
            value={valuesText}
            onChangeText={setValuesText}
            autoCapitalize="none"
            autoCorrect={false}
            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 font-mono text-base text-ink"
            placeholder="2, -1, 3, 5, -2"
            placeholderTextColor="#71717a"
          />
        </View>
        <View className="flex-1">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Left</Text>
          <TextInput
            value={leftText}
            onChangeText={setLeftText}
            keyboardType="numeric"
            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 font-mono text-base text-ink"
          />
        </View>
        <View className="flex-1">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Right</Text>
          <TextInput
            value={rightText}
            onChangeText={setRightText}
            keyboardType="numeric"
            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 font-mono text-base text-ink"
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
            <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Array · inclusive query [{left}, {right}]</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {values.map((value, index) => {
                  const building = step?.phase === 'accumulate' && step.index === index;
                  const queried = index >= left && index <= right;
                  return (
                    <View
                      key={index}
                      className={building ? 'min-w-16 rounded-xl border border-accent bg-lime-950 p-3' : queried ? 'min-w-16 rounded-xl border border-zinc-600 bg-zinc-900 p-3' : 'min-w-16 rounded-xl border border-zinc-800 bg-zinc-950 p-3'}
                    >
                      <Text className="text-center font-mono text-[10px] text-zinc-500">i={index}</Text>
                      <Text className="mt-1 text-center font-mono text-xl font-black text-ink">{value}</Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View className="rounded-2xl border border-line bg-black p-4">
            <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Prefix array · prefix[k] = sum before index k</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {Array.from({ length: values.length + 1 }, (_, index) => {
                  const prefixValue = step?.prefix[index];
                  const queryBoundary = step?.phase === 'query' && (index === step.leftPrefixIndex || index === step.rightPrefixIndex);
                  const building = step?.phase === 'accumulate' && step.index !== null && index === step.index + 1;
                  return (
                    <View
                      key={index}
                      className={queryBoundary || building ? 'min-w-16 rounded-xl border border-accent bg-lime-950 p-3' : 'min-w-16 rounded-xl border border-zinc-800 bg-zinc-950 p-3'}
                    >
                      <Text className="text-center font-mono text-[10px] text-zinc-500">p[{index}]</Text>
                      <Text className="mt-1 text-center font-mono text-xl font-black text-ink">{prefixValue ?? '·'}</Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View className="rounded-2xl border border-line bg-black p-4">
            <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500">Invariant & decision</Text>
            <Text className="text-base leading-6 text-ink">{step?.message ?? 'No trace.'}</Text>
            <View className="mt-4 flex-row flex-wrap gap-2">
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">phase = {step?.phase ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">left base = p[{left}]</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">right base = p[{right + 1}]</Text>
              {step?.rangeSum !== null && step?.rangeSum !== undefined ? (
                <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-accent">sum = {step.rangeSum}</Text>
              ) : null}
            </View>
          </View>
        </View>

        <View className="xl:w-[440px]">
          <View className="rounded-2xl border border-line bg-black p-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xs font-bold uppercase tracking-widest text-zinc-500">Implementation model</Text>
              <Text className="font-mono text-xs text-accent">build O(n) · query O(1)</Text>
            </View>
            {CODE.map((line, index) => (
              <View key={index + '-' + line} className={step?.activeLine === index + 1 ? 'rounded-md bg-zinc-800 px-2 py-1' : 'rounded-md px-2 py-1'}>
                <Text className={step?.activeLine === index + 1 ? 'font-mono text-sm text-accent' : 'font-mono text-sm text-zinc-400'}>
                  {String(index + 1).padStart(2, ' ')}  {line}
                </Text>
              </View>
            ))}
            <Text className="mt-4 text-xs leading-5 text-zinc-500">Space: O(n) for the prefix array. Repeated range queries reuse the same precomputation.</Text>
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
