import { describe, expect, it } from 'vitest';

import { createDefaultStudyProgress, cycleLabMastery, parseStudyProgress, recordLabReview, selectLab, toggleLabComplete } from './progress';

describe('study progress', () => {
  it('persists the last selected lab through the pure state transition', () => {
    expect(selectLab(createDefaultStudyProgress(), 'binary-search').lastLabId).toBe('binary-search');
  });

  it('cycles mastery and promotes a mastered lab to complete', () => {
    const practicing = cycleLabMastery(createDefaultStudyProgress(), 'two-sum');
    const mastered = cycleLabMastery(practicing, 'two-sum');
    expect(practicing.labs['two-sum'].mastery).toBe('practicing');
    expect(mastered.labs['two-sum'].mastery).toBe('mastered');
    expect(mastered.labs['two-sum'].completed).toBe(true);
  });

  it('records reviews without changing the selected lab', () => {
    const reviewed = recordLabReview(createDefaultStudyProgress(), 'container-water', '2026-09-17T12:00:00.000Z');
    expect(reviewed.labs['container-water'].reviewCount).toBe(1);
    expect(reviewed.labs['container-water'].lastReviewedAt).toBe('2026-09-17T12:00:00.000Z');
    expect(reviewed.lastLabId).toBe('two-sum');
  });

  it('round-trips persisted progress and safely falls back from invalid data', () => {
    const completed = toggleLabComplete(createDefaultStudyProgress(), 'two-sum');
    expect(parseStudyProgress(JSON.stringify(completed)).labs['two-sum'].completed).toBe(true);
    expect(parseStudyProgress('{ definitely-not-json')).toEqual(createDefaultStudyProgress());
  });

  it('upgrades older persisted progress with a default entry for a newly added lab', () => {
    const legacy = JSON.stringify({
      version: 1,
      lastLabId: 'two-sum',
      labs: {
        'two-sum': { mastery: 'practicing', completed: true, reviewCount: 2, lastReviewedAt: null },
        'container-water': { mastery: 'learning', completed: false, reviewCount: 0, lastReviewedAt: null },
        'longest-substring': { mastery: 'learning', completed: false, reviewCount: 0, lastReviewedAt: null },
      },
    });

    const restored = parseStudyProgress(legacy);
    expect(restored.labs['two-sum'].reviewCount).toBe(2);
    expect(restored.labs['binary-search']).toEqual({ mastery: 'learning', completed: false, reviewCount: 0, lastReviewedAt: null });
  });
});
