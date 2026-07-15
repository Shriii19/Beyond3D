import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll } from "@react-three/drei";
import Experience from "./scene/Experience.jsx";

// Updates the progress rail by writing to the DOM directly (no per-frame React state)
function ProgressReporter({ fillRef }) {
  const scroll = useScroll();
  useFrame(() => {
    if (fillRef.current) fillRef.current.style.height = `${scroll.offset * 100}%`;
  });
  return null;
}

export default function App() {
  const fillRef = useRef(null);

  return (
    <>
      <div className="canvas-wrap">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <ScrollControls pages={5} damping={0.28}>
              <Experience />
              <ProgressReporter fillRef={fillRef} />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>

      <div className="hud">
        <div className="brand" role="banner">
          <span className="brand-name">INSANE</span>
          <span className="brand-accent">3D</span>
        </div>
        <nav className="hud-nav" aria-label="Main navigation">
          <a href="#works" aria-label="View our works">Work</a>
          <a href="#about" aria-label="Learn about us">About</a>
          <a href="#contact" aria-label="Get in touch">Contact</a>
        </nav>
        <div className="scroll-cue">
          <span>scroll</span>
          <span className="line" />
        </div>
      </div>

      <div className="progress-rail">
        <div className="fill" ref={fillRef} />
      </div>
    </>
  );
}
