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
    borderGlow: "hover:shadow-[0_0_50px_hsl(45_100%_50%/0.2)]",
    accentColor: "text-yellow-400",
    date: "Feb 2025 · Frankfurt, Germany",
  },
  {
    title: "Gold Medal",
    subtitle: "International STEM Olympiad — Tech",
    icon: Trophy,
    image: "/images/techgold.jpg",
    color: "from-yellow-400/20 to-amber-600/10",
    borderGlow: "hover:shadow-[0_0_50px_hsl(45_100%_50%/0.2)]",
    accentColor: "text-yellow-400",
    date: "Feb 2025 · Frankfurt, Germany",
  },
  {
    title: "Bronze Medal",
    subtitle: "International STEM Olympiad — Coding",
    icon: Medal,
    image: "/images/codingbronze.jpg",
    color: "from-amber-700/20 to-orange-900/10",
    borderGlow: "hover:shadow-[0_0_50px_hsl(30_80%_40%/0.2)]",
    accentColor: "text-amber-500",
    date: "Mar 2025 · Frankfurt, Germany",
  },
  {
    title: "Bronze Award",
    subtitle: "American Mathematics Olympiad 2024",
    icon: Award,
    image: "/images/amobronze.jpeg",
    color: "from-amber-700/20 to-orange-900/10",
    borderGlow: "hover:shadow-[0_0_50px_hsl(30_80%_40%/0.2)]",
    accentColor: "text-amber-500",
    date: "2024",
  },
];

const Achievements = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 rounded-full blur-[150px] opacity-10 bg-yellow-500 pointer-events-none" />

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
            ACHIEVEMENTS
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            International Recognition
          </h2>
          <motion.div
            className="h-1 bg-primary rounded-full mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={() => setSelected(i)}
              className={`glass-card-hover cursor-pointer overflow-hidden group relative ${a.borderGlow}`}
            >
              {/* Gradient accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${a.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative p-6 flex items-start gap-4">
                <motion.div
                  className={`p-3 rounded-xl bg-muted ${a.accentColor} flex-shrink-0`}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a.icon size={28} />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{a.subtitle}</p>
                  <p className="font-mono-label text-muted-foreground mt-2 text-[10px]">{a.date}</p>
                </div>
                <ExternalLink size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
              </div>

              {/* Mini preview image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 p-2 rounded-full glass-card text-muted-foreground hover:text-foreground transition-colors z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
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
