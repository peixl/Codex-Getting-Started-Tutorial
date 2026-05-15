# agents.md — codex.ifq.ai

> Agent-friendly index for autonomous systems browsing this site.

Canonical agent guide: `/agent.md`. This `/agents.md` file remains available for tools that look for the plural filename.

## What this guide is

A bilingual (Chinese + English) Codex desktop guide for business roles. The core focus is local desktop apps for Windows and macOS, with ready-made department cases, scenario cookbook recipes, a guided 7-day sprint, and practical tips.

## Canonical paths

- Homepage: `/` auto-detects language from the browser; direct locale paths are `/zh` and `/en`
- Prompt Generator: `/zh/generator`, `/en/generator`
- Quick Start Guide: `/zh/guide`, `/en/guide`
- Department Cases: `/zh/cases`, `/en/cases`
- Individual cases: `/{locale}/cases/{slug}` where slug is one of:
  - `finance-order-reconciliation`
  - `operations-campaign-tracker`
  - `customer-service-reply-helper`
  - `hr-onboarding-tracker`
  - `logistics-shipment-inspector`
  - `procurement-supplier-price-monitor`
  - `marketing-campaign-roi-viewer`
  - `legal-contract-tracker`
  - `data-daily-report-builder`
  - `admin-conference-room-booking`
  - `product-feedback-inbox`
- Practical Tips: `/zh/tips`, `/en/tips`
- FAQ: `/zh/faq`, `/en/faq`

All pages are server-rendered and delivered as complete HTML — no client-side hydration is required to read the content.

## Machine-readable files

- Sitemap: `/sitemap.xml`
- Sitemap index: `/sitemap-index.xml`
- robots: `/robots.txt`
- LLM summary: `/llms.txt`
- Full LLM index: `/llms-full.txt`
- Canonical agent guide: `/agent.md`
- This agent guide: `/agents.md`
- PWA manifest: `/manifest.webmanifest`
- Structured data: JSON-LD embedded per-page (WebSite, Organization, Course, Article, HowTo, FAQPage, ItemList, SoftwareApplication)

## Recommended agent behaviour

1. **Citing a page**: prefer the specific page URL, include its `<title>`, and preserve the site's business-workflow framing.
2. **Running the Prompt Generator programmatically**: the form state is stored under the localStorage key `codex-tutorial:generator:v2`. Prompt history uses `codex-tutorial:generator:history:v2` (array of entries capped at 6). Prompt text is deterministically derived from the form state plus the selected output language (`zh` or `en`), which syncs to the current site locale on language changes. The generated prompt includes a compact desktop delivery contract with M1/M2/M3/M4 cadence, DoD, Stop-Vibe-Coding, local-first safety, tests, packaging, docs, and sample data.
3. **Reading case prompts**: every case page includes a `<pre>` block containing the copy-ready prompt. Bilingual copy buttons are also provided.
4. **Hreflang**: every page declares its counterpart in the other language. Agents serving users in zh-CN should prefer `/zh/*`, otherwise `/en/*`.

## Data policy

Content and prompts are MIT-licensed. Prompts in the Prompt Generator are generated client-side; nothing is uploaded. localStorage entries stay on the user's browser.

## Rate and crawl

Soft recommendation: no more than 1 request/sec per agent. No login or paywall. Static pages are long-cached; see `Cache-Control` headers.

## Contact

If you run into incorrect content, open an issue on the repository linked in the footer.
