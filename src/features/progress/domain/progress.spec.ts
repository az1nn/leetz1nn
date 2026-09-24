import { describe, expect, it } from 'vitest';

import {
  createDefaultStudyProgress,
  cycleLabMastery,
  parseStudyProgress,
  recordLabReview,
  selectLab,
  toggleLabComplete,
} from './progress';

describe('study progress', () => {
  it('persists the last selected lab through the pure state transition', () => {
    const state = selectLab(createDefaultStudyProgress(), 'longest-substring');
    expect(state.lastLabId).toBe('longest-substring');
  });

  it('cycles mastery and promotes a mastered lab to complete', () => {
    const initial = createDefaultStudyProgress();
    const practicing = cycleLabMastery(initial, 'two-sum');
    const mastered = cycleLabMastery(practicing, 'two-sum');

    expect(practicing.labs['two-sum'].mastery).toBe('practicing');
    expect(mastered.labs['two-sum'].mastery).toBe('mastered');
    expect(mastered.labs['two-sum'].completed).toBe(true);
  });

  it('records reviews without changing the selected lab', () => {
    const initial = createDefaultStudyProgress();
    const reviewed = recordLabReview(initial, 'container-water', '2026-09-17T12:00:00.000Z');

    expect(reviewed.labs['container-water'].reviewCount).toBe(1);
    expect(reviewed.labs['container-water'].lastReviewedAt).toBe('2026-09-17T12:00:00.000Z');
    expect(reviewed.lastLabId).toBe('two-sum');
  });

  it('round-trips persisted progress and safely falls back from invalid data', () => {
    const completed = toggleLabComplete(createDefaultStudyProgress(), 'two-sum');
    const restored = parseStudyProgress(JSON.stringify(completed));
    const invalid = parseStudyProgress('{ definitely-not-json');

    expect(restored.labs['two-sum'].completed).toBe(true);
    expect(invalid).toEqual(createDefaultStudyProgress());
  });
});
