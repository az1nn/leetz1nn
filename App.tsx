import '@expo/metro-runtime';
import './global.css';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PlaygroundScreen } from './src/features/algorithms/screens/PlaygroundScreen';
import { StudyProgressProvider } from './src/features/progress/hooks/useStudyProgress';

export default function App() {
  return (
    <SafeAreaProvider>
      <StudyProgressProvider>
        <PlaygroundScreen />
      </StudyProgressProvider>
    </SafeAreaProvider>
  );
}
