const projects = [
  {
    id: "001",
    title: "Nexus Core",
    desc: "An immersive WebGL journey through procedural geometry with custom iridescent GPU shading — precision forged in every vertex.",
    tags: ["Three.js", "GLSL", "R3F"],
    status: "upcoming",
    statusLabel: "Forthcoming",
  },
  {
    id: "002",
    title: "Void Sculpt",
    desc: "A real-time 3D sculpting instrument built entirely on GPU compute pipelines, running entirely in the browser.",
    tags: ["WebGPU", "WGSL", "React"],
    status: "in-dev",
    statusLabel: "In Progress",
  },
  {
    id: "003",
    title: "Luminance",
    desc: "Physically-based rendering at the frontier of browser graphics — where light behaves as it does in the material world.",
    tags: ["R3F", "Post FX", "GLSL"],
    status: "upcoming",
    statusLabel: "Forthcoming",
  },
  {
    id: "004",
    title: "Terrain OS",
    desc: "An open-source procedural terrain engine with real-time hydraulic erosion — landscapes composed from pure mathematics.",
    tags: ["Three.js", "Simplex Noise"],
    status: "upcoming",
    statusLabel: "Forthcoming",
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
        <div className="eyebrow">INSANE 3D — Digital Atelier</div>
        <h1 className="title hero-title">
          We craft worlds<br />at the speed of <em>light</em>
        </h1>
        <p className="body-copy">
          A creative studio building browser-native experiences<br />
          with the precision of fine craft and the soul of art.
        </p>
      </section>

      {/* ── 02  ABOUT ────────────────────────────────── */}
      <section className="chapter">
        <div className="eyebrow">01 — Philosophy</div>
        <h2 className="title">
          Born where precision<br />meets the <em>impossible</em>
        </h2>
        <p className="body-copy">
          We work at the intersection of GPU artistry and editorial restraint.
          Every triangle is deliberate. Every shader, composed.
        </p>
        <div className="stat-row">
          <div className="stat">
            <span className="stat-num">4+</span>
            <span className="stat-label">Works in pipeline</span>
          </div>
          <div className="stat">
            <span className="stat-num">60</span>
            <span className="stat-label">FPS, always</span>
          </div>
          <div className="stat">
            <span className="stat-num">∞</span>
            <span className="stat-label">Ideas left to render</span>
          </div>
        </div>
      </section>

      {/* ── 03  WORKS ────────────────────────────────── */}
      <section className="chapter wide">
        <div className="eyebrow">02 — Works</div>
        <h2 className="title projects-title">
          Selected <em>works</em>
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 04  TECH STACK ───────────────────────────── */}
      <section className="chapter right">
        <div className="eyebrow">03 — Materials</div>
        <h2 className="title">
          The craft,<br /><em>distilled</em>
        </h2>
        <p className="body-copy">
          We live in the GPU. Each instrument chosen for maximum visual
          fidelity at real-time speeds.
        </p>
        <div className="tech-grid">
          {techStack.map((t) => (
            <span className="tech-item" key={t}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── 05  CONTACT ──────────────────────────────── */}
      <section className="chapter center">
        <div className="eyebrow">04 — Atelier</div>
        <h2 className="title">
          Commission something<br />you've <em>never seen</em>
        </h2>
        <p className="body-copy">
          We take on projects where craft is non-negotiable<br />
          and ambition has no ceiling.
        </p>
        <div className="cta-group">
          <a className="cta-btn" href="mailto:hello@insane3d.dev">
            Begin a Conversation →
          </a>
          <span className="cta-email">hello@insane3d.dev</span>
        </div>
      </section>
    </>
  );
}
