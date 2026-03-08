import { motion } from "framer-motion";

const languages = [
  { name: "English", level: "Fluent", percent: 95, flag: "🇬🇧" },
  { name: "Russian", level: "Native", percent: 100, flag: "🇷🇺" },
  { name: "Azerbaijani", level: "Native", percent: 100, flag: "🇦🇿" },
  { name: "Turkish", level: "Intermediate", percent: 60, flag: "🇹🇷" },
  { name: "Hungarian", level: "Beginner", percent: 15, flag: "🇭🇺" },
];

const Languages = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <motion.span
            className="font-mono-label text-primary mb-4 block"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            COMMUNICATION
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Languages
          </h2>
          <motion.div
            className="h-1 bg-primary rounded-full mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-5 flex items-center gap-4 group hover:border-primary/30 transition-colors"
            >
              <span className="text-4xl">{lang.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1.5">
                  <h3 className="font-semibold text-foreground">{lang.name}</h3>
                  <span className="font-mono-label text-[10px] text-accent">{lang.level}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;
