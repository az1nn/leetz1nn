import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useStudyProgress } from '../../progress/hooks/useStudyProgress';
import { ContainerWithMostWaterLab } from '../components/ContainerWithMostWaterLab';
import { LabCard } from '../components/LabCard';
import { LongestSubstringLab } from '../components/LongestSubstringLab';
import { TwoSumLab } from '../components/TwoSumLab';
import { getLab, LABS } from '../data/labs';

function ActionButton({ label, onPress, accent = false }: { label: string; onPress: () => void; accent?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={accent ? 'rounded-xl bg-accent px-4 py-3 active:opacity-80' : 'rounded-xl border border-zinc-700 px-4 py-3 active:bg-zinc-800'}
    >
      <Text className={accent ? 'text-center text-sm font-bold text-black' : 'text-center text-sm font-semibold text-ink'}>{label}</Text>
    </Pressable>
  );
}

function ActiveLab({ labId }: { labId: 'two-sum' | 'container-water' | 'longest-substring' }) {
  if (labId === 'two-sum') return <TwoSumLab />;
  if (labId === 'container-water') return <ContainerWithMostWaterLab />;
  return <LongestSubstringLab />;
}

export function PlaygroundScreen() {
  const progress = useStudyProgress();
  const activeLabId = progress.state.lastLabId;
  const activeLab = getLab(activeLabId);
  const activeProgress = progress.state.labs[activeLabId];
  const completedCount = LABS.filter((lab) => progress.state.labs[lab.id].completed).length;

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScrollView className="flex-1" contentContainerClassName="px-4 pb-16 pt-8 md:px-8 lg:px-12">
        <View className="mx-auto w-full max-w-7xl">
          <View className="mb-8 gap-4 lg:flex-row lg:items-end lg:justify-between">
            <View className="max-w-4xl">
              <Text className="mb-2 font-mono text-xs font-bold uppercase tracking-[3px] text-accent">leetZ1nn · study workspace</Text>
              <Text className="text-4xl font-black tracking-tight text-ink md:text-6xl">Recognize the pattern. Run the invariant.</Text>
              <Text className="mt-4 max-w-3xl text-base leading-7 text-muted">
                One focused lab at a time. Your last lab, mastery level, completion state and review count persist locally across React Native and Web.
              </Text>
            </View>

            <View className="min-w-56 rounded-2xl border border-line bg-panel p-4">
              <Text className="text-xs font-bold uppercase tracking-widest text-zinc-500">Study progress</Text>
              <Text className="mt-2 text-3xl font-black text-ink">{completedCount}/{LABS.length}</Text>
              <Text className="text-sm text-muted">labs completed · {progress.hydrated ? 'synced locally' : 'loading local progress'}</Text>
            </View>
          </View>

          <View className="mb-8">
            <View className="mb-3 flex-row items-end justify-between gap-4">
              <View>
                <Text className="text-xs font-bold uppercase tracking-widest text-zinc-500">Catalog</Text>
                <Text className="mt-1 text-xl font-bold text-ink">Choose the pattern you want to practice</Text>
              </View>
              <Pressable onPress={progress.reset} className="px-2 py-2">
                <Text className="text-xs font-semibold text-zinc-500">Reset progress</Text>
              </Pressable>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {LABS.map((lab) => (
                <LabCard
                  key={lab.id}
                  lab={lab}
                  progress={progress.state.labs[lab.id]}
                  selected={lab.id === activeLabId}
                  onPress={() => progress.select(lab.id)}
                />
              ))}
            </ScrollView>
          </View>

          <View className="mb-5 rounded-2xl border border-line bg-black p-4 md:flex-row md:items-center md:justify-between md:gap-4">
            <View className="mb-4 md:mb-0">
              <Text className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">Current study state</Text>
              <Text className="mt-1 text-lg font-bold text-ink">Lab {activeLab.number} · {activeLab.title}</Text>
              <Text className="mt-1 text-sm text-muted">
                {activeProgress.mastery} · {activeProgress.completed ? 'completed' : 'in progress'} · {activeProgress.reviewCount} reviews
              </Text>
              {activeProgress.lastReviewedAt ? (
                <Text className="mt-1 font-mono text-[10px] text-zinc-600">last review {new Date(activeProgress.lastReviewedAt).toLocaleString()}</Text>
              ) : null}
            </View>
            <View className="flex-row flex-wrap gap-2">
              <ActionButton label={`Mastery: ${activeProgress.mastery}`} onPress={() => progress.cycleMastery(activeLabId)} />
              <ActionButton label={activeProgress.completed ? 'Reopen lab' : 'Mark complete'} onPress={() => progress.toggleComplete(activeLabId)} />
              <ActionButton label="Log review" accent onPress={() => progress.recordReview(activeLabId)} />
            </View>
          </View>

          <ActiveLab labId={activeLabId} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
