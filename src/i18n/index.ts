import type { Locale } from './config';
import { zh } from './dictionaries/zh';
import { en } from './dictionaries/en';

export type Dictionary = typeof zh;

// en satisfies the same structure as zh, but TypeScript infers narrower string
// literal types from zh (e.g. "首页" vs "Home"). The double cast is needed
// until we extract an explicit interface with `string` fields.
const enDict: Dictionary = en as unknown as Dictionary;

const dictionaries: Record<Locale, Dictionary> = {
  zh,
  en: enDict,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.zh;
}
