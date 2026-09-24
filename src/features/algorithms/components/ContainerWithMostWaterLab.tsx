import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { traceContainerWithMostWater } from '../algorithms/containerWithMostWater';
import { useAlgorithmPlayer } from '../hooks/useAlgorithmPlayer';

const CODE = [
  'let left = 0, right = height.length - 1',
  'let best = 0',
  'while (left < right) {',
  '  const area = min(height[left], height[right]) * (right - left)',
  '  best = max(best, area)',
  '  if (height[left] <= height[right]) {',
  '    left++',
  '  } else {',
  '    right--',
  '  }',
  'return best',
];

function parseHeights(value: string): number[] | null {
  const pieces = value.split(',').map((piece) => piece.trim());
  if (pieces.length < 2 || pieces.some((piece) => piece.length === 0)) return null;

  const heights = pieces.map(Number);
  return heights.every((height) => Number.isFinite(height) && height >= 0) ? heights : null;
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

export function ContainerWithMostWaterLab() {
  const [heightsText, setHeightsText] = useState('1, 8, 6, 2, 5, 4, 8, 3, 7');
  const [heights, setHeights] = useState<number[]>([1, 8, 6, 2, 5, 4, 8, 3, 7]);
  const [error, setError] = useState<string | null>(null);

  const steps = useMemo(() => traceContainerWithMostWater(heights), [heights]);
  const player = useAlgorithmPlayer(steps, 1050);
  const step = player.current;
  const maxHeight = Math.max(...heights, 1);

  const run = () => {
    const parsed = parseHeights(heightsText);

    if (!parsed) {
      setError('Use at least two comma-separated, non-negative heights.');
      return;
    }

    setError(null);
    setHeights(parsed);
  };

  return (
    <View className="rounded-3xl border border-line bg-panel p-4 md:p-6">
      <View className="mb-6 gap-2">
        <Text className="text-xs font-bold uppercase tracking-widest text-accent">Lab 002 · Two Pointers</Text>
        <Text className="text-2xl font-bold text-ink">Container With Most Water</Text>
        <Text className="max-w-3xl text-sm leading-6 text-muted">
          Start at both extremes. The shorter wall limits the current area, so moving the taller wall cannot improve that limitation. Move only the shorter pointer and preserve the best area seen so far.
        </Text>
      </View>

      <View className="mb-6 gap-3 md:flex-row">
        <View className="flex-1">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Heights</Text>
          <TextInput
            value={heightsText}
            onChangeText={setHeightsText}
            autoCapitalize="none"
            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-base text-ink"
            placeholder="1, 8, 6, 2, 5, 4, 8, 3, 7"
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
            <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Pointer state</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="min-h-60 flex-row items-end gap-2">
                {heights.map((height, index) => {
                  const isLeft = step?.left === index;
                  const isRight = step?.right === index;
                  const isBest = step?.bestPair.includes(index) ?? false;
                  const barHeight = Math.max(28, (height / maxHeight) * 180);

                  return (
                    <View key={`${index}-${height}`} className="w-16 items-center justify-end">
                      <View className="mb-2 min-h-5">
                        {isLeft || isRight ? (
                          <Text className="font-mono text-[10px] font-bold text-accent">{isLeft ? 'L' : ''}{isLeft && isRight ? '/' : ''}{isRight ? 'R' : ''}</Text>
                        ) : null}
                      </View>
                      <View
                        style={{ height: barHeight }}
                        className={`w-10 rounded-t-lg border ${isLeft || isRight ? 'border-accent bg-lime-950' : isBest ? 'border-zinc-500 bg-zinc-800' : 'border-line bg-zinc-900'}`}
                      />
                      <Text className="mt-2 font-mono text-sm font-bold text-ink">{height}</Text>
                      <Text className="font-mono text-[10px] text-zinc-600">i={index}</Text>
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
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">width = {step?.width ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">area = {step?.area ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-accent">best = {step?.bestArea ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">move = {step?.move ?? '—'}</Text>
            </View>
          </View>
        </View>

        <View className="xl:w-[440px]">
          <View className="rounded-2xl border border-line bg-black p-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xs font-bold uppercase tracking-widest text-zinc-500">Implementation model</Text>
              <Text className="font-mono text-xs text-accent">O(n) time · O(1) space</Text>
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
