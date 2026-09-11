# Digital Atelier — AI Creative Engineering Portfolio

A cinematic immersive portfolio built with React, Vite, Three.js, and React Three Fiber. The project presents a creative-studio identity designed to communicate AI-assisted development, generative thinking, immersive 3D experiences, and product-minded frontend engineering.

## Overview

This portfolio is not a generic SaaS landing page. It is a dark luxury interactive storytelling experience that combines:

- immersive 3D background rendering
- scroll-driven narrative sections
- AI prompt-to-scene demo
- command palette interactions
- scene-state transformations driven by structured prompt parsing
- polished editorial design and premium motion language

The experience visualizes how human direction, AI experimentation, and engineering craftsmanship work together.

## AI Features

The site includes a lightweight AI interaction layer designed to feel authentic and extensible without pretending to use a real production-grade model in the frontend.

### Current implementation

- prompt-based scene generation using local structured parsing
- AI command interpretation via a command palette
- scene state mapping from prompt text into visual traits like mood, lighting, environment, density, and accent color
- modular architecture ready for integration with a real LLM API or backend endpoint later

### Example commands

- Make the scene more futuristic
- Reduce particles
- Turn the environment into a desert
- Make the lighting warmer
- Show me something experimental

## Architecture

The project keeps a working architecture centered on:

- React for UI composition
- React Three Fiber for the live 3D scene
- Three.js for rendering and scene primitives
- custom scene-state logic for AI-driven environment changes
- component-based storytelling for the landing-page narrative

### Key files

- `src/App.jsx` — app shell, HUD, scroll progress, scene state management, command palette integration
- `src/components/Overlay.jsx` — immersive story sections, project showcase, AI narrative content
- `src/components/PromptDemo.jsx` — prompt-to-scene interface
- `src/components/CommandPalette.jsx` — keyboard-driven AI command popup
- `src/services/ai/aiClient.js` — local prompt and command parsing logic
- `src/scene/Experience.jsx` — camera rig, scene lighting, scene-state-driven rendering tweaks
- `src/scene/Objects.jsx` — core, particles, gates, shards
- `src/index.css` — premium dark editorial styling and responsive layout

## AI Development Workflow

AI was used as a collaborator for:

- creative direction exploration
- prompt-based visual ideation
- scene parameter generation
- rapid iteration on interface language
- debugging and refactoring support
- performance-conscious optimization ideas

The human developer remains responsible for architecture, quality, technical decisions, and final integration.

## Running locally

```bash
npm install
npm run dev
npm run build
```

## Environment variables

This project does not require a frontend API key by default. The local prompt engine is deliberately decoupled from any provider-specific implementation so it can later connect to a backend or provider like OpenAI, Anthropic, or Gemini without forcing UI rewrites.

If you add a real AI provider later, keep keys in a secure server-side or environment-managed layer and avoid exposing secrets in the browser.

## Performance

The site includes:

- capped device-pixel ratio
- mobile-aware particle reductions
- reduced motion awareness support
- efficient scene composition with reusable objects
- constrained postprocessing stack

## Future improvements

- real LLM API integration through a secure backend
- multimodal prompt input with image-based references
- persistent creative profile state across sessions
- voice-driven scene creation
- more advanced WebGPU compute visualizations
- richer generative content experiments

## Important note

This project intentionally distinguishes between:

- demo AI behavior
- prototype AI systems
- future real provider integration

It presents AI honestly as a creative and engineering accelerator rather than as a fake or exaggerated claim.
