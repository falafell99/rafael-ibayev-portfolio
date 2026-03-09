import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useRef } from "react";

const projects = [
  {
    title: "UrbanFlow AI",
    tag: "MARL Logistics",
    description: "A high-fidelity Multi-Agent Reinforcement Learning simulator for autonomous logistics. Features 'Neural Planning' visualization and strict spatial locking for zero-collision delivery.",
    techStack: ["Python", "PyTorch", "MARL", "A* Pathfinding"],
    github: "https://github.com/rafael-ibayev/urbanflow-ai",
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    title: "NexusDB / Raft Overseer",
    tag: "Distributed Systems",
    description: "A fault-tolerant distributed Key-Value store built on the Raft Consensus Algorithm. Includes a global observability map and real-time quorum health monitoring.",
    techStack: ["Distributed Systems", "Raft", "Algorithms", "Consensus"],
    github: "https://github.com/rafael-ibayev/nexus-db",
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
  {
    title: "UniFlow",
    tag: "Student OS",
    description: "A massive educational ecosystem for the university community. Centralizes academic heritage with a RAG-based AI tutor and peer-to-peer study circles.",
    techStack: ["RAG", "AI Architecture", "SaaS", "Education Tech"],
    github: "https://github.com/rafael-ibayev/uniflow",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

const ProjectCard = ({ project, i }: { project: typeof projects[0]; i: number }) => {
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

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: i * 0.15,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card-hover group overflow-hidden glow-border relative"
    >
      {/* Gradient background overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <motion.span
              className="font-mono-label text-primary mb-3 block"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              {project.tag}
            </motion.span>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-gradient-emerald-indigo transition-all duration-300">
              {project.title}
            </h3>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 p-3 rounded-full glass-card text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={22} />
            </motion.div>
          </a>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-8 text-base">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, ti) => (
            <motion.span
              key={tech}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/50 text-secondary-foreground border border-border/50 hover:border-primary/30 hover:text-primary transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + ti * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* View Project Link */}
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-primary hover:text-accent transition-colors group/link"
          whileHover={{ x: 5 }}
        >
          <span>View on GitHub</span>
          <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 relative">
      {/* Background accents */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 bg-primary pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-accent pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <motion.span
            className="font-mono-label text-primary mb-4 block"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            FEATURED PROJECTS
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Engineering Excellence
          </h2>
          <motion.div
            className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
