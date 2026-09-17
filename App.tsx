import '@expo/metro-runtime';
import './global.css';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PlaygroundScreen } from './src/features/algorithms/screens/PlaygroundScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PlaygroundScreen />
    </SafeAreaProvider>
  );
}
