import { Pressable, Text, View } from 'react-native';

import type { LabProgress } from '../../progress/domain/progress';
import type { LabDefinition } from '../data/labs';

type Props = {
  lab: LabDefinition;
  progress: LabProgress;
  selected: boolean;
  onPress: () => void;
};

export function LabCard({ lab, progress, selected, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`mr-3 w-72 rounded-2xl border p-4 ${selected ? 'border-accent bg-zinc-900' : 'border-line bg-panel active:bg-zinc-900'}`}
    >
      <View className="mb-3 flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">Lab {lab.number} · {lab.pattern}</Text>
          <Text className="mt-1 text-base font-bold text-ink" numberOfLines={2}>{lab.title}</Text>
        </View>
        <Text className={progress.completed ? 'text-xs font-bold text-accent' : 'text-xs text-zinc-500'}>
          {progress.completed ? 'DONE' : progress.mastery.toUpperCase()}
        </Text>
      </View>
      <Text className="mb-3 text-sm leading-5 text-muted" numberOfLines={2}>{lab.trigger}</Text>
      <View className="flex-row items-center justify-between">
        <Text className="font-mono text-xs text-zinc-400">{lab.complexity}</Text>
        <Text className="font-mono text-[10px] text-zinc-600">reviews {progress.reviewCount}</Text>
      </View>
    </Pressable>
  );
}
