import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  createDefaultStudyProgress,
  cycleLabMastery,
  type LabId,
  parseStudyProgress,
  recordLabReview,
  selectLab,
  type StudyProgressState,
  toggleLabComplete,
} from '../domain/progress';

const STORAGE_KEY = 'leetz1nn.study-progress.v1';

type StudyProgressContextValue = {
  state: StudyProgressState;
  hydrated: boolean;
  select: (labId: LabId) => void;
  cycleMastery: (labId: LabId) => void;
  toggleComplete: (labId: LabId) => void;
  recordReview: (labId: LabId) => void;
  reset: () => void;
};

const StudyProgressContext = createContext<StudyProgressContextValue | null>(null);

export function StudyProgressProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<StudyProgressState>(() => createDefaultStudyProgress());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (active) setState(parseStudyProgress(raw));
      })
      .catch(() => {
        // Storage failure must not prevent studying. Keep the in-memory fallback.
      })
      .finally(() => {
        if (active) setHydrated(true);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const select = useCallback((labId: LabId) => {
    setState((current) => selectLab(current, labId));
  }, []);

  const cycleMastery = useCallback((labId: LabId) => {
    setState((current) => cycleLabMastery(current, labId));
  }, []);

  const toggleComplete = useCallback((labId: LabId) => {
    setState((current) => toggleLabComplete(current, labId));
  }, []);

  const recordReview = useCallback((labId: LabId) => {
    setState((current) => recordLabReview(current, labId));
  }, []);

  const reset = useCallback(() => {
    setState(createDefaultStudyProgress());
  }, []);

  const value = useMemo<StudyProgressContextValue>(
    () => ({ state, hydrated, select, cycleMastery, toggleComplete, recordReview, reset }),
    [cycleMastery, hydrated, recordReview, reset, select, state, toggleComplete],
  );

  return <StudyProgressContext.Provider value={value}>{children}</StudyProgressContext.Provider>;
}

export function useStudyProgress() {
  const context = useContext(StudyProgressContext);
  if (!context) throw new Error('useStudyProgress must be used inside StudyProgressProvider');
  return context;
}
