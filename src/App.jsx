import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Experience from "./scene/Experience.jsx";
import Overlay from "./components/Overlay.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import { defaultSceneState, parseCommand } from "./services/ai/aiClient.js";

function ProgressReporter({ fillRef, scrollProgressRef }) {
  useFrame(() => {
    const progress = Math.min(Math.max(scrollProgressRef.current ?? 0, 0), 1);

    if (fillRef?.current) {
      fillRef.current.style.height = `${Math.max(progress * 100, 8)}%`;
    }
  });

  return null;
}

export default function App() {
  const fillRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const [sceneState, setSceneState] = useState(defaultSceneState);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleContextMenu = (event) => {
      if (event.target.tagName === "CANVAS") {
        event.preventDefault();
      }
    };

    const handlePointerMove = (event) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };

    const handleKeyboardShortcuts = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
      if (event.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      scrollProgressRef.current = Math.min(Math.max(nextProgress, 0), 1);
    };

    handleScroll();
    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("keydown", handleKeyboardShortcuts);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyboardShortcuts);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleCommandExecute = (command) => {
    const nextState = parseCommand(command, sceneState);
    setSceneState(nextState);
    setCommandPaletteOpen(false);
  };

  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />

      <div className="canvas-wrap">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 55 }}
          dpr={[1, Math.min(window.devicePixelRatio, 2)]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
            stencil: false,
            depth: true,
          }}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <Experience sceneState={sceneState} scrollProgressRef={scrollProgressRef} />
            <ProgressReporter fillRef={fillRef} scrollProgressRef={scrollProgressRef} />
          </Suspense>
        </Canvas>
      </div>

      <div className="scroll-overlay">
        <Overlay sceneState={sceneState} onApplyPrompt={setSceneState} onTogglePalette={() => setCommandPaletteOpen((value) => !value)} />
      </div>

      <div className="hud">
        <div className="brand" role="banner" aria-label="Insane 3D">
          <span className="brand-name">INSANE</span>
          <span className="brand-accent">3D</span>
        </div>
        <nav className="hud-nav" aria-label="Main navigation">
          <a href="#works" aria-label="View our works">Work</a>
          <a href="#about" aria-label="Learn about us">About</a>
          <a href="#ai-lab" aria-label="Explore the AI lab">AI Lab</a>
          <a href="#contact" aria-label="Get in touch">Contact</a>
        </nav>
        <div className="scroll-cue">
          <span>scroll</span>
          <span className="line" />
        </div>
      </div>

      <div className="progress-rail" aria-hidden="true">
        <div className="fill" ref={fillRef} />
      </div>

      <CommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onExecute={handleCommandExecute}
        currentTheme={sceneState.environment}
      />
    </>
  );
}
