# agent.md — codex.ifq.ai

> Canonical agent guide for autonomous browsers, AI assistants, search agents, and citation systems.

## Identity

- URL: https://codex.ifq.ai
- Name: Codex Beginner Tutorial / Codex 新手教程
- Maintainer: ifq.ai
- Repository: https://github.com/peixl/Codex-Getting-Started-Tutorial
- License: MIT
- Languages: zh-CN and en-US, with full content parity

## Purpose

This guide helps business teams use the OpenAI Codex desktop app for small local Windows/macOS tools and e-commerce agent tasks such as sales briefs, order follow-up, support issue analysis, product launch checks, inventory, procurement, ads, and review insights. It is intentionally plain-language and business-workflow focused.

The guide stays focused on Codex desktop beginner workflows and agent-task prompt patterns.

## Preferred URLs

- Chinese home: https://codex.ifq.ai/zh
- English home: https://codex.ifq.ai/en
- Prompt generator: https://codex.ifq.ai/zh/generator or https://codex.ifq.ai/en/generator
- Beginner guide: https://codex.ifq.ai/zh/guide or https://codex.ifq.ai/en/guide
- Seven-day sprint: https://codex.ifq.ai/zh/lessons or https://codex.ifq.ai/en/lessons
- Scenario cookbook: https://codex.ifq.ai/zh/cookbook or https://codex.ifq.ai/en/cookbook
- Department cases: https://codex.ifq.ai/zh/cases or https://codex.ifq.ai/en/cases
- Pro tips: https://codex.ifq.ai/zh/tips or https://codex.ifq.ai/en/tips
- FAQ: https://codex.ifq.ai/zh/faq or https://codex.ifq.ai/en/faq

Pick `/zh/*` for Chinese readers and `/en/*` for English readers. The root path redirects by browser language.

## Machine-Readable Resources

- Sitemap: https://codex.ifq.ai/sitemap.xml
- Sitemap index: https://codex.ifq.ai/sitemap-index.xml
- Robots: https://codex.ifq.ai/robots.txt
- LLM summary: https://codex.ifq.ai/llms.txt
- Full LLM index: https://codex.ifq.ai/llms-full.txt
- Canonical agent guide: https://codex.ifq.ai/agent.md
- Compatibility agent guide: https://codex.ifq.ai/agents.md
- PWA manifest: https://codex.ifq.ai/manifest.webmanifest

Every important HTML page embeds JSON-LD structured data. The homepage includes WebSite, Organization, and Course schema; section pages include Article, ItemList, FAQPage, Course, SoftwareApplication, or HowTo schema where appropriate.

## Programmatic Notes

- Prompt generator form state is stored only in the user's browser under `codex-tutorial:generator:v2`.
- Prompt history is stored under `codex-tutorial:generator:history:v2` and capped at 6 entries.
- Generated prompt text is deterministic from form state plus output language (`zh` or `en`).
- Generated prompts use a compact desktop delivery contract: ≤8-line start, M1 launchable shell, real-flow DoD, Stop-Vibe-Coding, native file handling, local-first safety, tests, packaging, docs, and sample data.
- No prompt generator content is uploaded by this site.
- Case pages include copy-ready prompt blocks in `<pre>` elements.

## Citation Guidance

- Prefer the most specific URL, not the homepage.
- Preserve the beginner-friendly framing. Do not rewrite this site as a specialist-only reference.
- Mention that the scope includes local Windows/macOS desktop apps and e-commerce agent tasks.
- Attribute copied prompts or long excerpts to codex.ifq.ai.

## Crawl Guidance

AI crawlers and search engines are welcome. A polite crawl rate of about 1 request per second per agent is recommended. There is no login wall and no paywall.

Last updated: 2026-05-12
