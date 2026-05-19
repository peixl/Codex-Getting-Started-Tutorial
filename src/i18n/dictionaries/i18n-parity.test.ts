import { describe, it, expect } from 'vitest';
import { zh } from './zh';
import { en } from './en';

/**
 * i18n key parity test
 * Guards against the `as unknown as Dictionary` cast in en.ts
 * which can hide missing keys.
 */
describe('i18n key parity', () => {
  it('should have all zh keys in en', () => {
    const zhKeys = Object.keys(zh).sort();
    const enKeys = Object.keys(en).sort();

    const missingInEn = zhKeys.filter((key) => !enKeys.includes(key));

    expect(
      missingInEn,
      `Missing keys in en.ts: ${missingInEn.join(', ')}`,
    ).toEqual([]);
  });

  it('should have all en keys in zh', () => {
    const zhKeys = Object.keys(zh).sort();
    const enKeys = Object.keys(en).sort();

    const missingInZh = enKeys.filter((key) => !zhKeys.includes(key));

    expect(
      missingInZh,
      `Missing keys in zh.ts: ${missingInZh.join(', ')}`,
    ).toEqual([]);
  });

  it('should have identical key sets', () => {
    const zhKeys = Object.keys(zh).sort();
    const enKeys = Object.keys(en).sort();

    expect(enKeys).toEqual(zhKeys);
  });
});
