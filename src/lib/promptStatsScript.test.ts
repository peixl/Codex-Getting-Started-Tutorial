import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

describe('prompt quality stats script', () => {
  it('counts recipe execution-shape fields as structure signals', () => {
    const output = execFileSync('node', ['scripts/prompt-stats.mjs', '--json'], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });
    const report = JSON.parse(output) as {
      summary: Array<{
        bucket: string;
        minStructureSignals: number;
      }>;
    };

    const recipeZh = report.summary.find((row) => row.bucket === 'recipe:zh');
    const recipeEn = report.summary.find((row) => row.bucket === 'recipe:en');

    expect(recipeZh?.minStructureSignals).toBeGreaterThanOrEqual(12);
    expect(recipeEn?.minStructureSignals).toBeGreaterThanOrEqual(12);
  });
});
