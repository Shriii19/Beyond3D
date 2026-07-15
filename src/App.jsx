import { Suspense, useRef, useEffect } from "react";
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

// Simple loading fallback
function LoadingFallback() {
  return <div className="loader">Loading Experience...</div>;
}

export default function App() {
  const fillRef = useRef(null);

  // Cleanup and performance hints
  useEffect(() => {
    // Prevent right-click context menu on canvas for better UX
    const handleContextMenu = (e) => {
      if (e.target.tagName === 'CANVAS') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <>
      <div className="canvas-wrap">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, Math.min(window.devicePixelRatio, 2)]}
          gl={{ 
            antialias: true, 
            powerPreference: "high-performance",
            alpha: false,
            stencil: false,
            depth: true
          }}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={<LoadingFallback />}>
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
