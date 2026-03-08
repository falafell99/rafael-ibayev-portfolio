import { motion } from "framer-motion";
import { BookOpen, Flame, ExternalLink } from "lucide-react";

const learningItems = [
  {
    title: "Machine Learning & Deep Learning",
    description: "Studying neural network architectures, CNNs, and transformer models for real-world applications.",
    progress: 60,
    status: "In Progress",
    tags: ["PyTorch", "TensorFlow", "Neural Networks"],
    link: "https://www.deeplearning.ai/",
  },
  {
    title: "Systems Programming in Rust",
    description: "Learning Rust for high-performance, memory-safe systems and CLI tooling.",
    progress: 30,
    status: "Just Started",
    tags: ["Rust", "Systems", "Memory Safety"],
    link: "https://doc.rust-lang.org/book/",
  },
  {
    title: "Cloud & DevOps",
    description: "Exploring containerization, CI/CD pipelines, and cloud deployment strategies.",
    progress: 40,
    status: "In Progress",
    tags: ["Docker", "AWS", "GitHub Actions"],
    link: "https://aws.amazon.com/getting-started/",
  },
  {
    title: "Competitive Mathematics",
    description: "Preparing for international math olympiads — combinatorics, number theory, and algebra.",
    progress: 75,
    status: "Advanced",
    tags: ["Combinatorics", "Number Theory", "Algebra"],
    link: "https://artofproblemsolving.com/",
  },
];

const statusColors: Record<string, string> = {
  "Just Started": "bg-accent/20 text-accent",
  "In Progress": "bg-primary/20 text-primary",
  "Advanced": "bg-yellow-500/20 text-yellow-400",
};

const CurrentlyLearning = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="container max-w-5xl mx-auto">
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
            CURRENTLY
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            What I'm Learning
          </h2>
          <motion.div
            className="h-1 bg-primary rounded-full mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {learningItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity bg-primary" />

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Flame size={18} className="text-primary" />
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                </div>
                <span className={`text-[10px] font-mono-label px-2 py-1 rounded-full ${statusColors[item.status]}`}>
                  {item.status}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground font-mono-label">Progress</span>
                  <span className="text-primary font-mono-label">{item.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <span key={tag} className="badge-glass text-[10px]">{tag}</span>
                ))}
              </div>

              {/* Link */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-mono-label"
              >
                <BookOpen size={12} />
                Resource
                <ExternalLink size={10} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentlyLearning;
