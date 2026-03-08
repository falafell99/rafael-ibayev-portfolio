import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Trophy, Code, Cpu, BookOpen } from "lucide-react";

const stats = [
  { icon: Trophy, value: 5, suffix: "+", label: "Gold Medals" },
  { icon: Code, value: 6, suffix: "+", label: "Projects Built" },
  { icon: Cpu, value: 10, suffix: "+", label: "Technologies" },
  { icon: BookOpen, value: 4, suffix: "", label: "Years Coding" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = duration / target;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-black text-primary">
      {count}{suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="container max-w-5xl mx-auto relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass-card p-6 text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4"
              >
                <stat.icon size={24} className="text-primary" />
              </motion.div>
              <div className="mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-mono-label text-muted-foreground text-[11px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
