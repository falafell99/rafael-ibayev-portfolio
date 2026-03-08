import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const TRAIL_LENGTH = 8;

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const idRef = useRef(0);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      idRef.current++;
      setTrail((prev) => [
        ...prev.slice(-(TRAIL_LENGTH - 1)),
        { x: e.clientX, y: e.clientY, id: idRef.current },
      ]);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, label, [data-hoverable]");
      setIsHovering(!!interactive);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible && trail.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" style={{ cursor: "none" }}>
      {/* Trail particles */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={() =>
            setTrail((prev) => prev.filter((p) => p.id !== point.id))
          }
          className="absolute rounded-full bg-primary"
          style={{
            left: point.x - 3,
            top: point.y - 3,
            width: 6,
            height: 6,
          }}
        />
      ))}

      {/* Main cursor ring */}
      <motion.div
        className="absolute rounded-full border-2 border-primary"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 48 : 28,
          height: isHovering ? 48 : 28,
          borderColor: isHovering
            ? "hsl(24 100% 50%)"
            : "hsl(24 100% 50% / 0.6)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />

      {/* Center dot */}
      <motion.div
        className="absolute rounded-full bg-primary"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 4,
          height: 4,
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      />
    </div>
  );
};

export default CustomCursor;
