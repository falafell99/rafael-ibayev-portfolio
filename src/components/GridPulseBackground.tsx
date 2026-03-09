import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const GridPulseBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const gridSize = 50;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines with very low opacity (3-5%)
      ctx.strokeStyle = "rgba(16, 185, 129, 0.035)";
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Animated pulse effect at intersections
      const pulseRadius = 80 + Math.sin(time * 0.5) * 20;
      const centerX = canvas.width / 2 + Math.sin(time * 0.2) * 200;
      const centerY = canvas.height / 2 + Math.cos(time * 0.15) * 150;

      // Draw glowing pulse
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        pulseRadius * 3
      );
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.08)");
      gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.03)");
      gradient.addColorStop(1, "rgba(16, 185, 129, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Secondary pulse
      const pulse2X = canvas.width * 0.3 + Math.cos(time * 0.3) * 100;
      const pulse2Y = canvas.height * 0.7 + Math.sin(time * 0.25) * 80;
      const gradient2 = ctx.createRadialGradient(
        pulse2X,
        pulse2Y,
        0,
        pulse2X,
        pulse2Y,
        pulseRadius * 2
      );
      gradient2.addColorStop(0, "rgba(16, 185, 129, 0.05)");
      gradient2.addColorStop(1, "rgba(16, 185, 129, 0)");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default GridPulseBackground;
