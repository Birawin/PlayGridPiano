import { motion, HTMLMotionProps } from "framer-motion";

interface PianoKeyProps {
  note: number;
  color: string;
  isPressed: boolean;
  onPointerDown: () => void;
}

export function PianoKey({ note, color, isPressed, onPointerDown }: PianoKeyProps) {
  return (
    <motion.div
      className={`aspect-square rounded-lg shadow-md cursor-pointer 
                 touch-none select-none
                 ${isPressed ? 'brightness-75 scale-95' : 'brightness-100 scale-100'}`}
      style={{ backgroundColor: color }}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
      animate={{
        scale: isPressed ? 0.95 : 1,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        onPointerDown();
      }}
      aria-label={`Piano key ${note}`}
    />
  );
}