import { useState } from "react";
import { generateSceneFromPrompt } from "../services/ai/aiClient.js";

const examplePrompts = [
  "A futuristic gallery floating above a dark ocean.",
  "A warm desert archive lit by amber neon.",
  "A calm forest observatory under a quiet moon.",
];

export default function PromptDemo({ sceneState, onApplyPrompt, onTogglePalette }) {
  const [prompt, setPrompt] = useState(examplePrompts[0]);
  const [generated, setGenerated] = useState(generateSceneFromPrompt(examplePrompts[0], sceneState));

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = generateSceneFromPrompt(prompt, sceneState);
    setGenerated(next);
    onApplyPrompt(next);
  };

  return (
    <div className="prompt-demo">
      <div className="prompt-demo-shell">
        <div className="prompt-demo-header">
          <span className="eyebrow mini">AI SCENE SYSTEM</span>
          <button type="button" className="ghost-btn" onClick={onTogglePalette}>
            OPEN COMMANDS
          </button>
        </div>

        <form onSubmit={handleSubmit} className="prompt-form">
          <label htmlFor="prompt-input" className="sr-only">Describe a world</label>
          <input
            id="prompt-input"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Describe something you want to see…"
          />
          <button type="submit" className="cta-btn prompt-submit">GENERATE</button>
        </form>

        <div className="prompt-example-row">
          {examplePrompts.map((example) => (
            <button
              key={example}
              type="button"
              className="prompt-chip"
              onClick={() => setPrompt(example)}
            >
              {example}
            </button>
          ))}
        </div>

        <div className="prompt-pipeline">
          <div className="pipeline-node">USER PROMPT</div>
          <div className="pipeline-arrow">↓</div>
          <div className="pipeline-node">AI INTERPRETATION</div>
          <div className="pipeline-arrow">↓</div>
          <div className="pipeline-node">SCENE PARAMETERS</div>
          <div className="pipeline-arrow">↓</div>
          <div className="pipeline-node">VISUAL WORLD</div>
        </div>

        <div className="prompt-state-grid">
          <div>
            <span className="state-label">MOOD</span>
            <strong>{generated.mood}</strong>
          </div>
          <div>
            <span className="state-label">ENVIRONMENT</span>
            <strong>{generated.environment}</strong>
          </div>
          <div>
            <span className="state-label">LIGHT</span>
            <strong>{generated.lighting}</strong>
          </div>
          <div>
            <span className="state-label">PARTICLES</span>
            <strong>{generated.particleLevel}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
