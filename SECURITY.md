# Security Policy

## Supported Versions

This project currently supports security fixes on the latest state of the `main` branch.

## Reporting a Vulnerability

Please do not open a public issue for security reports, leaked secrets, or deployment credentials.

Instead, use one of these channels:

1. GitHub security advisory reporting for this repository, if available.
2. A private direct contact channel with the maintainer.

When reporting, include:

- a short summary of the issue
- affected files, routes, or workflows
- reproduction steps or proof of concept
- impact assessment
- any suggested remediation

## Secret Handling

- Never commit `.env*`, `.dev.vars*`, `secrets.json`, private keys, or cloud credentials.
- Use GitHub Actions secrets, Cloudflare dashboard secrets, or `wrangler secret put` for production secrets.
- Rotate exposed secrets immediately, then remove them from the repository history if they were ever committed.

## Project Security Baseline

- Branch protection on `main`
- Build validation in CI
- Dependency review on pull requests
- Production dependency audit in CI
- Secret scanning in CI
- CodeQL static analysis
- Dependabot updates for npm and GitHub Actions