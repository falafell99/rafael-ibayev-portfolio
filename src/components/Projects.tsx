import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, Archive } from "lucide-react";
import { useRef } from "react";
import { useIsMobileDevice } from "@/hooks/use-reduced-motion";

const featuredProjects = [
  {
    title: "NexusDB / Raft Overseer",
    tag: "Distributed Systems",
    description: "A fault-tolerant distributed Key-Value store built on the Raft Consensus Algorithm. Includes a global observability map and real-time quorum health monitoring.",
    techStack: ["Distributed Systems", "Raft", "Algorithms", "Consensus"],
    github: "https://github.com/falafell99/nexusDB.git",
    live: "https://raft-overseer.vercel.app",
    math: "Q = ⌊n/2⌋ + 1",
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
  {
    title: "UrbanFlow AI",
    tag: "MARL Logistics",
    description: "A high-fidelity Multi-Agent Reinforcement Learning simulator for autonomous logistics. Features 'Neural Planning' visualization and strict spatial locking for zero-collision delivery.",
    techStack: ["Python", "PyTorch", "MARL", "A* Pathfinding"],
    github: "https://github.com/falafell99/urbanflow-command.git",
    live: "https://urbanflow-command.vercel.app",
    math: "R = Σ(D_success × 10) − (C_collision × 50)",
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    title: "UniFlow",
    tag: "Student OS",
    description: "The unified educational ecosystem for the university community. Centralizes academic heritage with a RAG-based AI tutor and peer-to-peer study circles.",
    techStack: ["RAG", "AI Architecture", "SaaS", "Education Tech"],
    github: "https://github.com/falafell99/uniflow-campus-hub.git",
    live: "https://uniflow-campus-hub.vercel.app",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "ORATOR",
    tag: "Public Speaking",
    description: "A web application for public speaking practice. Provides real-time feedback, speech analytics, and structured training modules to build confidence and eloquence.",
    techStack: ["Web App", "Speech Analysis", "Real-time Feedback", "NLP"],
    github: "https://github.com/falafell99/ORATOR99.git",
    live: "https://orator-99.vercel.app",
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    title: "Robotic Arm Control System",
    tag: "Robotics & Control",
    description: "A precision control system for a robotic arm with inverse kinematics, real-time trajectory planning, and sensor-driven feedback loops.",
    techStack: ["Robotics", "Kinematics", "Control Systems", "Sensors"],
    github: "https://github.com/falafell99/robotic-arm.git",
    gradient: "from-sky-500/20 to-blue-500/20",
  },
];

const archiveProjects = [
  {
    title: "Real-time HCI Gestures",
    tag: "Computer Vision",
    description: "Gesture recognition system for human-computer interaction using real-time computer vision.",
    techStack: ["CV", "HCI", "Real-time"],
    github: "https://github.com/falafell99/real-time-hci-gestures.git",
  },
  {
    title: "Baku Monorail System",
    tag: "Transport Simulation",
    description: "Simulation and planning system for the Baku monorail transit network.",
    techStack: ["Simulation", "Transport", "Urban Planning"],
    github: "https://github.com/falafell99/baku-monorail-system.git",
  },
  {
    title: "AeroStream AI",
    tag: "Aviation CV",
    description: "Predictive wildlife mitigation for airports using YOLOv11 and Kalman Filters.",
    techStack: ["YOLOv11", "Kalman Filters", "Computer Vision"],
    github: "#",
  },
];

// Desktop card with 3D tilt
const DesktopFeaturedCard = ({ project, i }: { project: typeof featuredProjects[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.215, 0.61, 0.355, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="glass-card group overflow-hidden relative transition-all duration-500 hover:border-[#10b981]/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15),0_0_60px_rgba(16,185,129,0.1)]"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative p-8">
        <CardContent project={project} i={i} />
      </div>
    </motion.article>
  );
};

// Mobile card - no 3D tilt, no spring physics
const MobileFeaturedCard = ({ project, i }: { project: typeof featuredProjects[0]; i: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: i * 0.08 }}
      className="glass-card group overflow-hidden relative"
    >
      <div className="relative p-6">
        <CardContent project={project} i={i} mobile />
      </div>
    </motion.article>
  );
};

// Shared card content
const CardContent = ({ project, i, mobile }: { project: typeof featuredProjects[0]; i: number; mobile?: boolean }) => (
  <>
    <div className="flex items-start justify-between mb-4 md:mb-6">
      <div>
        <span className="font-mono-label text-[#10b981] mb-2 block">{project.tag}</span>
        <h3 className="text-xl md:text-3xl font-bold text-foreground">{project.title}</h3>
      </div>
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="relative z-10 p-2 md:p-3 rounded-full glass-card text-muted-foreground hover:text-[#10b981] transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
          <Github size={mobile ? 18 : 22} />
        </a>
      )}
    </div>
    <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">{project.description}</p>
    {project.math && !mobile && (
      <div className="mb-6 p-3 rounded-lg bg-secondary/30 border border-border/50 font-mono text-sm text-[#10b981]">
        <span className="text-muted-foreground text-xs mr-2">ƒ(x):</span>{project.math}
      </div>
    )}
    <div className="flex flex-wrap gap-2 mb-4">
      {project.techStack.map((tech) => (
        <span key={tech} className="px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium bg-secondary/50 text-secondary-foreground border border-border/50">
          {tech}
        </span>
      ))}
    </div>
    {project.live ? (
      <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 md:mt-4 text-sm font-medium text-[#10b981]">
        <span>View Project</span>
        <ExternalLink size={14} />
      </a>
    ) : (
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 md:mt-4 text-sm font-medium text-[#10b981]">
        <span>View on GitHub</span>
        <ExternalLink size={14} />
      </a>
    )}
  </>
);

const Projects = () => {
  const isMobile = useIsMobileDevice();

  return (
    <section id="projects" className="py-24 px-6 relative">
      {/* Background blurs - desktop only */}
      {!isMobile && (
        <>
          <div className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 bg-[#10b981] pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-accent pointer-events-none" />
        </>
      )}

      <div className="container max-w-7xl mx-auto relative">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
          <span className="font-mono-label text-[#10b981] mb-4 block" style={{ letterSpacing: "0.2em" }}>
            FEATURED PROJECTS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Engineering Excellence</h2>
          <div className="h-1 w-[120px] bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-24" style={isMobile ? undefined : { perspective: "1200px" }}>
          {featuredProjects.map((project, i) =>
            isMobile
              ? <MobileFeaturedCard key={i} project={project} i={i} />
              : <DesktopFeaturedCard key={i} project={project} i={i} />
          )}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Archive size={20} className="text-[#10b981]" />
            <span className="font-mono-label text-[#10b981]">MORE PROJECTS</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-muted-foreground">Archives</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {archiveProjects.map((project, i) => (
            <motion.a
              key={i}
              href={project.github !== "#" ? project.github : undefined}
              target={project.github !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-6 group hover:border-[#10b981]/40 transition-colors duration-300 block"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-mono-label text-[#10b981] text-[10px]">{project.tag}</span>
                {project.github !== "#" && (
                  <Github size={15} className="text-muted-foreground group-hover:text-[#10b981] transition-colors shrink-0" />
                )}
              </div>
              <h4 className="text-lg font-semibold text-foreground group-hover:text-[#10b981] transition-colors mb-2">{project.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 rounded-full text-[10px] font-medium bg-secondary/40 text-secondary-foreground border border-border/30">{tech}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
