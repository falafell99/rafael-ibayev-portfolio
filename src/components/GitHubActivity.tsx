import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

const USERNAME = "falafell99";
const DAYS = 7;
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const LEVEL_COLORS = [
  "bg-[#0a0a0a] border border-[#1a1a1a]",    // 0 - empty
  "bg-emerald-900/60",                          // 1
  "bg-emerald-700/70",                          // 2
  "bg-emerald-500/80",                          // 3
  "bg-emerald-400",                              // 4
];

const LEGEND_COLORS = [
  "bg-[#0a0a0a] border border-[#1a1a1a]",
  "bg-emerald-900/60",
  "bg-emerald-700/70",
  "bg-emerald-500/80",
  "bg-emerald-400",
];

interface DayData {
  date: string;
  count: number;
  level: number;
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatDate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const getLevel = (count: number): number => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
};

const parseContributionsFromSVG = (html: string): Record<string, number> => {
  const contributions: Record<string, number> = {};
  // Match tool-tip elements or td elements with data-date and data-level
  const regex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const date = match[1];
    const level = parseInt(match[2]);
    // Map GitHub levels to approximate counts
    const countMap: Record<number, number> = { 0: 0, 1: 1, 2: 3, 3: 7, 4: 15 };
    contributions[date] = countMap[level] ?? 0;
  }
  return contributions;
};

const GitHubActivity = () => {
  const [contributions, setContributions] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`);
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        const map: Record<string, number> = {};
        if (data.contributions) {
          for (const day of data.contributions) {
            if (day.count > 0) {
              map[day.date] = day.count;
            }
          }
        }
        setContributions(map);
        setLoading(false);
      } catch {
        // Fallback: try scraping approach
        try {
          const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}`);
          if (res.ok) {
            const data = await res.json();
            const map: Record<string, number> = {};
            if (data.contributions) {
              for (const day of data.contributions) {
                if (day.count > 0) {
                  map[day.date] = day.count;
                }
              }
            }
            setContributions(map);
          }
        } catch {
          setError(true);
        }
        setLoading(false);
      }
    };
    fetchContributions();
  }, []);

  const { grid, monthLabels, totalContributions } = useMemo(() => {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start = new Date(end);
    start.setDate(start.getDate() - 364);

    // Align start to Sunday
    const dayOfWeek = start.getDay();
    start.setDate(start.getDate() - dayOfWeek);

    const weeks: DayData[][] = [];
    const months: { label: string; col: number }[] = [];
    let total = 0;
    let lastMonth = -1;
    const current = new Date(start);

    while (current <= end || weeks.length < 52) {
      const week: DayData[] = [];
      for (let d = 0; d < DAYS; d++) {
        const dateStr = formatDate(current);
        const count = contributions[dateStr] || 0;
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
  }, [contributions]);

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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            GitHub Activity
          </h2>
          <motion.div
            className="h-1 bg-emerald-500 rounded-full mt-4"
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
          className="rounded-2xl p-6 overflow-x-auto border border-emerald-900/30"
          style={{ background: "#030303" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground text-sm">
              {loading ? (
                <span className="text-muted-foreground">Loading contributions...</span>
              ) : (
                <>
                  <span className="text-white font-semibold">{totalContributions}</span>{" "}
                  contributions in the last year
                </>
              )}
            </p>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-emerald-400 transition-colors font-mono"
            >
              @{USERNAME} <ExternalLink size={12} />
            </a>
          </div>

          {/* Month labels */}
          <div className="relative ml-8 h-5 mb-1">
            {monthLabels.map((m, i) => (
              <span
                key={i}
                className="text-[10px] text-muted-foreground font-mono absolute"
                style={{ left: `${m.col * 16}px` }}
              >
                {m.label}
              </span>
            ))}
          </div>

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
                      className={`w-[13px] h-[13px] rounded-sm ${LEVEL_COLORS[cell.level]} cursor-default`}
                      title={`${cell.count} contributions on ${cell.date}`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.1,
                        delay: wi * 0.005,
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
            {LEGEND_COLORS.map((color, i) => (
              <div
                key={i}
                className={`w-[13px] h-[13px] rounded-sm ${color}`}
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
