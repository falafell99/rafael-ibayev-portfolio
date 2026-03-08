import { motion } from "framer-motion";
import { Award, Trophy, Medal } from "lucide-react";

const achievements = [
  {
    title: "Gold Medal",
    subtitle: "International STEM Olympiad — Math",
    icon: Trophy,
    color: "text-yellow-400",
    glowClass: "hover:shadow-[0_0_40px_hsl(45_100%_50%/0.15)]",
  },
  {
    title: "Gold Medal",
    subtitle: "International STEM Olympiad — Tech",
    icon: Trophy,
    color: "text-yellow-400",
    glowClass: "hover:shadow-[0_0_40px_hsl(45_100%_50%/0.15)]",
  },
  {
    title: "Bronze Medal",
    subtitle: "International STEM Olympiad — Coding",
    icon: Medal,
    color: "text-amber-600",
    glowClass: "hover:shadow-[0_0_40px_hsl(30_80%_40%/0.15)]",
  },
  {
    title: "Bronze Medal",
    subtitle: "American Math Olympiad 2024",
    icon: Award,
    color: "text-amber-600",
    glowClass: "hover:shadow-[0_0_40px_hsl(30_80%_40%/0.15)]",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Achievements = () => {
  return (
    <section className="py-24 px-6">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono-label text-primary mb-4 block">ACHIEVEMENTS</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            International Recognition
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              variants={item}
              className={`glass-card-hover p-6 flex flex-col items-start gap-4 ${a.glowClass}`}
            >
              <div className={`p-3 rounded-xl bg-muted ${a.color}`}>
                <a.icon size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{a.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
