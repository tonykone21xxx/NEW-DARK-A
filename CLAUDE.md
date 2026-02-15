# CLAUDE.md — AutoPilot AI

## Project Overview

AutoPilot AI is a React + TypeScript SPA for French driving schools ("auto-écoles"). It provides AI-powered secretarial automation, scheduling, and pedagogical tracking. The frontend uses Vite, Tailwind CSS, and integrates with the Google Gemini API.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Bundler:** Vite 5
- **Styling:** Tailwind CSS 3 + PostCSS + Autoprefixer
- **AI Integration:** @google/genai (Gemini API)
- **Target:** ES2020, DOM

## Prerequisites (macOS 11.6.5 Big Sur)

macOS 11.6.5 (Big Sur) has specific compatibility constraints. Use the following versions:

- **Node.js:** v18.x LTS (v18.20.x recommended — last LTS line with full Big Sur support). Do **not** use Node 20+ as it requires macOS 12+.
- **npm:** Ships with Node 18. Use npm 9.x or 10.x.
- **Xcode Command Line Tools:** Install via `xcode-select --install` (required for native module compilation).
- **Homebrew:** Use the Big Sur-compatible version. Run `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` if not already installed. Some recent formulae may require source builds on Big Sur.

### Installing Node 18 on Big Sur

```bash
# Option A: via Homebrew
brew install node@18
brew link --overwrite node@18

# Option B: via nvm (recommended for version management)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 18
nvm use 18
```

## Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── App.tsx                  # Root component with client-side routing (view state)
├── index.tsx                # React entry point
├── index.html               # HTML shell
├── index.css                # Global styles / Tailwind directives
├── types.ts                 # Shared TypeScript types
├── components/              # All UI components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── PainPoints.tsx
│   ├── DynamicLogiciels.tsx
│   ├── LiveVoiceAgent.tsx
│   ├── ChatTutor.tsx
│   ├── VoiceDemo.tsx
│   ├── WhatsAppDemo.tsx
│   ├── Testimonials.tsx
│   ├── BookingForm.tsx
│   ├── ROICalculator.tsx
│   ├── GroundingFAQ.tsx
│   ├── VerticalBenefits.tsx
│   ├── VideoBenefitExplainer.tsx
│   ├── VoiceJoin.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   ├── Agents.tsx
│   ├── MentionsLegales.tsx
│   ├── PrivacyPolicy.tsx
│   └── Terms.tsx
├── services/
│   └── gemini.ts            # Gemini AI API service
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── tsconfig.node.json
```

## Environment Variables

- `API_KEY` — Google Gemini API key. Injected at build time via Vite's `define` config (see `vite.config.ts`). Set it in a `.env` file at the project root or as a system environment variable.

## Architecture Notes

- **Routing:** Client-side view switching via React state (`useState` in `App.tsx`), not a router library. Views: `home`, `mentions`, `privacy`, `terms`, `roi`.
- **Styling:** Tailwind utility classes throughout. Dark theme by default.
- **AI Features:** Voice agent, chat tutor, WhatsApp demo, and FAQ grounding all connect through `services/gemini.ts`.
- **Microphone access:** The app requests microphone permissions (see `metadata.json`).

## macOS 11.6.5 Known Issues

- **OpenSSL:** Node 18 uses OpenSSL 3. If you encounter TLS/SSL errors, ensure OpenSSL is up to date via Homebrew: `brew install openssl@3`.
- **fsevents:** Vite's file watcher depends on `fsevents`. This native module should compile fine on Big Sur with Xcode CLT installed. If it fails, run `xcode-select --install` and retry `npm install`.
- **Puppeteer / Chromium:** If any tooling pulls Chromium, the latest versions may not support Big Sur. Pin to Chromium 120 or earlier if needed.
- **Rosetta 2 (Apple Silicon):** If running on an M1 Mac with Big Sur, ensure Rosetta 2 is installed: `softwareupdate --install-rosetta`. Use the arm64 Node binary for best performance.

## Code Conventions

- TypeScript strict mode enabled
- Functional components with React.FC typing
- No unused-locals or unused-parameters enforcement (disabled in tsconfig)
- Component files are PascalCase `.tsx`
- Service files are camelCase `.ts`
