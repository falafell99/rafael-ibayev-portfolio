import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 400 });

  const isVisibleRef = useRef(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const setVisible = (v: boolean) => {
      if (isVisibleRef.current === v) return;
      isVisibleRef.current = v;
      const opacity = v ? "1" : "0";
      if (ringRef.current) ringRef.current.style.opacity = opacity;
      if (dotRef.current) dotRef.current.style.opacity = opacity;
    };

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Ring */}
      <motion.div
        ref={ringRef}
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 28,
          height: 28,
          border: "2px solid rgba(16, 185, 129, 0.7)",
          boxShadow: "0 0 10px rgba(16, 185, 129, 0.4)",
          opacity: 0,
          willChange: "transform",
        }}
      />
      {/* Dot */}
      <motion.div
        ref={dotRef}
        className="absolute rounded-full"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 4,
          height: 4,
          backgroundColor: "#10b981",
          boxShadow: "0 0 8px rgba(16, 185, 129, 0.8)",
          opacity: 0,
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default CustomCursor;
