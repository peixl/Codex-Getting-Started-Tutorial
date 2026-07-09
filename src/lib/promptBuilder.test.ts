import { describe, expect, it } from 'vitest';
import {
  buildPrompt,
  buildRecoveryPrompt,
  DEFAULT_FORM,
  quickTemplates,
  type FormState,
} from './promptBuilder';

const GENERATOR_QUALITY_MARKERS = {
  zh: [
    '直接动手',
    'sample-data',
    '友好',
    '路径兼容中文',
    '真实接线',
    'TODO',
    '3 次',
    '快速启动协议',
    'Codex 执行循环',
    'Goal / Context / Constraints / Done when',
    '探查 → 计划 → 实现 → 验证 → 复盘',
    '错误自救',
    '反模式清单',
    '完成标准',
  ],
  en: [
    'Start immediately',
    'sample-data',
    'friendly message',
    'Paths handle Chinese',
    'real-wired',
    'TODOs',
    '3 times',
    'Quick Start Protocol',
    'Codex Execution Loop',
    'Goal / Context / Constraints / Done when',
    'inspect → plan → implement → verify → review',
    'Error Recovery',
    'Anti-Patterns',
    'Done criteria',
  ],
} as const;

function makeState(partial: Partial<FormState> = {}): FormState {
  return {
    ...DEFAULT_FORM,
    goal: '给财务同事做一个本地对账工具，减少手工核对时间。',
    features: '- 导入订单 Excel\n- 导入银行流水 Excel\n- 导出差异清单',
    ...partial,
    extras: { ...DEFAULT_FORM.extras, ...(partial.extras ?? {}) },
  };
}

describe('buildPrompt', () => {
  it('defaults to a website app workflow', () => {
    expect(DEFAULT_FORM.platform).toBe('web');
    expect(DEFAULT_FORM.tech).toBe('nextjs');
    expect(DEFAULT_FORM.storage).toBe('browser');
    expect(DEFAULT_FORM.extras.onlinePublish).toBe(true);
    expect('offline' in DEFAULT_FORM.extras).toBe(false);
  });

  it('builds Chinese website prompts for full-platform website deployment', () => {
    const prompt = buildPrompt(makeState({ platform: 'web', tech: 'nextjs' }), 'zh');

    expect(prompt).toContain('网站应用');
    expect(prompt).toContain('Next.js');
    expect(prompt).toContain('Windows / macOS / Linux');
    expect(prompt).toContain('npm run build');
    expect(prompt).toContain('不是桌面安装包');
    expect(prompt).not.toContain('目标填空 → 复制提示词 → 粘贴到 Codex');
    expect(prompt).not.toContain('字节跳动式产品方法');
    expect(prompt).not.toContain('北极星目标');
  });

  it('adds desktop-to-web migration guidance for website prompts', () => {
    const prompt = buildPrompt(makeState({ platform: 'web', tech: 'nextjs' }), 'zh');

    expect(prompt).toContain('桌面应用迁移为网站应用');
    expect(prompt).toContain('Electron / Tauri / PyQt');
    expect(prompt).toContain('文件上传 / 浏览器下载');
    expect(prompt).toContain('浏览器本地存储或服务端存储');
  });

  it('uses online website standards instead of disconnected execution', () => {
    const zh = buildPrompt(makeState({ platform: 'web', tech: 'nextjs' }), 'zh');
    const en = buildPrompt(makeState({ platform: 'web', tech: 'nextjs' }), 'en');

    expect(zh).toContain('【在线网站标准】');
    expect(zh).toContain('可部署上线并发链接给同事');
    expect(zh).toContain('环境变量');
    expect(zh).toContain('浏览器端/服务端边界');
    expect(en).toContain('[Online Website Standard]');
    expect(en).toContain('deployable and shareable by link');
    expect(en).toContain('environment variables');
    expect(en).toContain('browser/server boundary');
    expect(`${zh}\n${en}`).not.toMatch(/断网|完全离线|不联网|Fully offline|Works offline|without internet/i);
  });

  it('makes selected desktop apps online-usable clients too', () => {
    const zh = buildPrompt(makeState({ platform: 'both', tech: 'electron' }), 'zh');
    const en = buildPrompt(makeState({ platform: 'both', tech: 'electron' }), 'en');

    expect(zh).toContain('桌面应用也要在线可用');
    expect(zh).toContain('HTTPS API');
    expect(zh).toContain('网络异常');
    expect(en).toContain('Desktop apps must also be online-usable');
    expect(en).toContain('HTTPS API');
    expect(en).toContain('network failure');
  });

  it('builds English website prompts for full-platform deployment', () => {
    const prompt = buildPrompt(makeState({ platform: 'web', tech: 'nextjs' }), 'en');

    expect(prompt).toContain('web app');
    expect(prompt).toContain('Next.js');
    expect(prompt).toContain('Windows / macOS / Linux');
    expect(prompt).toContain('npm run build');
    expect(prompt).toContain('not a desktop installer');
    expect(prompt).not.toContain('fill goal → copy prompt → paste into Codex');
    expect(prompt).not.toContain('ByteDance-style product method');
    expect(prompt).not.toContain('north-star goal');
  });

  it('includes core delivery requirements in Chinese prompts', () => {
    const prompt = buildPrompt(makeState({ platform: 'both' }), 'zh');

    expect(prompt).toContain('【交付要求】');
    expect(prompt).toContain('【安全底线】');
    expect(prompt).toContain('sample-data');
    expect(prompt).toContain('路径兼容中文、空格、括号');
    expect(prompt).toContain('系统打开/保存对话框');
    expect(prompt).toContain('真实接线');
    expect(prompt).toContain('TODO、空函数、假数据不算完成');
    expect(prompt).toContain('直接动手');
  });

  it('uses platform-specific shortcut wording in Chinese prompts', () => {
    const prompt = buildPrompt(
      makeState({ platform: 'both', extras: { ...DEFAULT_FORM.extras, shortcut: true } }),
      'zh'
    );

    expect(prompt).toContain('Windows 使用 Ctrl / Alt');
    expect(prompt).toContain('macOS 使用 Command / Option');
  });

  it('uses macOS packaging and shortcut wording in English prompts', () => {
    const prompt = buildPrompt(
      makeState({ platform: 'mac', extras: { ...DEFAULT_FORM.extras, shortcut: true } }),
      'en'
    );

    expect(prompt).toContain('macOS desktop app');
    expect(prompt).toContain('Command / Option combinations');
    expect(prompt).toContain('build a macOS .dmg installer');
    expect(prompt).toContain('native open/save dialogs');
    expect(prompt).toContain('[Safety Rules]');
    expect(prompt).toContain('do not count as done');
  });

  it('scales prompt detail by complexity', () => {
    const starter = buildPrompt(makeState({ complexity: 'starter' }), 'en');
    const advanced = buildPrompt(makeState({ complexity: 'advanced' }), 'en');

    expect(starter).not.toContain('settings, history, batch');
    expect(advanced).toContain('settings, history, batch');
  });

  it('keeps quality signals stable across generator prompts', () => {
    for (const complexity of ['starter', 'standard', 'advanced'] as const) {
      for (const lang of ['zh', 'en'] as const) {
        const text = buildPrompt(makeState({ complexity }), lang);
        const normalized = text.toLowerCase();
        const missing = GENERATOR_QUALITY_MARKERS[lang].filter(
          (marker) => !normalized.includes(marker.toLowerCase())
        );

        expect(missing, `${lang}/${complexity} missing quality markers`).toEqual([]);
      }
    }
  });

  it('inserts the opening brief between role and task in zh', () => {
    const prompt = buildPrompt(makeState(), 'zh');
    expect(prompt).toContain('【开工前的开场白】');
    const roleIdx = prompt.indexOf('你是资深网站应用工程师');
    const briefIdx = prompt.indexOf('【开工前的开场白】');
    const taskIdx = prompt.indexOf('【任务】');
    expect(roleIdx).toBeGreaterThanOrEqual(0);
    expect(roleIdx).toBeLessThan(briefIdx);
    expect(briefIdx).toBeLessThan(taskIdx);
  });

  it('inserts the opening brief between role and task in en', () => {
    const prompt = buildPrompt(makeState(), 'en');
    expect(prompt).toContain('[Opening Brief]');
    const roleIdx = prompt.indexOf('You are a senior');
    const briefIdx = prompt.indexOf('[Opening Brief]');
    const taskIdx = prompt.indexOf('[Task]');
    expect(roleIdx).toBeLessThan(briefIdx);
    expect(briefIdx).toBeLessThan(taskIdx);
  });

  it('threads warm UX and success picture into the generator prompt (zh)', () => {
    const prompt = buildPrompt(makeState(), 'zh');
    expect(prompt).toContain('【温暖体验契约】');
    expect(prompt).toContain('【完成态画面】');
    expect(prompt).toContain('Demo 模式');
    expect(prompt).toContain('打开输出文件夹');
  });

  it('threads the Codex execution loop into generator prompts', () => {
    const zh = buildPrompt(makeState(), 'zh');
    const en = buildPrompt(makeState(), 'en');

    expect(zh).toContain('【Codex 执行循环】');
    expect(zh).toContain('不要让两个并行任务改同一批文件');
    expect(zh).toContain('验证通过后再汇报');
    expect(en).toContain('[Codex Execution Loop]');
    expect(en).toContain('Do not let two parallel tasks edit the same files');
    expect(en).toContain('Report only after verification passes');
  });

  it('threads warm UX and success picture into the generator prompt (en)', () => {
    const prompt = buildPrompt(makeState(), 'en');
    expect(prompt).toContain('[Warm UX Contract]');
    expect(prompt).toContain('[Success Picture]');
    expect(prompt).toContain('demo mode');
    expect(prompt).toContain('Open output folder');
  });

  it('replaces the ad-hoc closing line with the final report schema (zh)', () => {
    const prompt = buildPrompt(makeState(), 'zh');
    expect(prompt).toContain('【收尾汇报模板】');
    expect(prompt).toContain('✅ 已交付');
    expect(prompt).not.toContain('做了什么 | 如何打开 | 验证结果 | 剩余限制');
  });

  it('replaces the ad-hoc closing line with the final report schema (en)', () => {
    const prompt = buildPrompt(makeState(), 'en');
    expect(prompt).toContain('[Final Report Schema]');
    expect(prompt).toContain('✅ Delivered');
  });

  it('reuses the shared safety rules block instead of inlining a duplicate (zh)', () => {
    const prompt = buildPrompt(makeState(), 'zh');
    expect(prompt).toContain('【安全底线】');
    const safetyOccurrences = prompt.match(/【安全底线】/g) ?? [];
    expect(safetyOccurrences.length).toBe(1);
  });

  it('reuses the shared safety rules block instead of inlining a duplicate (en)', () => {
    const prompt = buildPrompt(makeState(), 'en');
    expect(prompt).toContain('[Safety Rules]');
    const safetyOccurrences = prompt.match(/\[Safety Rules\]/g) ?? [];
    expect(safetyOccurrences.length).toBe(1);
  });

  it('maintains consistent section ordering (snapshot)', () => {
    const prompt = buildPrompt(makeState({ platform: 'both' }), 'zh');
    const sections = prompt.split('\n\n').filter((s) => s.trim());
    const sectionHeaders = sections
      .filter((s) => s.startsWith('【') || s.startsWith('#'))
      .map((s) => s.split('\n')[0]);
    expect(sectionHeaders).toMatchInlineSnapshot(`
      [
        "【开工前的开场白】",
        "【任务】",
        "【技术】",
        "【快速启动协议】",
        "【项目结构】",
        "【UI 最低视觉标准】",
        "【Codex 执行循环】",
        "【在线网站标准】",
        "【交付要求】",
        "【温暖体验契约】",
        "【完成态画面】",
        "【错误自救】",
        "【安全底线】",
        "【执行纪律】",
        "【反模式清单 — 以下行为禁止】",
        "【DoD / 停止 Vibe Coding】",
        "【收尾汇报模板】",
      ]
    `);
  });
});

describe('buildRecoveryPrompt', () => {
  it('asks Codex to fix a website app without desktop wording', () => {
    const prompt = buildRecoveryPrompt(makeState({ platform: 'web', tech: 'nextjs' }), 'zh');

    expect(prompt).toContain('这个网站应用没跑通');
    expect(prompt).toContain('npm run build');
    expect(prompt).not.toContain('这个桌面应用没跑通');
  });

  it('keeps context and asks Codex to continue fixing in Chinese', () => {
    const prompt = buildRecoveryPrompt(makeState({ complexity: 'starter' }), 'zh');

    expect(prompt).toContain('直接修复到能运行');
    expect(prompt).toContain('最小可用版');
    expect(prompt).toContain('给财务同事做一个本地对账工具');
    expect(prompt).toContain('重新运行');
  });

  it('keeps context and asks Codex to continue fixing in English', () => {
    const prompt = buildRecoveryPrompt(makeState({ platform: 'mac' }), 'en');

    expect(prompt).toContain('Fix it until it works');
    expect(prompt).toContain('macOS desktop app');
    expect(prompt).toContain('Re-run');
  });
});

describe('quickTemplates', () => {
  it('includes a desktop-to-web migration template using the website defaults', () => {
    const template = quickTemplates.find((item) => item.id === 'desktop-to-web');

    expect(template).toBeDefined();
    expect(template?.state).toMatchObject({
      platform: 'web',
      tech: 'nextjs',
      storage: 'browser',
    });
    expect(template?.state.extras).toMatchObject({
      onlinePublish: true,
      exportable: true,
    });
    expect(template?.titleZh).toContain('桌面工具改成网站应用');
    expect(template?.state.features).toContain('保留原有核心流程');
  });

  it('fills the 4-column desktop template grid with a balanced platform mix', () => {
    expect(quickTemplates.length % 4, 'template grid should fill 4-column rows').toBe(0);

    const websiteTemplates = quickTemplates.filter((item) => item.state.platform === 'web');
    const desktopTemplates = quickTemplates.filter((item) => item.state.platform !== 'web');
    expect(websiteTemplates.length).toBeGreaterThanOrEqual(4);
    expect(desktopTemplates.length).toBeGreaterThanOrEqual(4);

    for (let index = 0; index < quickTemplates.length; index += 4) {
      const row = quickTemplates.slice(index, index + 4);
      expect(
        row.some((item) => item.state.platform === 'web'),
        `row ${index / 4 + 1} should include a website template`,
      ).toBe(true);
      expect(
        row.some((item) => item.state.platform !== 'web'),
        `row ${index / 4 + 1} should include a desktop template`,
      ).toBe(true);
    }
  });
});
