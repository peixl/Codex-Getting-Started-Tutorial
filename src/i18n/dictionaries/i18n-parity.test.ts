import { describe, it, expect } from 'vitest';
import { zh } from './zh';
import { en } from './en';

function flattenKeys(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(value).flatMap(([key, child]) => {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    return flattenKeys(child, nextPrefix);
  });
}

/**
 * i18n key parity test
 * Guards against the `as unknown as Dictionary` cast in en.ts
 * which can hide missing keys.
 */
describe('i18n key parity', () => {
  it('should have all zh keys in en', () => {
    const zhKeys = flattenKeys(zh).sort();
    const enKeys = flattenKeys(en).sort();

    const missingInEn = zhKeys.filter((key) => !enKeys.includes(key));

    expect(
      missingInEn,
      `Missing keys in en.ts: ${missingInEn.join(', ')}`,
    ).toEqual([]);
  });

  it('should have all en keys in zh', () => {
    const zhKeys = flattenKeys(zh).sort();
    const enKeys = flattenKeys(en).sort();

    const missingInZh = enKeys.filter((key) => !zhKeys.includes(key));

    expect(
      missingInZh,
      `Missing keys in zh.ts: ${missingInZh.join(', ')}`,
    ).toEqual([]);
  });

  it('should have identical key sets', () => {
    const zhKeys = flattenKeys(zh).sort();
    const enKeys = flattenKeys(en).sort();

    expect(enKeys).toEqual(zhKeys);
  });
});
