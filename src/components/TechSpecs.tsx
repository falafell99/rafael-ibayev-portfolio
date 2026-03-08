import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const specs = [
  {
    project: "ORATOR",
    latency: "< 200ms",
    accuracy: "94.2%",
    stack: "Azure AI, Gemini, React, Flask",
  },
  {
    project: "Fraud Detection",
    latency: "< 50ms",
    accuracy: "97.8%",
    stack: "Isolation Forest, Kafka, Python",
  },
  {
    project: "Robotic Arm",
    latency: "< 15ms",
    accuracy: "91.5%",
    stack: "C, Arduino, EMG Sensors",
  },
  {
    project: "HCI System",
    latency: "< 30ms",
    accuracy: "96.1%",
    stack: "MediaPipe, OpenCV, TensorFlow",
  },
];

const TechSpecs = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-24 px-6">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => setOpen(!open)}
            className="w-full glass-card-hover p-6 flex items-center justify-between cursor-pointer"
          >
            <div className="text-left">
              <span className="font-mono-label text-primary mb-2 block">SPECIFICATIONS</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Technical Metrics
              </h2>
            </div>
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={24} className="text-muted-foreground" />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={{
              height: open ? "auto" : 0,
              opacity: open ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="glass-card mt-2 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-mono-label text-muted-foreground">Project</th>
                    <th className="text-left p-4 font-mono-label text-muted-foreground">Latency</th>
                    <th className="text-left p-4 font-mono-label text-muted-foreground">Accuracy</th>
                    <th className="text-left p-4 font-mono-label text-muted-foreground hidden md:table-cell">Tech Stack</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-semibold text-foreground">{spec.project}</td>
                      <td className="p-4 text-accent font-mono">{spec.latency}</td>
                      <td className="p-4 text-primary font-mono">{spec.accuracy}</td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">{spec.stack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSpecs;
