import { motion } from "framer-motion";

const categories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "C / C++", level: 55 },
      { name: "JavaScript / TypeScript", level: 85 },
      { name: "SQL", level: 70 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", level: 80 },
      { name: "TensorFlow / PyTorch", level: 75 },
      { name: "OpenCV", level: 85 },
      { name: "Node.js", level: 65 },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "Linux", level: 75 },
      { name: "Docker", level: 60 },
      { name: "Arduino / ROS", level: 70 },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 relative">
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
            EXPERTISE
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Skills & Tools
          </h2>
          <motion.div
            className="h-1 bg-primary rounded-full mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
              className="glass-card p-6 space-y-5"
            >
              <h3 className="font-mono-label text-accent text-sm">{cat.title}</h3>
              {cat.skills.map((skill, i) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
