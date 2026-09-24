import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PatternCard } from '../components/PatternCard';
import { TwoSumLab } from '../components/TwoSumLab';
import { PATTERNS } from '../data/patterns';

export function PlaygroundScreen() {
  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScrollView className="flex-1" contentContainerClassName="px-4 pb-16 pt-8 md:px-8 lg:px-12">
        <View className="mx-auto w-full max-w-7xl">
          <View className="mb-8">
            <Text className="mb-2 font-mono text-xs font-bold uppercase tracking-[3px] text-accent">leetZ1nn · algorithm lab</Text>
            <Text className="max-w-4xl text-4xl font-black tracking-tight text-ink md:text-6xl">Learn the pattern. Watch the state change.</Text>
            <Text className="mt-4 max-w-3xl text-base leading-7 text-muted">
              React Native + Web is the visualization layer. The algorithm stays pure. Every lab exposes its invariant, execution trace and complexity so the implementation becomes reusable interview intuition.
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
            {PATTERNS.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </ScrollView>

          <TwoSumLab />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
