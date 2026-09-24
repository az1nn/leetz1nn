import { describe, expect, it } from 'vitest';

import {
  buildReviewQueue,
  createDefaultStudyProgress,
  cycleLabMastery,
  parseStudyProgress,
  recordLabReview,
  reviewIntervalDays,
  selectLab,
  toggleLabComplete,
} from './progress';

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

  it('only queues completed labs and makes an unreviewed completed lab due immediately', () => {
    const completed = toggleLabComplete(createDefaultStudyProgress(), 'two-sum');
    const queue = buildReviewQueue(completed, '2026-09-20T12:00:00.000Z');

    expect(queue).toHaveLength(1);
    expect(queue[0]).toMatchObject({
      labId: 'two-sum',
      isDue: true,
      daysUntilDue: 0,
    });
  });

  it('spaces reviews by mastery and bounded review count', () => {
    const state = createDefaultStudyProgress();
    expect(reviewIntervalDays({ ...state.labs['two-sum'], mastery: 'learning', reviewCount: 1 })).toBe(1);
    expect(reviewIntervalDays({ ...state.labs['two-sum'], mastery: 'practicing', reviewCount: 2 })).toBe(6);
    expect(reviewIntervalDays({ ...state.labs['two-sum'], mastery: 'mastered', reviewCount: 99 })).toBe(28);
  });

  it('sorts due reviews before upcoming reviews using deterministic due dates', () => {
    const base = createDefaultStudyProgress();
    const state = {
      ...base,
      labs: {
        ...base.labs,
        'two-sum': { mastery: 'practicing' as const, completed: true, reviewCount: 1, lastReviewedAt: '2026-09-10T12:00:00.000Z' },
        'container-water': { mastery: 'mastered' as const, completed: true, reviewCount: 1, lastReviewedAt: '2026-09-19T12:00:00.000Z' },
      },
    };

    const queue = buildReviewQueue(state, '2026-09-20T12:00:00.000Z');
    expect(queue.map((item) => item.labId)).toEqual(['two-sum', 'container-water']);

    const due = queue[0]!;
    const upcoming = queue[1]!;
    expect(due.isDue).toBe(true);
    expect(upcoming.isDue).toBe(false);
    expect(upcoming.daysUntilDue).toBe(6);
  });
});
