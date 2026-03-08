import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Briefcase, Code, Award } from "lucide-react";
import { useRef } from "react";

const events = [
  {
    year: "2021",
    title: "Started Programming Journey",
    description: "Began learning Python and C, exploring algorithms and data structures.",
    icon: Code,
    color: "primary",
  },
  {
    year: "2022",
    title: "Deep Dive into Web & Algorithms",
    description: "Explored web development, learned JavaScript and React, and participated in competitive programming contests.",
    icon: Code,
    color: "accent",
  },
  {
    year: "2023",
    title: "Robotics & AI Projects",
    description: "Built robotic arm with computer vision and HCI gesture control system.",
    icon: Briefcase,
    color: "primary",
  },
  {
    year: "2024",
    title: "Olympiads, Math & New Technologies",
    description: "Continued competing in STEM olympiads, deepened knowledge in advanced mathematics, and explored new frameworks and tools for AI and web development.",
    icon: Award,
    color: "accent",
  },
  {
    year: "2025",
    title: "ELTE University — Computer Science",
    description: "Enrolled in Computer Science program at Eötvös Loránd University, Budapest.",
    icon: GraduationCap,
    color: "primary",
  },
];

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-24 px-6 relative">
      <div className="container max-w-4xl mx-auto">
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
            JOURNEY
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            My Timeline
          </h2>
          <motion.div
            className="h-1 bg-primary rounded-full mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-border md:-translate-x-[1px]">
            <motion.div
              className="w-full bg-primary rounded-full origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
                className={`relative flex items-center mb-16 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="glass-card p-6 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity bg-primary" />
                    <span className="font-mono-label text-primary mb-2 block">{event.year}</span>
                    <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                  </motion.div>
                </div>

                {/* Center icon */}
                <motion.div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10"
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  whileInView={{
                    boxShadow: [
                      "0 0 0px hsl(24 100% 50% / 0)",
                      "0 0 20px hsl(24 100% 50% / 0.4)",
                      "0 0 0px hsl(24 100% 50% / 0)",
                    ],
                  }}
                  viewport={{ once: true }}
                  transition={{ boxShadow: { duration: 1.5, delay: 0.5 + i * 0.15 } }}
                >
                  <div className="w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                    <event.icon size={20} className="text-primary" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
