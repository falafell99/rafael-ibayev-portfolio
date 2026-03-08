import { motion } from "framer-motion";
import { Github, Linkedin, ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] bg-primary pointer-events-none" />
      
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="font-mono-label text-primary">COMPUTER SCIENCE @ ELTE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-6"
          >
            <span className="text-foreground">RAFAEL</span>
            <br />
            <span className="text-gradient-muted">IBAYEV</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Building AI, robotics, and real-time systems. International STEM Olympiad gold medalist.
            Passionate about solving complex engineering challenges through software-hardware integration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              View My Work
              <ArrowDown size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass-card text-foreground font-semibold text-sm hover:border-primary/30 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-5"
          >
            <a
              href="https://github.com/falafell99"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-card text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/rafael-ibayev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-card text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
