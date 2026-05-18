import { describe, expect, it } from 'vitest';
import {
  addHistoryEntry,
  createHistoryEntry,
  normalizeFormState,
  parseStoredForm,
  parseStoredHistory,
  mergeFormState,
} from './generatorStorage';
import { DEFAULT_FORM, type FormState } from './promptBuilder';

function makeState(partial: Partial<FormState> = {}): FormState {
  return normalizeFormState({
    ...DEFAULT_FORM,
    goal: '做一个本地对账工具',
    features: '- 导入订单\n- 导出差异',
    ...partial,
    extras: { ...DEFAULT_FORM.extras, ...(partial.extras ?? {}) },
  });
}

describe('generatorStorage', () => {
  it('normalizes partial form state and protects enum fields', () => {
    const state = normalizeFormState({
      platform: 'linux',
      tech: 'auto',
      ui: 'business',
      storage: 'bad-storage',
      complexity: 'advanced',
      goal: '目标',
      features: 42,
      extras: {
        offline: false,
        exportable: false,
        shortcut: true,
        accessibility: 'yes',
      },
    });

    expect(state.platform).toBe(DEFAULT_FORM.platform);
    expect(state.storage).toBe(DEFAULT_FORM.storage);
    expect(state.features).toBe(DEFAULT_FORM.features);
    expect(state.ui).toBe('business');
    expect(state.complexity).toBe('advanced');
    expect(state.extras.offline).toBe(false);
    expect(state.extras.exportable).toBe(false);
    expect(state.extras.shortcut).toBe(true);
    expect(state.extras.accessibility).toBe(DEFAULT_FORM.extras.accessibility);
    expect(state.extras.bilingual).toBe(DEFAULT_FORM.extras.bilingual);
  });

  it('parses stored form wrappers and ignores invalid JSON', () => {
    const raw = JSON.stringify({
      state: {
        platform: 'both',
        goal: '帮运营合并表格',
        extras: { bilingual: true },
      },
    });

    expect(parseStoredForm(raw)).toMatchObject({
      platform: 'both',
      goal: '帮运营合并表格',
      extras: { bilingual: true },
    });
    expect(parseStoredForm('{bad json')).toBeNull();
    expect(parseStoredForm(JSON.stringify(['not', 'a', 'state']))).toBeNull();
  });

  it('merges template state without dropping existing extra toggles', () => {
    const current = makeState({
      extras: {
        offline: true,
        bilingual: true,
        exportable: false,
        shortcut: true,
        accessibility: false,
      },
    });

    const next = mergeFormState(current, {
      platform: 'both',
      extras: { exportable: true, accessibility: true },
    });

    expect(next.platform).toBe('both');
    expect(next.extras).toEqual({
      offline: true,
      bilingual: true,
      exportable: true,
      shortcut: true,
      accessibility: true,
    });
  });

  it('sanitizes history entries and limits stored history', () => {
    const valid = Array.from({ length: 8 }, (_, index) => ({
      id: `entry-${index}`,
      savedAt: new Date(2026, 0, index + 1).toISOString(),
      lang: index % 2 === 0 ? 'zh' : 'en',
      state: makeState({ goal: `目标 ${index}` }),
    }));
    const raw = JSON.stringify([
      ...valid,
      { id: '', savedAt: valid[0].savedAt, lang: 'zh', state: makeState() },
      { id: 'bad-date', savedAt: 'not-a-date', lang: 'zh', state: makeState() },
    ]);

    const history = parseStoredHistory(raw);

    expect(history).toHaveLength(6);
    expect(history.map((entry) => entry.id)).toEqual([
      'entry-0',
      'entry-1',
      'entry-2',
      'entry-3',
      'entry-4',
      'entry-5',
    ]);
  });

  it('creates deterministic history entries for tests and prepends them', () => {
    const state = makeState({ platform: 'mac' });
    const entry = createHistoryEntry(
      state,
      'en',
      new Date('2026-05-18T00:00:00.000Z'),
      () => 0.5,
    );
    const history = addHistoryEntry(
      [{ ...entry, id: 'older', savedAt: '2026-05-17T00:00:00.000Z' }],
      entry,
    );

    expect(entry).toMatchObject({
      id: '1779062400000-8',
      lang: 'en',
      savedAt: '2026-05-18T00:00:00.000Z',
      state: { platform: 'mac' },
    });
    expect(history.map((item) => item.id)).toEqual(['1779062400000-8', 'older']);
  });
});
