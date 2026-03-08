import { motion } from "framer-motion";
import { useMemo } from "react";

const WEEKS = 52;
const DAYS = 7;
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getLevelClass = (level: number) => {
  switch (level) {
    case 0: return "bg-muted/40";
    case 1: return "bg-primary/25";
    case 2: return "bg-primary/50";
    case 3: return "bg-primary/75";
    case 4: return "bg-primary";
    default: return "bg-muted/40";
  }
};

const GitHubActivity = () => {
  const grid = useMemo(() => {
    const data: number[][] = [];
    for (let w = 0; w < WEEKS; w++) {
      const week: number[] = [];
      for (let d = 0; d < DAYS; d++) {
        // Simulate realistic-ish activity
        const rand = Math.random();
        if (rand < 0.3) week.push(0);
        else if (rand < 0.55) week.push(1);
        else if (rand < 0.75) week.push(2);
        else if (rand < 0.9) week.push(3);
        else week.push(4);
      }
      data.push(week);
    }
    return data;
  }, []);

  const totalContributions = useMemo(() => {
    return grid.flat().reduce((sum, level) => sum + level * 3, 0);
  }, [grid]);

  // Calculate month positions
  const monthPositions = useMemo(() => {
    const positions: { label: string; col: number }[] = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const month = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
      const weekIndex = Math.floor((i / 12) * WEEKS);
      positions.push({ label: MONTH_LABELS[month.getMonth()], col: weekIndex });
    }
    return positions;
  }, []);

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
            CONTRIBUTIONS
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            GitHub Activity
          </h2>
          <motion.div
            className="h-1 bg-primary rounded-full mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 overflow-x-auto"
        >
          <p className="text-muted-foreground text-sm mb-4">
            <span className="text-foreground font-semibold">{totalContributions}</span> contributions in the last year
          </p>

          {/* Month labels */}
          <div className="flex gap-0 mb-1 ml-8">
            {monthPositions.map((m, i) => (
              <span
                key={i}
                className="text-[10px] text-muted-foreground font-mono"
                style={{ width: `${100 / 12}%` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-1">
              {DAY_LABELS.map((label, i) => (
                <span key={i} className="text-[10px] text-muted-foreground font-mono h-[13px] leading-[13px]">
                  {label}
                </span>
              ))}
            </div>

            {/* Cells */}
            <div className="flex gap-[3px]">
              {grid.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <motion.div
                      key={`${wi}-${di}`}
                      className={`w-[13px] h-[13px] rounded-[2px] ${getLevelClass(level)}`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.15,
                        delay: wi * 0.008 + di * 0.005,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-[10px] text-muted-foreground font-mono">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-[13px] h-[13px] rounded-[2px] ${getLevelClass(level)}`}
              />
            ))}
            <span className="text-[10px] text-muted-foreground font-mono">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
