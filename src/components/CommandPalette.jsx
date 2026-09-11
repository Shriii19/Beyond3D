import { useEffect, useMemo, useRef, useState } from "react";

const defaultCommands = [
  "Make the scene more futuristic",
  "Reduce particles",
  "Turn the environment into a desert",
  "Make the lighting warmer",
  "Create a more minimal atmosphere",
  "Show me something experimental",
];

export default function CommandPalette({ open, onClose, onExecute, currentTheme }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return defaultCommands;
    return defaultCommands.filter((command) => command.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="command-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="command-panel" onClick={(event) => event.stopPropagation()}>
        <div className="command-header">
          <span className="command-label">AI COMMAND / SYSTEM</span>
          <span className="command-status">{currentTheme || "AI SYSTEM / ONLINE"}</span>
        </div>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="command-input"
          placeholder="Describe something you want to see…"
          aria-label="AI command input"
        />
        <div className="command-list">
          {filteredCommands.map((command) => (
            <button
              type="button"
              className="command-item"
              key={command}
              onClick={() => {
                onExecute(command);
                setQuery("");
              }}
            >
              {command}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
