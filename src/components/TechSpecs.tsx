import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap, Target, Layers } from "lucide-react";
import { useState } from "react";

const specs = [
  { project: "ORATOR", latency: "< 200ms", accuracy: "94.2%", stack: "Azure AI, Gemini, React, Flask" },
  { project: "Fraud Detection", latency: "< 50ms", accuracy: "97.8%", stack: "Isolation Forest, Kafka, Python" },
  { project: "Robotic Arm", latency: "< 15ms", accuracy: "91.5%", stack: "C, Arduino, EMG Sensors" },
  { project: "HCI System", latency: "< 30ms", accuracy: "96.1%", stack: "MediaPipe, OpenCV, TensorFlow" },
];

const TechSpecs = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-24 px-6 relative">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full glass-card-hover p-6 flex items-center justify-between cursor-pointer"
          >
            <div className="text-left">
              <motion.span
                className="font-mono-label text-primary mb-2 block"
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                SPECIFICATIONS
              </motion.span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Technical Metrics
              </h2>
            </div>
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <ChevronDown size={24} className="text-muted-foreground" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                className="overflow-hidden"
              >
                <div className="glass-card mt-2 overflow-hidden">
                  {/* Stats overview */}
                  <div className="grid grid-cols-3 gap-4 p-6 border-b border-border">
                    {[
                      { icon: Zap, label: "Avg Latency", value: "< 74ms", color: "text-accent" },
                      { icon: Target, label: "Avg Accuracy", value: "94.9%", color: "text-primary" },
                      { icon: Layers, label: "Projects", value: "4", color: "text-foreground" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="text-center"
                      >
                        <stat.icon size={18} className={`mx-auto mb-2 ${stat.color}`} />
                        <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
                        <div className="font-mono-label text-muted-foreground mt-1">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

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
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.08 }}
                          className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                        >
                          <td className="p-4 font-semibold text-foreground">{spec.project}</td>
                          <td className="p-4 text-accent font-mono">{spec.latency}</td>
                          <td className="p-4 text-primary font-mono">{spec.accuracy}</td>
                          <td className="p-4 text-muted-foreground hidden md:table-cell">{spec.stack}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSpecs;
