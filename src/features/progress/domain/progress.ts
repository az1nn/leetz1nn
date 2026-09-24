export const LAB_IDS = ['two-sum', 'container-water', 'longest-substring', 'binary-search'] as const;

export type LabId = (typeof LAB_IDS)[number];
export type MasteryLevel = 'learning' | 'practicing' | 'mastered';

export type LabProgress = {
  mastery: MasteryLevel;
  completed: boolean;
  reviewCount: number;
  lastReviewedAt: string | null;
};

export type StudyProgressState = {
  version: 1;
  lastLabId: LabId;
  labs: Record<LabId, LabProgress>;
};

export type ReviewQueueItem = {
  labId: LabId;
  dueAt: string;
  isDue: boolean;
  intervalDays: number;
  daysUntilDue: number;
};

const INITIAL_LAB_PROGRESS: LabProgress = {
  mastery: 'learning',
  completed: false,
  reviewCount: 0,
  lastReviewedAt: null,
};

const DAY_MS = 24 * 60 * 60 * 1000;
const BASE_REVIEW_INTERVAL_DAYS: Record<MasteryLevel, number> = {
  learning: 1,
  practicing: 3,
  mastered: 7,
};

function createLabProgress(): LabProgress {
  return { ...INITIAL_LAB_PROGRESS };
}

export function createDefaultStudyProgress(): StudyProgressState {
  return {
    version: 1,
    lastLabId: 'two-sum',
    labs: {
      'two-sum': createLabProgress(),
      'container-water': createLabProgress(),
      'longest-substring': createLabProgress(),
      'binary-search': createLabProgress(),
    },
  };
}

export function isLabId(value: unknown): value is LabId {
  return typeof value === 'string' && (LAB_IDS as readonly string[]).includes(value);
}

function isMasteryLevel(value: unknown): value is MasteryLevel {
  return value === 'learning' || value === 'practicing' || value === 'mastered';
}

export function cycleMastery(level: MasteryLevel): MasteryLevel {
  if (level === 'learning') return 'practicing';
  if (level === 'practicing') return 'mastered';
  return 'learning';
}

export function selectLab(state: StudyProgressState, labId: LabId): StudyProgressState {
  if (state.lastLabId === labId) return state;
  return { ...state, lastLabId: labId };
}

export function cycleLabMastery(state: StudyProgressState, labId: LabId): StudyProgressState {
  const current = state.labs[labId];
  const mastery = cycleMastery(current.mastery);
  return {
    ...state,
    labs: {
      ...state.labs,
      [labId]: { ...current, mastery, completed: mastery === 'mastered' ? true : current.completed },
    },
  };
}

export function toggleLabComplete(state: StudyProgressState, labId: LabId): StudyProgressState {
  const current = state.labs[labId];
  const completed = !current.completed;
  return {
    ...state,
    labs: {
      ...state.labs,
      [labId]: {
        ...current,
        completed,
        mastery: completed && current.mastery === 'learning' ? 'practicing' : current.mastery,
      },
    },
  };
}

export function recordLabReview(state: StudyProgressState, labId: LabId, reviewedAt = new Date().toISOString()): StudyProgressState {
  const current = state.labs[labId];
  return {
    ...state,
    labs: {
      ...state.labs,
      [labId]: { ...current, reviewCount: current.reviewCount + 1, lastReviewedAt: reviewedAt },
    },
  };
}

export function reviewIntervalDays(progress: LabProgress): number {
  const repetitions = Math.min(Math.max(progress.reviewCount, 1), 4);
  return BASE_REVIEW_INTERVAL_DAYS[progress.mastery] * repetitions;
}

export function buildReviewQueue(state: StudyProgressState, now = new Date().toISOString()): ReviewQueueItem[] {
  const parsedNow = Date.parse(now);
  const nowMs = Number.isFinite(parsedNow) ? parsedNow : Date.now();

  return LAB_IDS
    .filter((labId) => state.labs[labId].completed)
    .map((labId) => {
      const progress = state.labs[labId];
      const intervalDays = reviewIntervalDays(progress);
      const reviewedAt = progress.lastReviewedAt ? Date.parse(progress.lastReviewedAt) : Number.NaN;
      const dueAtMs = Number.isFinite(reviewedAt) ? reviewedAt + intervalDays * DAY_MS : nowMs;
      const deltaDays = Math.ceil((dueAtMs - nowMs) / DAY_MS);

      return {
        labId,
        dueAt: new Date(dueAtMs).toISOString(),
        isDue: dueAtMs <= nowMs,
        intervalDays,
        daysUntilDue: deltaDays,
      };
    })
    .sort((a, b) => {
      const dueDifference = Date.parse(a.dueAt) - Date.parse(b.dueAt);
      if (dueDifference !== 0) return dueDifference;
      return LAB_IDS.indexOf(a.labId) - LAB_IDS.indexOf(b.labId);
    });
}

export function parseStudyProgress(raw: string | null): StudyProgressState {
  const fallback = createDefaultStudyProgress();
  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return fallback;

    const candidate = parsed as Partial<StudyProgressState> & { labs?: unknown };
    const lastLabId = isLabId(candidate.lastLabId) ? candidate.lastLabId : fallback.lastLabId;
    const rawLabs = candidate.labs && typeof candidate.labs === 'object' ? candidate.labs as Record<string, unknown> : {};
    const labs = { ...fallback.labs };

    for (const labId of LAB_IDS) {
      const value = rawLabs[labId];
      if (!value || typeof value !== 'object') continue;
      const item = value as Partial<LabProgress>;
      labs[labId] = {
        mastery: isMasteryLevel(item.mastery) ? item.mastery : labs[labId].mastery,
        completed: typeof item.completed === 'boolean' ? item.completed : labs[labId].completed,
        reviewCount: typeof item.reviewCount === 'number' && item.reviewCount >= 0 ? item.reviewCount : labs[labId].reviewCount,
        lastReviewedAt: typeof item.lastReviewedAt === 'string' ? item.lastReviewedAt : null,
      };
    }

    return { version: 1, lastLabId, labs };
  } catch {
    return fallback;
  }
}
