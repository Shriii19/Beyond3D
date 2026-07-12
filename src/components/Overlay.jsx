const projects = [
  {
    id: "001",
    title: "Nexus Core",
    desc: "Immersive WebGL exploration of procedural geometry and iridescent GPU shading.",
    tags: ["Three.js", "GLSL", "R3F"],
    status: "upcoming",
    statusLabel: "Upcoming",
  },
  {
    id: "002",
    title: "Void Sculpt",
    desc: "Real-time 3D sculpting tool built entirely on GPU compute pipelines in the browser.",
    tags: ["WebGPU", "WGSL", "React"],
    status: "in-dev",
    statusLabel: "In Dev",
  },
  {
    id: "003",
    title: "Luminance",
    desc: "Physically-based rendering experiments pushing the limits of browser graphics.",
    tags: ["R3F", "Post FX", "GLSL"],
    status: "upcoming",
    statusLabel: "Upcoming",
  },
  {
    id: "004",
    title: "Terrain OS",
    desc: "Open-source procedural terrain engine with real-time hydraulic erosion simulation.",
    tags: ["Three.js", "Simplex Noise"],
    status: "upcoming",
    statusLabel: "Upcoming",
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
  "Simplex Noise",
  "Node.js",
];

export default function Overlay() {
  return (
    <>
      {/* ── 01  HERO ─────────────────────────────────── */}
      <section className="chapter center">
        <div className="eyebrow">INSANE 3D — Creative Studio</div>
        <h1 className="title hero-title">
          We build <em>impossible</em>
          <br />things in real-time
        </h1>
        <p className="body-copy">
          A creative studio pushing the boundaries of interactive 3D on the web.
          <br />Every project is a living world — not just a website.
        </p>
      </section>

      {/* ── 02  ABOUT ────────────────────────────────── */}
      <section className="chapter">
        <div className="eyebrow">01 — About</div>
        <h2 className="title">
          Born at the edge of
          <br />what browsers <em>can render</em>
        </h2>
        <p className="body-copy">
          We craft WebGL &amp; WebGPU experiences that feel more like living worlds
          than websites. Every triangle is intentional. Every shader tells a story.
        </p>
        <div className="stat-row">
          <div className="stat">
            <span className="stat-num">4+</span>
            <span className="stat-label">Projects in pipeline</span>
          </div>
          <div className="stat">
            <span className="stat-num">60</span>
            <span className="stat-label">FPS target, always</span>
          </div>
          <div className="stat">
            <span className="stat-num">∞</span>
            <span className="stat-label">Ideas left to build</span>
          </div>
        </div>
      </section>

      {/* ── 03  PROJECTS ─────────────────────────────── */}
      <section className="chapter wide">
        <div className="eyebrow">02 — Projects</div>
        <h2 className="title projects-title">
          What we're <em>building</em>
        </h2>
        <div className="project-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.id}>
              <div className="card-header">
                <span className="card-id">/{p.id}</span>
                <span className={`status-badge ${p.status}`}>{p.statusLabel}</span>
              </div>
              <div className="card-title">{p.title}</div>
              <p className="card-desc">{p.desc}</p>
              <div className="card-tags">
                {p.tags.map((t) => (
                  <span className="card-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 04  TECH STACK ───────────────────────────── */}
      <section className="chapter right">
        <div className="eyebrow">03 — Technology</div>
        <h2 className="title">
          Tools forged
          <br />for the <em>task</em>
        </h2>
        <p className="body-copy">
          We live in the GPU. Every tool we choose is built to squeeze maximum
          visual fidelity out of real-time rendering.
        </p>
        <div className="tech-grid">
          {techStack.map((t) => (
            <span className="tech-item" key={t}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── 05  CONTACT ──────────────────────────────── */}
      <section className="chapter center">
        <div className="eyebrow">04 — Connect</div>
        <h2 className="title">
          Let's build something
          <br />you've <em>never seen</em> before
        </h2>
        <p className="body-copy">
          We're always open to new projects, collabs, and wild ideas.
          <br />If it pushes the limits of the web, we want to hear it.
        </p>
        <div className="cta-group">
          <a className="cta-btn" href="mailto:hello@insane3d.dev">
            Get in Touch →
          </a>
          <span className="cta-email">hello@insane3d.dev</span>
        </div>
      </section>
    </>
  );
}
