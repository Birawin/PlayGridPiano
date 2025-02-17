import { useState, useCallback, useEffect } from "react";
import { PianoKey } from "./PianoKey";
import { pianoSound } from "@/lib/audio";

// Generate colors for the grid
const colors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
  "#FFEEAD", "#D4A5A5", "#9B59B6", "#3498DB",
  "#E74C3C", "#2ECC71", "#F1C40F", "#1ABC9C",
  "#E67E22", "#95A5A6", "#D35400", "#16A085"
];

export function PianoGrid() {
  const [pressedKeys, setPressedKeys] = useState<Set<number>>(new Set());

  // Base note for the grid (middle C)
  const baseNote = 60;

  const playNote = useCallback((note: number) => {
    try {
      pianoSound.resume(); // Ensure audio context is resumed
      pianoSound.playNote(note, 0.3); // Shorter duration for more responsive feel
      setPressedKeys(prev => new Set(prev).add(note));
      setTimeout(() => {
        setPressedKeys(prev => {
          const next = new Set(prev);
          next.delete(note);
          return next;
        });
      }, 150); // Shorter visual feedback duration
    } catch (error) {
      console.error('Error playing note:', error);
    }
  }, []);

  // Initialize audio context on first user interaction
  useEffect(() => {
    const initAudio = () => {
      pianoSound.resume();
      window.removeEventListener('touchstart', initAudio);
      window.removeEventListener('mousedown', initAudio);
    };

    window.addEventListener('touchstart', initAudio);
    window.addEventListener('mousedown', initAudio);

    return () => {
      window.removeEventListener('touchstart', initAudio);
      window.removeEventListener('mousedown', initAudio);
    };
  }, []);

  // Prevent default touch behavior to avoid scrolling while playing
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.target instanceof Element && e.target.closest('.piano-grid')) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  return (
    <div className="piano-grid w-full max-w-md mx-auto p-4">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 16 }, (_, i) => (
          <PianoKey
            key={i}
            note={baseNote + i}
            color={colors[i]}
            isPressed={pressedKeys.has(baseNote + i)}
            onPointerDown={() => playNote(baseNote + i)}
          />
        ))}
      </div>
    </div>
  );
}