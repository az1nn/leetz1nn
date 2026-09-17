import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { traceBinarySearch } from '../algorithms/binarySearch';
import { useAlgorithmPlayer } from '../hooks/useAlgorithmPlayer';

const CODE = [
  'let left = 0',
  'let right = nums.length - 1',
  'while (left <= right) {',
  '  const mid = left + floor((right - left) / 2)',
  '  if (nums[mid] === target) return mid',
  '  if (nums[mid] < target) {',
  '    left = mid + 1',
  '  } else {',
  '    right = mid - 1',
  '  }',
  '}',
  'return -1',
];

function parseNumbers(value: string): number[] | null {
  const parts = value.split(',').map((part) => part.trim());
  if (parts.length === 0 || parts.some((part) => part.length === 0)) return null;
  const nums = parts.map(Number);
  if (!nums.every(Number.isFinite)) return null;
  return nums;
}

function isSorted(nums: readonly number[]) {
  return nums.every((value, index) => index === 0 || (nums[index - 1] ?? value) <= value);
}

function ControlButton({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={`rounded-xl border px-4 py-3 ${disabled ? 'border-zinc-800 opacity-40' : 'border-zinc-700 active:bg-zinc-800'}`}
    >
      <Text className="text-center text-sm font-semibold text-ink">{label}</Text>
    </Pressable>
  );
}

export function BinarySearchLab() {
  const [numsText, setNumsText] = useState('-1, 0, 3, 5, 9, 12');
  const [targetText, setTargetText] = useState('9');
  const [nums, setNums] = useState<number[]>([-1, 0, 3, 5, 9, 12]);
  const [target, setTarget] = useState(9);
  const [error, setError] = useState<string | null>(null);

  const steps = useMemo(() => traceBinarySearch(nums, target), [nums, target]);
  const player = useAlgorithmPlayer(steps, 1100);
  const step = player.current;

  const buildTrace = () => {
    const parsed = parseNumbers(numsText);
    const parsedTarget = Number(targetText.trim());

    if (!parsed || parsed.length === 0 || !Number.isFinite(parsedTarget)) {
      setError('Use a non-empty comma-separated number list and a finite target.');
      return;
    }

    if (!isSorted(parsed)) {
      setError('Binary Search requires the array to be sorted in ascending order.');
      return;
    }

    setError(null);
    setNums(parsed);
    setTarget(parsedTarget);
  };

  return (
    <View className="rounded-3xl border border-line bg-panel p-4 md:p-6">
      <View className="mb-6 gap-2">
        <Text className="text-xs font-bold uppercase tracking-widest text-accent">Lab 004 · Binary Search</Text>
        <Text className="text-2xl font-bold text-ink">Binary Search</Text>
        <Text className="max-w-3xl text-sm leading-6 text-muted">
          Keep one invariant: if the target exists, it remains inside the inclusive interval [left, right]. Probe the midpoint and discard the half that cannot contain the answer.
        </Text>
      </View>

      <View className="mb-6 gap-3 md:flex-row">
        <View className="flex-1">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Sorted array</Text>
          <TextInput
            value={numsText}
            onChangeText={setNumsText}
            autoCapitalize="none"
            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-base text-ink"
            placeholder="-1, 0, 3, 5, 9, 12"
            placeholderTextColor="#71717a"
          />
        </View>
        <View className="md:w-36">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Target</Text>
          <TextInput
            value={targetText}
            onChangeText={setTargetText}
            keyboardType="numbers-and-punctuation"
            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-base text-ink"
            placeholder="9"
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
            <View className="mb-4 flex-row items-center justify-between gap-3">
              <Text className="text-xs font-bold uppercase tracking-widest text-zinc-500">Search interval</Text>
              <Text className="font-mono text-xs text-accent">range size {step?.rangeSize ?? nums.length}</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {nums.map((value, index) => {
                  const inRange = step ? index >= step.left && index <= step.right : true;
                  const isMid = step?.mid === index;
                  const isLeft = step?.left === index && step.rangeSize > 0;
                  const isRight = step?.right === index && step.rangeSize > 0;
                  const found = step?.foundIndex === index;

                  return (
                    <View
                      key={`${index}-${value}`}
                      className={`min-w-16 rounded-xl border p-3 ${found || isMid ? 'border-accent bg-lime-950' : inRange ? 'border-zinc-600 bg-zinc-900' : 'border-zinc-900 bg-zinc-950 opacity-40'}`}
                    >
                      <Text className="text-center font-mono text-[10px] text-zinc-500">{isLeft ? 'L' : ''}{isLeft && isRight ? '/' : ''}{isMid ? 'M' : ''}{isRight ? 'R' : ''}</Text>
                      <Text className="mt-1 text-center text-lg font-bold text-ink">{value}</Text>
                      <Text className="text-center font-mono text-[10px] text-zinc-600">i={index}</Text>
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
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">left = {step?.left ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">mid = {step?.mid ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">right = {step?.right ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-accent">decision = {step?.decision ?? '—'}</Text>
            </View>
          </View>
        </View>

        <View className="xl:w-[440px]">
          <View className="rounded-2xl border border-line bg-black p-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xs font-bold uppercase tracking-widest text-zinc-500">Implementation model</Text>
              <Text className="font-mono text-xs text-accent">O(log n) time · O(1) space</Text>
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
