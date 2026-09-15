import { Text, View } from 'react-native';

import type { PatternDefinition } from '../domain/types';

type Props = {
  pattern: PatternDefinition;
};

export function PatternCard({ pattern }: Props) {
  const active = pattern.status === 'active';

  return (
    <View
      className={`mr-3 w-64 rounded-2xl border p-4 ${
        active ? 'border-accent bg-zinc-900' : 'border-line bg-panel'
      }`}
    >
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-base font-semibold text-ink">{pattern.title}</Text>
        <Text className={active ? 'text-xs font-bold text-accent' : 'text-xs text-muted'}>
          {pattern.status.toUpperCase()}
        </Text>
      </View>
      <Text className="mb-3 text-sm leading-5 text-muted">{pattern.trigger}</Text>
      <Text className="font-mono text-xs text-zinc-400">{pattern.complexity}</Text>
    </View>
  );
}
