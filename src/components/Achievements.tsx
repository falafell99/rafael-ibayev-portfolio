import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Award, X, ExternalLink } from "lucide-react";
import { useState } from "react";

const achievements = [
  {
    title: "Gold Medal",
    subtitle: "International STEM Olympiad — Math",
    icon: Trophy,
    image: "/images/mathgold.jpg",
    color: "from-yellow-400/20 to-amber-600/10",
    accentColor: "text-yellow-400",
    date: "Feb 2025 · Frankfurt, Germany",
  },
  {
    title: "Gold Medal",
    subtitle: "International STEM Olympiad — Tech",
    icon: Trophy,
    image: "/images/techgold.jpg",
    color: "from-yellow-400/20 to-amber-600/10",
    accentColor: "text-yellow-400",
    date: "Feb 2025 · Frankfurt, Germany",
  },
  {
    title: "Bronze Medal",
    subtitle: "International STEM Olympiad — Coding",
    icon: Medal,
    image: "/images/codingbronze.jpg",
    color: "from-amber-700/20 to-orange-900/10",
    accentColor: "text-amber-500",
    date: "Mar 2025 · Frankfurt, Germany",
  },
  {
    title: "Bronze Award",
    subtitle: "American Mathematics Olympiad 2024",
    icon: Award,
    image: "/images/amobronze.jpeg",
    color: "from-amber-700/20 to-orange-900/10",
    accentColor: "text-amber-500",
    date: "2024",
  },
];

const Achievements = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 relative">
      <div className="container max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="font-mono-label text-primary mb-4 block" style={{ letterSpacing: "0.2em" }}>
            ACHIEVEMENTS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            International Recognition
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => setSelected(i)}
              className="glass-card cursor-pointer overflow-hidden group relative"
            >
              <div className="relative p-6 flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-muted ${a.accentColor} flex-shrink-0`}>
                  <a.icon size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{a.subtitle}</p>
                  <p className="font-mono-label text-muted-foreground mt-2 text-[10px]">{a.date}</p>
                </div>
                <ExternalLink size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
              </div>

              <div className="relative h-40 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 p-2 rounded-full glass-card text-muted-foreground hover:text-foreground transition-colors z-10"
              >
                <X size={20} />
              </button>
              <div className="glass-card overflow-hidden rounded-2xl">
                <img
                  src={achievements[selected].image}
                  alt={achievements[selected].title}
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground">{achievements[selected].title}</h3>
                  <p className="text-muted-foreground mt-1">{achievements[selected].subtitle}</p>
                  <p className="font-mono-label text-primary mt-2">{achievements[selected].date}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
