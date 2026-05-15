# Codex Business Guide

[简体中文](README.zh-CN.md)

A concise OpenAI Codex Desktop guide for business experts who want useful local tools for Windows and macOS, and want to use Codex as an agent for practical tasks.

Live site: **https://codex.ifq.ai**

## Overview

This project is not an API reference and not a flashy demo.

It is built around one practical goal:

> turn business expertise into a real local desktop app.

The site guides users through a simple path:

1. Understand what Codex Desktop can do.
2. Generate a stronger prompt with a fill-in-the-blank form.
3. Paste that prompt into Codex and let it build step by step.
4. Learn from department cases, agent task cases, recipes, and FAQ.

Typical scenarios include finance reconciliation, platform bills, daily reporting, support helpers, HR onboarding, logistics follow-up, carrier scorecards, procurement quoting, packaging demand, marketing recap, live run sheets, legal tracking, admin records, product feedback triage, sales briefs, order exceptions, support issue analysis, product launch checks, replenishment, supplier quote comparison, competitor pricing, member segmentation, coupon risk, live recaps, category reviews, and review insights.

## UX Goals

- Auto-detect browser language and enter `/zh` or `/en` on first visit.
- Remember explicit user language choice instead of resetting it later.
- Keep prompt output aligned with the current site language.
- Support deep links without locale prefixes such as `/guide` or `/faq`.
- Keep the core app-building path focused on local desktop apps, while showing safe agent-task patterns for broader Codex work.
- Explain everything in business language before technical language.

## Main Sections

### Prompt Generator

- Produces a ready-to-copy Codex prompt from a lightweight form.
- Includes quick templates, browser-local history, and prompt language switching.

### Quick Start

- Explains Codex from first launch to packaging and sharing, keeping only the steps that matter.

### 7-Day Learning Path

- Breaks the learning curve into short daily tasks.

### Department Cases

- Covers realistic workflows across finance, operations, support, HR, logistics, procurement, marketing, legal, data, admin, and product teams.

### Agent Task Cases

- Shows copy-ready prompts for using Codex as an agent on e-commerce operations: sales briefs, order follow-up, support analysis, product launch checks, inventory, procurement, ads, competitor pricing, member segmentation, coupon risk, live recaps, category reviews, and review insights.

### Cookbook, Practical Tips, FAQ

- Adds copy-ready scenarios for order merging, product image packaging, shipment exceptions, product labels, marketplace bill checks, campaign calendars, support macros, creator samples, competitor pricing, live timers, listing audits, and inventory transfer planning.

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Useful checks during local testing:

1. The root path redirects according to browser language.
2. Manual language switching is remembered.
3. Bare routes such as `/guide` redirect to a locale-prefixed route.
4. The generator can produce a usable prompt with only goal + features filled in.

## Project Structure

```text
src/app/[locale]        localized pages
src/components          shared UI, home modules, generator, cases
src/data                cases and prompt template data
src/i18n                locale config and dictionaries
public                  public assets, manifest, llms.txt, agents.md
```

## Deploy

```bash
npm run deploy
```

The site uses Next.js App Router and deploys to Cloudflare Workers via `@opennextjs/cloudflare`.

If you deploy from the Cloudflare dashboard, use `npm run build` as the Build command. The deploy step can stay on `npx wrangler deploy`, because the build now generates the required `.open-next` artifacts first.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 3.4
- Cloudflare Workers
- Path-based i18n routing (`/zh/*`, `/en/*`)

## Who This Is For

- Teams helping business roles adopt Codex.
- Builders creating bilingual prompt-learning experiences.
- Developers looking for a business-user-focused Next.js content site reference.

## License

MIT License
