import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { traceLongestSubstring } from '../algorithms/longestSubstring';
import { useAlgorithmPlayer } from '../hooks/useAlgorithmPlayer';

const CODE = [
  'let left = 0, best = 0',
  'const seen = new Map()',
  'for (let right = 0; right < s.length; right++) {',
  '  if (seen.get(s[right]) >= left) {',
  '    left = seen.get(s[right]) + 1',
  '  }',
  '  seen.set(s[right], right)',
  '  best = max(best, right - left + 1)',
  '}',
  'return best',
];

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

export function LongestSubstringLab() {
  const [inputText, setInputText] = useState('abcabcbb');
  const [value, setValue] = useState('abcabcbb');

  const steps = useMemo(() => traceLongestSubstring(value), [value]);
  const player = useAlgorithmPlayer(steps, 950);
  const step = player.current;

  return (
    <View className="rounded-3xl border border-line bg-panel p-4 md:p-6">
      <View className="mb-6 gap-2">
        <Text className="text-xs font-bold uppercase tracking-widest text-accent">Lab 003 · Sliding Window</Text>
        <Text className="text-2xl font-bold text-ink">Longest Substring Without Repeating Characters</Text>
        <Text className="max-w-3xl text-sm leading-6 text-muted">
          Expand with the right pointer. When a duplicate appears inside the active window, jump the left pointer past its previous index. The invariant is simple: the active window always contains unique characters.
        </Text>
      </View>

      <View className="mb-6 gap-3 md:flex-row">
        <View className="flex-1">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">String</Text>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            autoCapitalize="none"
            autoCorrect={false}
            className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-base text-ink"
            placeholder="abcabcbb"
            placeholderTextColor="#71717a"
          />
        </View>
        <View className="justify-end">
          <Pressable onPress={() => setValue(inputText)} className="rounded-xl bg-accent px-5 py-3 active:opacity-80">
            <Text className="text-center font-bold text-black">Build trace</Text>
          </Pressable>
        </View>
      </View>

      <View className="gap-4 xl:flex-row">
        <View className="flex-1 gap-4">
          <View className="rounded-2xl border border-line bg-black p-4">
            <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Window state</Text>
            {value.length === 0 ? (
              <Text className="text-sm text-zinc-500">Empty string → answer 0</Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {[...value].map((char, index) => {
                    const inWindow = step ? index >= step.left && index <= step.right : false;
                    const isRight = step?.right === index;
                    const inBest = step ? index >= step.bestRange[0] && index <= step.bestRange[1] : false;

                    return (
                      <View
                        key={`${index}-${char}`}
                        className={`min-w-14 rounded-xl border p-3 ${isRight ? 'border-accent bg-lime-950' : inWindow ? 'border-zinc-500 bg-zinc-800' : inBest ? 'border-zinc-700 bg-zinc-900' : 'border-line bg-zinc-950'}`}
                      >
                        <Text className="text-center text-[10px] text-zinc-500">i={index}</Text>
                        <Text className="text-center text-xl font-bold text-ink">{char === ' ' ? '␠' : char}</Text>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            )}
          </View>

          <View className="rounded-2xl border border-line bg-black p-4">
            <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500">Invariant & decision</Text>
            <Text className="text-base leading-6 text-ink">{step?.message ?? 'No trace.'}</Text>
            <View className="mt-4 flex-row flex-wrap gap-2">
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">left = {step?.left ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">right = {step?.right ?? '—'}</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">window = “{step?.window ?? ''}”</Text>
              <Text className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-accent">best = {step?.bestLength ?? 0}</Text>
            </View>
          </View>

          <View className="rounded-2xl border border-line bg-black p-4">
            <Text className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Last seen · character → index</Text>
            <View className="flex-row flex-wrap gap-2">
              {Object.entries(step?.seen ?? {}).length === 0 ? (
                <Text className="text-sm text-zinc-600">Empty</Text>
              ) : (
                Object.entries(step?.seen ?? {}).map(([char, index]) => (
                  <View key={char} className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2">
                    <Text className="font-mono text-sm text-ink">{char === ' ' ? '␠' : char} → {index}</Text>
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
              <Text className="font-mono text-xs text-accent">O(n) time · O(k) space</Text>
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
