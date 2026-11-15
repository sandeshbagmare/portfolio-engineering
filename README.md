# Sandesh Bagmare — engineering portfolio

A static portfolio covering agent infrastructure, Python backends, developer tools and published research.

## Run locally

Run `python -m http.server 4173` in this folder, then open http://localhost:4173.

No dependencies, build step, credentials, analytics or backend are required.

## Content

- Four public engineering projects, with source links and implementation trade-offs.
- An illustrative privacy-gateway walkthrough using synthetic examples, not a live agent.
- PTC experience timeline and two publication DOI links.
- Keyboard-accessible controls, reduced-motion support and responsive layouts.

Project descriptions are based on the linked repositories. Benchmark results are not independently reproduced here; SQL saver measurements described in its README use local SQL Server 2022, not an Azure-hosted database.

AgenticQ uses the upstream wshobson/agents marketplace; credit remains with its authors. Publication links identify co-authored work.

## Verification

JavaScript syntax checked with `node --check script.js`. Browser checks cover filters, walkthrough state, 390px mobile overflow, encoding, console errors and desktop/mobile screenshots.

## Deployment

GitHub Pages: main branch, repository root. All assets use relative paths for project-site compatibility.
