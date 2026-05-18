import { describe, it, expect } from 'vitest';
import { caseBundles, getCasePrompt } from './cases/index';
import { recipes, getRecipePrompt } from './recipes';

// ─── Case data integrity ────────────────────────────────────────

describe('case data integrity', () => {
  it('caseBundles is non-empty', () => {
    expect(caseBundles.length).toBeGreaterThan(0);
  });

  it('every case has a unique slug', () => {
    const slugs = caseBundles.map((c) => c.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it('every case has non-empty prompt in both languages', () => {
    for (const c of caseBundles) {
      expect(c.prompt.zh.trim().length, `${c.slug} zh prompt is empty`).toBeGreaterThan(0);
      expect(c.prompt.en.trim().length, `${c.slug} en prompt is empty`).toBeGreaterThan(0);
    }
  });

  it('every case has non-empty i18n copy in both languages', () => {
    for (const c of caseBundles) {
      expect(c.i18n.zh.title.trim(), `${c.slug} zh title`).toBeTruthy();
      expect(c.i18n.en.title.trim(), `${c.slug} en title`).toBeTruthy();
      expect(c.i18n.zh.summary.trim(), `${c.slug} zh summary`).toBeTruthy();
      expect(c.i18n.en.summary.trim(), `${c.slug} en summary`).toBeTruthy();
      expect(c.i18n.zh.painBody.trim(), `${c.slug} zh painBody`).toBeTruthy();
      expect(c.i18n.en.painBody.trim(), `${c.slug} en painBody`).toBeTruthy();
    }
  });

  it('every case slug follows kebab-case pattern', () => {
    for (const c of caseBundles) {
      expect(c.slug).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });

  it('every case has valid department', () => {
    const validDepts = [
      'finance', 'operations', 'customer-service', 'hr',
      'logistics', 'procurement', 'marketing', 'legal',
      'data', 'admin', 'product',
    ];
    for (const c of caseBundles) {
      expect(validDepts, `${c.slug} has invalid dept: ${c.department}`).toContain(c.department);
    }
  });
});

// ─── Case prompt quality markers ────────────────────────────────

describe('case prompt quality markers', () => {
  const zhCases = caseBundles.map((c) => ({ slug: c.slug, prompt: getCasePrompt(c, 'zh') }));
  const enCases = caseBundles.map((c) => ({ slug: c.slug, prompt: getCasePrompt(c, 'en') }));

  it('every zh prompt contains constraints', () => {
    for (const { slug, prompt } of zhCases) {
      expect(prompt, `${slug} zh missing 安全底线`).toContain('【安全底线】');
    }
  });

  it('every en prompt contains constraints', () => {
    for (const { slug, prompt } of enCases) {
      expect(prompt, `${slug} en missing Safety Rules`).toContain('[Safety Rules]');
    }
  });

  it('every zh prompt contains delivery section', () => {
    for (const { slug, prompt } of zhCases) {
      expect(prompt, `${slug} zh missing 交付`).toContain('【交付】');
    }
  });

  it('every en prompt contains delivery section', () => {
    for (const { slug, prompt } of enCases) {
      expect(prompt, `${slug} en missing Delivery`).toContain('[Delivery]');
    }
  });

  it('every zh prompt contains acceptance checklist', () => {
    for (const { slug, prompt } of zhCases) {
      expect(prompt, `${slug} zh missing 验收`).toContain('验收清单');
    }
  });

  it('every en prompt contains acceptance checklist', () => {
    for (const { slug, prompt } of enCases) {
      expect(prompt, `${slug} en missing Acceptance`).toContain('Acceptance checklist');
    }
  });

  it('every zh prompt has quality bar', () => {
    for (const { slug, prompt } of zhCases) {
      expect(prompt, `${slug} zh missing quality bar`).toContain('【高质量交付补充】');
    }
  });

  it('every en prompt has quality bar', () => {
    for (const { slug, prompt } of enCases) {
      expect(prompt, `${slug} en missing quality bar`).toContain('[High-Quality Delivery Addendum]');
    }
  });

  it('every prompt tells Codex to create sample data', () => {
    for (const { slug, prompt } of zhCases) {
      expect(prompt, `${slug} zh missing sample-data`).toContain('sample-data');
    }
    for (const { slug, prompt } of enCases) {
      expect(prompt, `${slug} en missing sample-data`).toContain('sample-data');
    }
  });
});

// ─── Recipe data integrity ──────────────────────────────────────

describe('recipe data integrity', () => {
  it('recipes array is non-empty', () => {
    expect(recipes.length).toBeGreaterThan(0);
  });

  it('every recipe has a unique id', () => {
    const ids = recipes.map((r) => r.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('every recipe has non-empty prompt in both languages', () => {
    for (const r of recipes) {
      expect(r.promptZh.trim().length, `${r.id} promptZh is empty`).toBeGreaterThan(0);
      expect(r.promptEn.trim().length, `${r.id} promptEn is empty`).toBeGreaterThan(0);
    }
  });

  it('every recipe has non-empty title and pain in both languages', () => {
    for (const r of recipes) {
      expect(r.titleZh.trim(), `${r.id} titleZh`).toBeTruthy();
      expect(r.titleEn.trim(), `${r.id} titleEn`).toBeTruthy();
      expect(r.painZh.trim(), `${r.id} painZh`).toBeTruthy();
      expect(r.painEn.trim(), `${r.id} painEn`).toBeTruthy();
    }
  });
});

// ─── Recipe prompt quality markers ──────────────────────────────

describe('recipe prompt quality markers', () => {
  it('every zh recipe prompt contains constraints', () => {
    for (const r of recipes) {
      const prompt = getRecipePrompt(r, 'zh');
      expect(prompt, `${r.id} zh missing 约束`).toContain('约束');
    }
  });

  it('every en recipe prompt contains constraints', () => {
    for (const r of recipes) {
      const prompt = getRecipePrompt(r, 'en');
      expect(prompt, `${r.id} en missing Constraints`).toContain('Constraints');
    }
  });

  it('every zh recipe prompt contains acceptance', () => {
    for (const r of recipes) {
      const prompt = getRecipePrompt(r, 'zh');
      expect(prompt, `${r.id} zh missing 验收`).toContain('验收');
    }
  });

  it('every en recipe prompt contains acceptance', () => {
    for (const r of recipes) {
      const prompt = getRecipePrompt(r, 'en');
      expect(prompt, `${r.id} en missing Acceptance`).toContain('Acceptance');
    }
  });

  it('every zh recipe prompt has quality bar', () => {
    for (const r of recipes) {
      const prompt = getRecipePrompt(r, 'zh');
      expect(prompt, `${r.id} zh missing quality bar`).toContain('高质量交付补充');
    }
  });

  it('every en recipe prompt has quality bar', () => {
    for (const r of recipes) {
      const prompt = getRecipePrompt(r, 'en');
      expect(prompt, `${r.id} en missing quality bar`).toContain('High-Quality Delivery Addendum');
    }
  });

  it('every recipe prompt tells Codex to create sample data', () => {
    for (const r of recipes) {
      const zhPrompt = getRecipePrompt(r, 'zh');
      const enPrompt = getRecipePrompt(r, 'en');
      expect(zhPrompt, `${r.id} zh missing sample-data`).toContain('sample-data');
      expect(enPrompt, `${r.id} en missing sample-data`).toContain('sample-data');
    }
  });
});
