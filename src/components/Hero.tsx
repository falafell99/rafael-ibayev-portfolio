import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, FileText, ArrowDown } from "lucide-react";
import { useRef, lazy, Suspense } from "react";
import Typewriter from "./Typewriter";

const TechSphere = lazy(() => import("./TechSphere"));

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  const letterVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.05,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    }),
  };

  const firstName = "RAFAEL";
  const lastName = "IBAYEV";

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated ambient glows */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] bg-primary pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-accent pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px] bg-primary pointer-events-none"
      />

      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      <motion.div style={{ opacity, scale }} className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="font-mono-label text-primary">COMPUTER SCIENCE @ ELTE</span>
          </motion.div>

          {/* Animated letter-by-letter name */}
          <div className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-6" style={{ perspective: "1000px" }}>
            <div className="overflow-hidden">
              <div className="flex justify-center">
                {firstName.split("").map((letter, i) => (
                  <motion.span
                    key={`f-${i}`}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block text-foreground"
                    style={{ color: "hsl(var(--foreground))" }}
                    whileHover={{ 
                      y: -10, 
                      color: "hsl(24, 100%, 50%)",
                      transition: { duration: 0.2 } 
                    }}
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
                    custom={i + firstName.length}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block text-muted-foreground"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                    whileHover={{
                      y: -10,
                      color: "hsl(24, 100%, 50%)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            <Typewriter />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Building AI, robotics, and real-time systems. International STEM Olympiad gold medalist.
            Passionate about solving complex engineering challenges through software-hardware integration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity relative overflow-hidden group"
            >
              <span className="relative z-10">View My Work</span>
              <ArrowDown size={16} className="relative z-10" />
              <motion.div
                className="absolute inset-0 bg-accent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass-card text-foreground font-semibold text-sm hover:border-primary/30 transition-colors"
            >
              Get in Touch
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center justify-center gap-5"
          >
            {[
              { href: "https://github.com/falafell99", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/rafael-ibayev", icon: Linkedin, label: "LinkedIn" },
              { href: "/RafaelFCV.pdf", icon: FileText, label: "CV" },
            ].map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card text-muted-foreground hover:text-primary transition-colors relative group"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + i * 0.1, type: "spring", stiffness: 200 }}
                title={social.label}
              >
                <social.icon size={20} />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  whileHover={{
                    boxShadow: "0 0 20px hsl(24 100% 50% / 0.4)",
                  }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* 3D Tech Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
          >
            <Suspense fallback={null}>
              <TechSphere />
            </Suspense>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono-label text-muted-foreground text-[10px]">SCROLL</span>
          <ArrowDown size={16} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
