# Sandesh Bagmare — roadtrip portfolio

A static, interactive engineering portfolio with an original low-poly Three.js expedition truck and landscape.

## Run
`python -m http.server 4173` from this folder; open http://localhost:4173. No build, backend, API credentials, or analytics. Dependencies are vendored browser scripts/modules.

## Stack and features
- Three.js orthographic scene; GSAP and ScrollTrigger motion; Lenis as the sole smooth-scroll engine.
- Truck keyboard/button controls with hub-and-spoke wheels rotating in proportion to traveled distance, moving clouds, day/night, pause, destination navigation and static poster fallback.
- PTC experience, public engineering case studies, research DOI links, academic archive, education and profile-reported recognition.
- Four selected projects with category filters and expandable engineering notes, including CoinSwitch Scalping Lab and Astrology Evidence under Applied systems.
- Searchable learning drawer uses the 71 public-profile credential records in profile-data.json. Course completion is distinguished from professional certification where applicable.
- Mobile layout, visible keyboard focus, native accessible dialog and reduced-motion behavior.

Fonts use Google Fonts CSS (DM Sans and Space Grotesk), with local system fallbacks; they are not self-hosted. Asset sources and dependency licenses are in assets/.

## Evidence limits
Employer contributions, education, awards and credential entries are profile-reported. Patent details are listed as profile-reported, not registry-verified. Publications link to co-authored work with DOI metadata. Public projects link directly to source. ConflTechWriter is a prototype, not a production or guaranteed fact-checking claim. AgenticQ credits the upstream wshobson/agents marketplace.

CoinSwitch Scalping Lab links to its public reading guide; full source remains private. Its React/FastAPI/SQLite app supports replay and read-only-feed PAPER research, with deterministic risk and optional AI outside trade authority. Simulated fills and fees do not demonstrate profit or certify live-account readiness. Astrology Evidence links to its public guide and source: a working local FastAPI/PostgreSQL/Qdrant application with a server-rendered UI and synthetic data. Source rights, chart validation, provider review, expert evaluation and operating gates remain open before real users. Citations do not establish predictive validity. These public guides are documentation, not hosted applications. Their application test suites were not rerun for this portfolio update.

## Verification and deployment
`node --check script.js`; browser QA covers desktop/mobile, filter state, credential search/dialog, reduced motion, pause, night mode and WebGL fallback. Publish the site files only via GitHub Pages (main, root). Do not publish local QA screenshots or research. All project-site paths are relative; canonical/social metadata use the absolute deployed URL.
