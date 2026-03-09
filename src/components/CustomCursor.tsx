import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Main cursor with tight spring
  const springX = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 400 });
  
  // Trailing glow with looser spring (delayed effect)
  const trailX = useSpring(cursorX, { damping: 40, stiffness: 150 });
  const trailY = useSpring(cursorY, { damping: 40, stiffness: 150 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, label, [data-hoverable]");
      setIsHovering(!!interactive);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Trailing glow effect */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 80 : 50,
          height: isHovering ? 80 : 50,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(16, 185, 129, 0) 70%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Main emerald ring cursor */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          border: "2px solid #10b981",
          boxShadow: isHovering 
            ? "0 0 20px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3), inset 0 0 10px rgba(16, 185, 129, 0.2)"
            : "0 0 10px rgba(16, 185, 129, 0.4), 0 0 20px rgba(16, 185, 129, 0.2)",
        }}
        animate={{
          width: isHovering ? 48 : 28,
          height: isHovering ? 48 : 28,
          borderColor: isHovering ? "#10b981" : "rgba(16, 185, 129, 0.7)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />

      {/* Center dot */}
      <motion.div
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
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      />
    </div>
  );
};

export default CustomCursor;
