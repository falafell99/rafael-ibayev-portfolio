import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import { useRef, lazy, Suspense } from "react";
import Typewriter from "./Typewriter";
import { useIsMobileDevice } from "@/hooks/use-reduced-motion";

const TechSphere = lazy(() => import("./TechSphere"));

const coreExpertise = [
  { label: "Distributed Systems", icon: "🔗" },
  { label: "Autonomous AI", icon: "🧠" },
  { label: "Real-time Processing", icon: "⚡" },
];

const Hero = () => {
  const isMobile = useIsMobileDevice();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Only apply parallax on desktop
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  const firstName = "RAFAEL";
  const lastName = "IBAYEV";

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient glows - hidden on mobile (expensive blur) */}
      {!isMobile && (
        <>
          <motion.div
            style={{ y }}
            className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full opacity-20 blur-[120px] bg-[#10b981] pointer-events-none"
          />
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
            className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full opacity-15 blur-[100px] bg-accent pointer-events-none"
          />
        </>
      )}

      <motion.div style={{ opacity, scale: isMobile ? undefined : scale }} className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Professional Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="font-mono-label text-[#10b981]">
              CS @ ELTE BUDAPEST • INTERNATIONAL STEM OLYMPIAD GOLD MEDALIST
            </span>
          </motion.div>

          {/* Name - simple fade on mobile, letter-by-letter on desktop */}
          {isMobile ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-6xl font-black tracking-tighter leading-[0.9] mb-6"
            >
              <div style={{ color: "hsl(var(--foreground))" }}>{firstName}</div>
              <div style={{ color: "hsl(var(--muted-foreground))" }}>{lastName}</div>
            </motion.div>
          ) : (
            <div className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-6" style={{ perspective: "1000px" }}>
              <div className="overflow-hidden">
                <div className="flex justify-center">
                  {firstName.split("").map((letter, i) => (
                    <motion.span
                      key={`f-${i}`}
                      initial={{ opacity: 0, y: 80, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                      className="inline-block"
                      style={{ color: "hsl(var(--foreground))" }}
                      whileHover={{ y: -10, color: "#10b981", transition: { duration: 0.2 } }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex justify-center">
                  {lastName.split("").map((letter, i) => (
                    <motion.span
                      key={`l-${i}`}
                      initial={{ opacity: 0, y: 80, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.8, delay: (i + firstName.length) * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                      className="inline-block"
                      style={{ color: "hsl(var(--muted-foreground))" }}
                      whileHover={{ y: -10, color: "#34d399", transition: { duration: 0.2 } }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: isMobile ? 0.4 : 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            <Typewriter />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: isMobile ? 0.5 : 1.0 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Architecting Distributed Systems & Autonomous AI Environments
          </motion.p>

          {/* Core Expertise */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: isMobile ? 0.6 : 1.1 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            {coreExpertise.map((item) => (
              <div
                key={item.label}
                className="px-4 py-2 rounded-full glass-card border border-border/50"
              >
                <span className="mr-2">{item.icon}</span>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: isMobile ? 0.7 : 1.3 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#10b981] text-white font-semibold text-sm hover:bg-[#059669] transition-colors duration-300"
            >
              <span>View My Work</span>
              <ArrowDown size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass-card text-foreground font-semibold text-sm transition-colors duration-300"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: isMobile ? 0.8 : 1.5 }}
            className="flex items-center justify-center gap-5"
          >
            {[
              { href: "https://github.com/rafael-ibayev", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/rafael-ibayev", icon: Linkedin, label: "LinkedIn" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card text-muted-foreground hover:text-[#10b981] transition-colors duration-300"
                title={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>

          {/* 3D Tech Sphere - desktop only */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 1.8 }}
            >
              <Suspense fallback={null}>
                <TechSphere />
              </Suspense>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isMobile ? 1.0 : 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono-label text-muted-foreground text-[10px]">SCROLL</span>
          <ArrowDown size={16} className="text-[#10b981]" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
