import { motion } from "framer-motion";
import { useMemo } from "react";
import { ExternalLink } from "lucide-react";

const DAYS = 7;
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Real contribution data from github.com/falafell99
const CONTRIBUTIONS: Record<string, number> = {
  "2025-11-04": 1,
  "2025-11-30": 4,
  "2025-12-04": 1,
  "2025-12-21": 1,
  "2025-12-28": 1,
  "2026-01-04": 1,
  "2026-01-11": 1,
  "2026-01-13": 1,
  "2026-02-25": 2,
  "2026-02-27": 4,
  "2026-02-28": 23,
  "2026-03-02": 11,
  "2026-03-05": 9,
  "2026-03-08": 6,
};

const getLevel = (count: number): number => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
};

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

const formatDate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const GitHubActivity = () => {
  const { grid, monthLabels, totalContributions } = useMemo(() => {
    const end = new Date(2026, 2, 8); // March 8, 2026
    const start = new Date(end);
    start.setDate(start.getDate() - 364); // ~52 weeks back

    // Align start to Sunday
    const dayOfWeek = start.getDay();
    start.setDate(start.getDate() - dayOfWeek);

    const weeks: { level: number; count: number; date: string }[][] = [];
    const months: { label: string; col: number }[] = [];
    let total = 0;
    let lastMonth = -1;
    const current = new Date(start);

    while (current <= end || weeks.length < 52) {
      const week: { level: number; count: number; date: string }[] = [];
      for (let d = 0; d < DAYS; d++) {
        const dateStr = formatDate(current);
        const count = CONTRIBUTIONS[dateStr] || 0;
        total += count;
        week.push({ level: getLevel(count), count, date: dateStr });

        if (d === 0 && current.getMonth() !== lastMonth) {
          lastMonth = current.getMonth();
          months.push({ label: MONTH_LABELS[lastMonth], col: weeks.length });
        }
        current.setDate(current.getDate() + 1);
      }
      weeks.push(week);
      if (weeks.length >= 53) break;
    }

    return { grid: weeks, monthLabels: months, totalContributions: total };
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
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground text-sm">
              <span className="text-foreground font-semibold">{totalContributions}</span> contributions in the last year
            </p>
            <a
              href="https://github.com/falafell99"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              @falafell99 <ExternalLink size={12} />
            </a>
          </div>

          {/* Month labels */}
          <div className="flex gap-[3px] mb-1 ml-8">
            {monthLabels.map((m, i) => (
              <span
                key={i}
                className="text-[10px] text-muted-foreground font-mono absolute"
                style={{ left: `calc(32px + ${m.col} * 16px)` }}
              >
                {m.label}
              </span>
            ))}
          </div>
          <div className="h-4" />

          {/* Grid */}
          <div className="flex gap-1">
            <div className="flex flex-col gap-[3px] mr-1">
              {DAY_LABELS.map((label, i) => (
                <span key={i} className="text-[10px] text-muted-foreground font-mono h-[13px] leading-[13px]">
                  {label}
                </span>
              ))}
            </div>

            <div className="flex gap-[3px]">
              {grid.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((cell, di) => (
                    <motion.div
                      key={`${wi}-${di}`}
                      className={`w-[13px] h-[13px] rounded-[2px] ${getLevelClass(cell.level)} cursor-default`}
                      title={`${cell.count} contributions on ${cell.date}`}
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
