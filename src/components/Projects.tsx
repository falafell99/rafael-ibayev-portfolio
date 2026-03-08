import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono-label text-primary mb-4 block">PROJECTS</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Featured Work
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projects.map((project, i) => (
            <motion.article
              key={i}
              variants={item}
              className={`glass-card-hover group overflow-hidden ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "h-64 md:h-80" : "h-52"}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="badge-glass">{project.tag}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                  <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="font-mono-label text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
