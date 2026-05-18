import {
  DEFAULT_FORM,
  type Complexity,
  type FormState,
  type Platform,
  type PromptLang,
  type Storage,
  type TechStack,
  type UiStyle,
} from './promptBuilder';

export type HistoryEntry = {
  id: string;
  savedAt: string;
  lang: PromptLang;
  state: FormState;
};

export type FormStatePatch = Partial<Omit<FormState, 'extras'>> & {
  extras?: Partial<FormState['extras']>;
};

export const STORAGE_KEY = 'codex-tutorial:generator:v2';
export const HISTORY_KEY = 'codex-tutorial:generator:history:v2';
export const MAX_HISTORY = 6;

const PLATFORMS: readonly Platform[] = ['windows', 'mac', 'both'];
const TECH_STACKS: readonly TechStack[] = ['electron', 'tauri', 'pyqt', 'auto'];
const UI_STYLES: readonly UiStyle[] = ['minimal', 'dark', 'fresh', 'business'];
const STORAGE_OPTIONS: readonly Storage[] = ['localFile', 'sqlite', 'none'];
const COMPLEXITIES: readonly Complexity[] = ['starter', 'standard', 'advanced'];
const PROMPT_LANGS: readonly PromptLang[] = ['zh', 'en'];

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function stringOrDefault(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
}

function booleanOrDefault(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function enumOrDefault<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T,
): T {
  return typeof value === 'string' && allowed.includes(value as T) ? (value as T) : fallback;
}

export function normalizeFormState(value?: unknown): FormState {
  const state = asRecord(value) ?? {};
  const extras = asRecord(state.extras) ?? {};

  return {
    platform: enumOrDefault(state.platform, PLATFORMS, DEFAULT_FORM.platform),
    tech: enumOrDefault(state.tech, TECH_STACKS, DEFAULT_FORM.tech),
    ui: enumOrDefault(state.ui, UI_STYLES, DEFAULT_FORM.ui),
    storage: enumOrDefault(state.storage, STORAGE_OPTIONS, DEFAULT_FORM.storage),
    complexity: enumOrDefault(state.complexity, COMPLEXITIES, DEFAULT_FORM.complexity),
    goal: stringOrDefault(state.goal, DEFAULT_FORM.goal),
    features: stringOrDefault(state.features, DEFAULT_FORM.features),
    extras: {
      offline: booleanOrDefault(extras.offline, DEFAULT_FORM.extras.offline),
      bilingual: booleanOrDefault(extras.bilingual, DEFAULT_FORM.extras.bilingual),
      exportable: booleanOrDefault(extras.exportable, DEFAULT_FORM.extras.exportable),
      shortcut: booleanOrDefault(extras.shortcut, DEFAULT_FORM.extras.shortcut),
      accessibility: booleanOrDefault(
        extras.accessibility,
        DEFAULT_FORM.extras.accessibility,
      ),
    },
    custom: stringOrDefault(state.custom, DEFAULT_FORM.custom),
  };
}

export function mergeFormState(current: FormState, patch: FormStatePatch): FormState {
  return normalizeFormState({
    ...current,
    ...patch,
    extras: {
      ...current.extras,
      ...(patch.extras ?? {}),
    },
  });
}

export function parseStoredForm(raw: string | null): FormState | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    const parsedRecord = asRecord(parsed);
    const candidate = parsedRecord && 'state' in parsedRecord ? parsedRecord.state : parsed;
    return asRecord(candidate) ? normalizeFormState(candidate) : null;
  } catch {
    return null;
  }
}

function normalizeHistoryEntry(value: unknown): HistoryEntry | null {
  const entry = asRecord(value);
  if (!entry) return null;

  const id = typeof entry.id === 'string' && entry.id.trim() ? entry.id : null;
  const savedAt = typeof entry.savedAt === 'string' && !Number.isNaN(Date.parse(entry.savedAt))
    ? entry.savedAt
    : null;
  const lang = enumOrDefault(entry.lang, PROMPT_LANGS, 'zh');

  if (!id || !savedAt || !asRecord(entry.state)) return null;

  return {
    id,
    savedAt,
    lang,
    state: normalizeFormState(entry.state),
  };
}

export function normalizeHistory(value: unknown, maxHistory = MAX_HISTORY): HistoryEntry[] {
  if (!Array.isArray(value)) return [];

  return value
    .map(normalizeHistoryEntry)
    .filter((entry): entry is HistoryEntry => Boolean(entry))
    .slice(0, maxHistory);
}

export function parseStoredHistory(raw: string | null): HistoryEntry[] {
  if (!raw) return [];

  try {
    return normalizeHistory(JSON.parse(raw) as unknown);
  } catch {
    return [];
  }
}

export function createHistoryEntry(
  state: FormState,
  lang: PromptLang,
  now = new Date(),
  random = Math.random,
): HistoryEntry {
  return {
    id: `${now.getTime()}-${random().toString(16).slice(2, 6)}`,
    savedAt: now.toISOString(),
    lang,
    state: normalizeFormState(state),
  };
}

export function addHistoryEntry(
  history: HistoryEntry[],
  entry: HistoryEntry,
  maxHistory = MAX_HISTORY,
): HistoryEntry[] {
  return [entry, ...history].slice(0, maxHistory);
}
