import type { Locale } from './config';
import { zh } from './dictionaries/zh';
import { en } from './dictionaries/en';

export type Dictionary = typeof zh;

const dictionaries: Record<Locale, Dictionary> = {
  zh,
  en: en as unknown as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.zh;
}
