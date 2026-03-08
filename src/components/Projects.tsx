import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const projects = [
  {
    title: "ORATOR",
    tag: "AI Lab",
    description: "Bilingual (EN/HU) AI speech prep lab with real-time analysis. Built at MIT Hackathon using Azure AI & Gemini.",
    image: "/images/orator.png",
    techStack: ["Azure AI", "Gemini", "React", "Python"],
  },
  {
    title: "Fraud Detection",
    tag: "ML",
    description: "Real-time anomaly detection in streaming financial data using Isolation Forest algorithm.",
    image: "/images/fraud.png",
    techStack: ["Python", "Scikit-learn", "Kafka", "Docker"],
  },
  {
    title: "Robotic Arm",
    tag: "Robotics",
    description: "Bio-signal prosthetic arm with EMG sensor integration for natural gesture control.",
    image: "/images/robot.jpg",
    techStack: ["C", "Arduino", "EMG Sensors", "3D Printing"],
  },
  {
    title: "HCI System",
    tag: "Vision",
    description: "Real-time gesture detection and human-computer interaction using MediaPipe and OpenCV.",
    image: "/images/hci.jpg",
    techStack: ["Python", "MediaPipe", "OpenCV", "TensorFlow"],
  },
  {
    title: "Baku Monorail",
    tag: "Engineering",
    description: "Urban transport engineering prototype designed for Baku city infrastructure.",
    image: "/images/monorail.png",
    techStack: ["CAD", "Engineering", "Prototyping"],
  },
];

const ProjectCard = ({ project, i }: { project: typeof projects[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-5, 5]), { stiffness: 300, damping: 30 });

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
        delay: i * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card-hover group overflow-hidden glow-border ${i === 0 ? "md:col-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden ${i === 0 ? "h-64 md:h-80" : "h-52"}`}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <motion.span
            className="badge-glass"
            whileHover={{ scale: 1.1 }}
          >
            {project.tag}
          </motion.span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-gradient-primary transition-colors">
            {project.title}
          </h3>
          <motion.div
            className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1"
            whileHover={{ x: 3, y: -3 }}
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, ti) => (
            <motion.span
              key={tech}
              className="font-mono-label text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + ti * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-accent pointer-events-none" />

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
            PROJECTS
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Featured Work
          </h2>
          <motion.div
            className="h-1 bg-primary rounded-full mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ perspective: "1200px" }}>
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
