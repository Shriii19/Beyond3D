import PromptDemo from "./PromptDemo.jsx";

const projects = [
  {
    id: "001",
    title: "Synthetic Architecture",
    desc: "AI-assisted 3D environment generation for immersive concept exploration using prompt-driven scene parameter control and procedural geometry.",
    tags: ["Generative AI", "R3F", "Procedural"],
    status: "prototype",
    statusLabel: "Prototype",
    aiRole: "Prompt-driven prototyping",
  },
  {
    id: "002",
    title: "Neural Canvas",
    desc: "Creative coding system for generating visual directions, design language, and atmospheric variations from structured prompts and scene intent.",
    tags: ["Creative AI", "Design Systems", "WebGL"],
    status: "experiment",
    statusLabel: "Experiment",
    aiRole: "Concept generation",
  },
  {
    id: "003",
    title: "Spatial Intelligence",
    desc: "Interactive system for translating abstract data and spatial cues into real-time experiences that balance UX clarity and cinematic depth.",
    tags: ["AI UX", "Data", "Three.js"],
    status: "research",
    statusLabel: "Research",
    aiRole: "Visual exploration",
  },
  {
    id: "004",
    title: "Impossible Objects",
    desc: "Procedural environments shaped from prompt constraints, material logic, and real-time GPU rendering for surreal interactive design exploration.",
    tags: ["Generative", "GPU", "AI + 3D"],
    status: "concept",
    statusLabel: "Concept",
    aiRole: "Code assistance",
  },
];

const techStack = [
  "Three.js",
  "React Three Fiber",
  "WebGL / GLSL",
  "WebGPU / WGSL",
  "Blender",
  "React",
  "Vite",
  "Postprocessing",
  "Generative AI",
  "LLM APIs",
  "Prompt engineering",
  "Procedural generation",
  "AI-assisted development",
  "Creative coding",
];

const aiPipeline = ["IDEA", "AI GENERATION", "STRUCTURED DATA", "CREATIVE PROCESSING", "3D EXPERIENCE", "FINAL WORLD"];

const workflowSteps = ["IDEA", "PROMPT", "AI EXPLORATION", "HUMAN DIRECTION", "CODE", "ITERATION", "OPTIMIZATION", "FINAL EXPERIENCE"];

const metrics = [
  { label: "AI ITERATIONS", value: "127" },
  { label: "SCENE COMPONENTS", value: "34" },
  { label: "PROMPT EXPERIMENTS", value: "86" },
  { label: "FPS TARGET", value: "60" },
  { label: "GENERATIVE VARIATIONS", value: "∞" },
];

const architectureNodes = [
  "USER",
  "AI INTERFACE",
  "AI / LLM LAYER",
  "STRUCTURED SCENE STATE",
  "SCENE CONTROLLER",
  "REACT THREE FIBER",
  "WEBGL / GPU",
  "IMMERSIVE EXPERIENCE",
];

export default function Overlay({ sceneState, onApplyPrompt, onTogglePalette }) {
  return (
    <>
      <section className="chapter hero" id="home">
        <div className="hero-kicker">
          <span className="hero-line" />
          <span>Digital Atelier</span>
        </div>
        <h1 className="hero-headline">
          <span className="hero-word">We craft</span>
          <span className="hero-word">worlds</span>
          <span className="hero-word accent">at lightspeed</span>
        </h1>
        <p className="hero-body">
          AI-assisted creative engineering for immersive 3D experiences, real-time interfaces, and generative product thinking.
        </p>
        <div className="hero-status-row">
          <span className="status-pill">AI SYSTEM / ONLINE</span>
          <span className="status-pill">GENERATIVE ENGINE / READY</span>
          <span className="status-pill">3D ENGINE / 60 FPS</span>
        </div>
      </section>

      <section className="chapter" id="about">
        <div className="eyebrow">01 — Philosophy</div>
        <h2 className="title">
          Built where <em>AI</em> meets creative engineering
        </h2>
        <p className="body-copy">
          We combine generative workflows, interactive systems, and product thinking to build immersive digital experiences that feel intelligent from the first interaction.
        </p>
        <div className="stat-row">
          <div className="stat">
            <span className="stat-num">AI</span>
            <span className="stat-label">assisted workflows</span>
          </div>
          <div className="stat">
            <span className="stat-num">3D</span>
            <span className="stat-label">immersive layers</span>
          </div>
          <div className="stat">
            <span className="stat-num">∞</span>
            <span className="stat-label">creative variations</span>
          </div>
        </div>
      </section>

      <section className="chapter wide" id="ai-lab">
        <div className="eyebrow">02 — AI Lab</div>
        <h2 className="title projects-title">
          <em>Built</em> with intelligence
        </h2>
        <p className="body-copy compact-copy">
          Generative AI, creative coding, and real-time 3D systems merge into a single design language: human curation, AI acceleration, technical discipline.
        </p>
        <div className="pipeline-block">
          {aiPipeline.map((step, index) => (
            <div className="pipeline-step" key={step}>
              <span className="pipeline-index">{String(index + 1).padStart(2, "0")}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="chapter prompt-section" id="prompt-demo">
        <div className="eyebrow">03 — Prompt to world</div>
        <h2 className="title">
          Describe a <em>world</em>
        </h2>
        <PromptDemo sceneState={sceneState} onApplyPrompt={onApplyPrompt} onTogglePalette={onTogglePalette} />
      </section>

      <section className="chapter wide" id="works">
        <div className="eyebrow">04 — Works</div>
        <h2 className="title projects-title">
          Selected <em>experiments</em>
        </h2>
        <div className="works-list">
          {projects.map((p) => (
            <div className="work-item" key={p.id}>
              <span className="work-num">/{p.id}</span>
              <div className="work-body">
                <div className="work-header">
                  <span className="work-title">{p.title}</span>
                  <span className={`status-badge ${p.status}`}>{p.statusLabel}</span>
                </div>
                <p className="work-desc">{p.desc}</p>
                <div className="card-tags">
                  {p.tags.map((t) => (
                    <span className="card-tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="ai-role-line">
                  <span className="ai-role-label">AI ROLE</span>
                  <span>{p.aiRole}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="chapter wide builder-section" id="workflow">
        <div className="eyebrow">05 — Built differently</div>
        <h2 className="title">
          Human direction, <em>AI acceleration</em>
        </h2>
        <div className="workflow-grid">
          {workflowSteps.map((step, index) => (
            <div className="workflow-step" key={step}>
              <span className="workflow-index">{String(index + 1).padStart(2, "0")}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
        <p className="body-copy compact-copy">
          AI was used as a collaborator for architecture exploration, prototyping, refactoring, prompt ideation, debugging assistance, and iterative design thinking. The developer still owns the final system decisions, quality, and production rigor.
        </p>
      </section>

      <section className="chapter wide metrics-section" id="metrics">
        <div className="eyebrow">06 — Metrics</div>
        <h2 className="title">
          Live project <em>signals</em>
        </h2>
        <div className="metrics-grid">
          {metrics.map((metric) => (
            <div className="metric-card" key={metric.label}>
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value">{metric.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="chapter wide architecture-section" id="architecture">
        <div className="eyebrow">07 — Architecture</div>
        <h2 className="title">
          Prompt to <em>render</em>
        </h2>
        <div className="architecture-grid">
          {architectureNodes.map((node, index) => (
            <div className="architecture-node" key={node}>
              <span>{index + 1}</span>
              <strong>{node}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="chapter right" id="stack">
        <div className="eyebrow">08 — Materials</div>
        <h2 className="title">
          The craft,<br /><em>distilled</em>
        </h2>
        <p className="body-copy">
          AI accelerates the ideation loop while the stack remains grounded in WebGL, real-time rendering, and product-grade engineering.
        </p>
        <div className="tech-grid">
          {techStack.map((t) => (
            <span className="tech-item" key={t}>{t}</span>
          ))}
        </div>
      </section>

      <section className="chapter center" id="contact">
        <div className="eyebrow">09 — Atelier</div>
        <h2 className="title">
          Commission something <em>intelligent</em>
        </h2>
        <p className="body-copy compact-copy">
          Interactive experiences, generative interfaces, and AI-powered digital worlds built for product impact.
        </p>
        <div className="cta-group">
          <a className="cta-btn" href="mailto:hello@insane3d.dev">
            Start a Project →
          </a>
          <a className="secondary-link" href="https://github.com" target="_blank" rel="noreferrer">
            View GitHub
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <span className="footer-brand">Digital Atelier</span>
          <span className="footer-subtitle">AI Creative Engineering</span>
        </div>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:hello@insane3d.dev">Email</a>
        </div>
        <div className="footer-copy">© 2026 Digital Atelier</div>
      </footer>
    </>
  );
}
