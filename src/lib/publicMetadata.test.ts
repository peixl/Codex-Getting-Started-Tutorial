import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const publicPath = (...parts: string[]) => join(process.cwd(), 'public', ...parts);

describe('public AI metadata', () => {
  it('keeps the canonical agent guide aligned with website-first positioning', () => {
    const text = readFileSync(publicPath('agent.md'), 'utf8');

    expect(text).toContain('website apps by default');
    expect(text).toContain('Windows/macOS desktop tools remain available');
    expect(text).toContain('web delivery contract');
    expect(text).toContain('online website standard');
    expect(text).toContain('npm run build');
    expect(text).not.toContain('compact desktop delivery contract');
    expect(text).not.toContain('local-first safety');
  });

  it('keeps the compatibility agent guide aligned with website-first positioning', () => {
    const text = readFileSync(publicPath('agents.md'), 'utf8');

    expect(text).toContain('website apps by default');
    expect(text).toContain('Windows/macOS desktop tools remain available');
    expect(text).toContain('web or desktop delivery contract');
    expect(text).toContain('online website standards');
    expect(text).not.toContain('M1/M2/M3/M4 cadence');
    expect(text).not.toContain('local-first safety');
  });

  it('keeps LLM summaries aligned with current generator defaults', () => {
    const summary = readFileSync(publicPath('llms.txt'), 'utf8');
    const full = readFileSync(publicPath('llms-full.txt'), 'utf8');

    for (const text of [summary, full]) {
      expect(text).toContain('website apps by default');
      expect(text).toContain('desktop tools remain available');
      expect(text).toContain('Prompt Generator');
      expect(text).toContain('Next.js');
      expect(text).not.toContain('optional extras (offline');
      expect(text).not.toContain('local-first behavior');
    }
  });
});
