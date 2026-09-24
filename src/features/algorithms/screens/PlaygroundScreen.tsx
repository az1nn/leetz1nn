import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { buildReviewQueue, type LabId } from '../../progress/domain/progress';
import { useStudyProgress } from '../../progress/hooks/useStudyProgress';
import { BinarySearchLab } from '../components/BinarySearchLab';
import { ContainerWithMostWaterLab } from '../components/ContainerWithMostWaterLab';
import { LabCard } from '../components/LabCard';
import { LongestSubstringLab } from '../components/LongestSubstringLab';
import { TwoSumLab } from '../components/TwoSumLab';
import { ValidParenthesesLab } from '../components/ValidParenthesesLab';
import { getLab, LABS } from '../data/labs';

function ActionButton({ label, onPress, accent = false }: { label: string; onPress: () => void; accent?: boolean }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} className={accent ? 'rounded-xl bg-accent px-4 py-3 active:opacity-80' : 'rounded-xl border border-zinc-700 px-4 py-3 active:bg-zinc-800'}>
      <Text className={accent ? 'text-center text-sm font-bold text-black' : 'text-center text-sm font-semibold text-ink'}>{label}</Text>
    </Pressable>
  );
}

function ActiveLab({ labId }: { labId: LabId }) {
  if (labId === 'two-sum') return <TwoSumLab />;
  if (labId === 'container-water') return <ContainerWithMostWaterLab />;
  if (labId === 'longest-substring') return <LongestSubstringLab />;
  if (labId === 'valid-parentheses') return <ValidParenthesesLab />;
  return <BinarySearchLab />;
}

function queueStatus(daysUntilDue: number) {
  if (daysUntilDue <= 0) return 'due now';
  if (daysUntilDue === 1) return 'in 1 day';
  return 'in ' + daysUntilDue + ' days';
}

export function PlaygroundScreen() {
  const progress = useStudyProgress();
  const activeLabId = progress.state.lastLabId;
  const activeLab = getLab(activeLabId);
  const activeProgress = progress.state.labs[activeLabId];
  const completedCount = LABS.filter((lab) => progress.state.labs[lab.id].completed).length;
  const reviewQueue = buildReviewQueue(progress.state);
  const dueCount = reviewQueue.filter((item) => item.isDue).length;

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScrollView className="flex-1" contentContainerClassName="px-4 pb-16 pt-8 md:px-8 lg:px-12">
        <View className="mx-auto w-full max-w-7xl">
          <View className="mb-8 gap-4 lg:flex-row lg:items-end lg:justify-between">
            <View className="max-w-4xl">
              <Text className="mb-2 font-mono text-xs font-bold uppercase tracking-[3px] text-accent">leetZ1nn · study workspace</Text>
              <Text className="text-4xl font-black tracking-tight text-ink md:text-6xl">Recognize the pattern. Run the invariant.</Text>
              <Text className="mt-4 max-w-3xl text-base leading-7 text-muted">
                One focused lab at a time. Trace state transitions, explain the invariant, then record mastery and reviews locally.
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
                <LabCard key={lab.id} lab={lab} progress={progress.state.labs[lab.id]} selected={lab.id === activeLabId} onPress={() => progress.select(lab.id)} />
              ))}
            </ScrollView>
          </View>

          <View className="mb-5 rounded-2xl border border-line bg-panel p-4">
            <View className="mb-4 gap-2 md:flex-row md:items-end md:justify-between">
              <View>
                <Text className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">Review queue</Text>
                <Text className="mt-1 text-xl font-bold text-ink">Spaced practice from your real study history</Text>
                <Text className="mt-1 text-sm text-muted">{dueCount} due now · {reviewQueue.length} completed labs scheduled</Text>
              </View>
              <Text className="max-w-xl text-xs leading-5 text-zinc-500">
                Learning starts at 1 day, practicing at 3 days, mastered at 7 days. Repeated reviews extend the interval up to 4×.
              </Text>
            </View>

            {reviewQueue.length === 0 ? (
              <View className="rounded-xl border border-dashed border-zinc-800 bg-black/30 p-4">
                <Text className="text-sm font-semibold text-ink">Complete a lab to put it into the review queue.</Text>
                <Text className="mt-1 text-xs leading-5 text-muted">A completed lab with no review history is due immediately, so the queue never hides unfinished study work.</Text>
              </View>
            ) : (
              <View className="gap-2">
                {reviewQueue.slice(0, 4).map((item, index) => {
                  const lab = getLab(item.labId);
                  return (
                    <View key={item.labId} className="rounded-xl border border-zinc-800 bg-black/30 p-3 md:flex-row md:items-center md:justify-between md:gap-4">
                      <View className="flex-1">
                        <Text className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                          #{index + 1} · {item.isDue ? 'due' : 'upcoming'} · interval {item.intervalDays}d
                        </Text>
                        <Text className="mt-1 text-base font-bold text-ink">Lab {lab.number} · {lab.title}</Text>
                        <Text className="mt-1 text-xs text-muted">{lab.pattern} · {queueStatus(item.daysUntilDue)}</Text>
                      </View>
                      <Pressable accessibilityRole="button" onPress={() => progress.select(item.labId)} className="mt-3 rounded-lg border border-zinc-700 px-3 py-2 active:bg-zinc-800 md:mt-0">
                        <Text className="text-center text-xs font-bold text-ink">{item.isDue ? 'Study now' : 'Open lab'}</Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          <View className="mb-5 rounded-2xl border border-line bg-black p-4 md:flex-row md:items-center md:justify-between md:gap-4">
            <View className="mb-4 md:mb-0">
              <Text className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">Current study state</Text>
              <Text className="mt-1 text-lg font-bold text-ink">Lab {activeLab.number} · {activeLab.title}</Text>
              <Text className="mt-1 text-sm text-muted">{activeProgress.mastery} · {activeProgress.completed ? 'completed' : 'in progress'} · {activeProgress.reviewCount} reviews</Text>
              {activeProgress.lastReviewedAt ? <Text className="mt-1 font-mono text-[10px] text-zinc-600">last review {new Date(activeProgress.lastReviewedAt).toLocaleString()}</Text> : null}
            </View>
            <View className="flex-row flex-wrap gap-2">
              <ActionButton label={'Mastery: ' + activeProgress.mastery} onPress={() => progress.cycleMastery(activeLabId)} />
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
