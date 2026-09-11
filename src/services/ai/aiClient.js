export const defaultSceneState = {
  mood: "cinematic",
  environment: "ocean",
  architecture: "futuristic",
  lighting: "neon",
  density: 0.72,
  particleLevel: 0.8,
  atmosphere: "deep",
  energy: 1,
  accent: "#d7b576",
};

const environmentMap = {
  ocean: { environment: "ocean", architecture: "futuristic", lighting: "neon", mood: "cinematic", atmosphere: "deep", accent: "#8ec5ff" },
  desert: { environment: "desert", architecture: "minimal", lighting: "warm", mood: "serene", atmosphere: "dry", accent: "#f5b76c" },
  forest: { environment: "forest", architecture: "organic", lighting: "golden", mood: "calm", atmosphere: "lush", accent: "#9fe7a4" },
  city: { environment: "city", architecture: "architectural", lighting: "neon", mood: "electric", atmosphere: "urban", accent: "#b28ef6" },
  gallery: { environment: "gallery", architecture: "museum", lighting: "soft", mood: "refined", atmosphere: "quiet", accent: "#d7b576" },
  space: { environment: "space", architecture: "experimental", lighting: "neon", mood: "cosmic", atmosphere: "deep", accent: "#8ef7d7" },
};

const intensityMap = {
  minimal: 0.45,
  cinematic: 0.75,
  experimental: 0.9,
  calm: 0.6,
  electric: 0.85,
  refined: 0.65,
  cosmic: 0.95,
};

export function generateSceneFromPrompt(prompt, currentState = defaultSceneState) {
  const value = (prompt || "").toLowerCase();
  let next = { ...currentState };

  if (value.includes("ocean") || value.includes("water") || value.includes("sea")) {
    Object.assign(next, environmentMap.ocean);
  }
  if (value.includes("desert") || value.includes("dune") || value.includes("sunset")) {
    Object.assign(next, environmentMap.desert);
  }
  if (value.includes("forest") || value.includes("jungle") || value.includes("nature")) {
    Object.assign(next, environmentMap.forest);
  }
  if (value.includes("city") || value.includes("urban") || value.includes("metropolis")) {
    Object.assign(next, environmentMap.city);
  }
  if (value.includes("gallery") || value.includes("museum") || value.includes("exhibit")) {
    Object.assign(next, environmentMap.gallery);
  }
  if (value.includes("space") || value.includes("orbit") || value.includes("planet")) {
    Object.assign(next, environmentMap.space);
  }

  if (value.includes("minimal") || value.includes("clean") || value.includes("quiet")) {
    next.architecture = "minimal";
  }
  if (value.includes("futuristic") || value.includes("neon") || value.includes("future")) {
    next.architecture = "futuristic";
    next.lighting = "neon";
  }
  if (value.includes("warm") || value.includes("golden") || value.includes("sunset")) {
    next.lighting = "warm";
  }
  if (value.includes("cool") || value.includes("icy") || value.includes("blue")) {
    next.lighting = "neon";
  }
  if (value.includes("experimental") || value.includes("abstract") || value.includes("dream")) {
    next.mood = "experimental";
  }
  if (value.includes("calm") || value.includes("serene") || value.includes("quiet")) {
    next.mood = "calm";
  }

  if (value.includes("dense") || value.includes("crowded") || value.includes("heavy")) {
    next.density = 0.92;
    next.particleLevel = 0.95;
  }
  if (value.includes("minimal") || value.includes("sparse") || value.includes("empty")) {
    next.density = 0.42;
    next.particleLevel = 0.45;
  }
  if (value.includes("bright") || value.includes("luminous")) {
    next.energy = 1.3;
  }
  if (value.includes("dark") || value.includes("shadow")) {
    next.energy = 0.8;
  }

  next.mood = next.mood || currentState.mood;
  next.environment = next.environment || currentState.environment;
  next.architecture = next.architecture || currentState.architecture;
  next.lighting = next.lighting || currentState.lighting;
  next.atmosphere = next.atmosphere || currentState.atmosphere;
  next.energy = Number(Math.min(Math.max(next.energy, 0.4), 1.5).toFixed(2));
  next.density = Number(Math.min(Math.max(next.density, 0.2), 1).toFixed(2));
  next.particleLevel = Number(Math.min(Math.max(next.particleLevel, 0.2), 1).toFixed(2));
  next.accent = environmentMap[next.environment]?.accent || next.accent;

  return {
    ...next,
    intensity: intensityMap[next.mood] || 0.7,
  };
}

export function parseCommand(command, currentState = defaultSceneState) {
  const value = (command || "").toLowerCase();

  const commandMap = {
    futuristic: { architecture: "futuristic", lighting: "neon", mood: "electric", energy: 1.2 },
    desert: { environment: "desert", lighting: "warm", mood: "serene", atmosphere: "dry" },
    ocean: { environment: "ocean", lighting: "neon", mood: "cinematic", atmosphere: "deep" },
    warmer: { lighting: "warm", mood: "serene", energy: 1.1 },
    minimal: { architecture: "minimal", density: 0.38, particleLevel: 0.4, mood: "calm" },
    experimental: { architecture: "experimental", mood: "experimental", energy: 1.4, density: 0.9 },
    reduce: { density: 0.35, particleLevel: 0.35 },
    dark: { atmosphere: "deep", energy: 0.8 },
  };

  for (const [key, sceneState] of Object.entries(commandMap)) {
    if (value.includes(key)) {
      return { ...currentState, ...sceneState };
    }
  }

  return { ...currentState };
}
