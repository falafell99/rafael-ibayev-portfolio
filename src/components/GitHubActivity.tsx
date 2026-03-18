import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { ExternalLink } from "lucide-react";
import GitHubCalendar from "react-github-calendar";
import type { Activity } from "react-github-calendar";

const USERNAME = "falafell99";

const EMERALD_THEME = {
  dark: ["#0a0a0a", "#064e3b", "#047857", "#059669", "#10B981"],
  light: ["#0a0a0a", "#064e3b", "#047857", "#059669", "#10B981"],
};

const LEGEND_COLORS = ["#0a0a0a", "#064e3b", "#047857", "#059669", "#10B981"];

const GitHubActivity = () => {
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const handleTransformData = useCallback((contributions: Activity[]) => {
    const total = contributions.reduce((sum, day) => sum + day.count, 0);
    setTotalCount(total);
    return contributions;
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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
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
          className="rounded-2xl p-6 overflow-x-auto border border-border/30 backdrop-blur-sm"
          style={{ background: "#101010" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground text-sm">
              {totalCount !== null ? (
                <>
                  <span className="text-foreground font-semibold">{totalCount}</span>{" "}
                  contributions in the last year
                </>
              ) : (
                <span className="text-muted-foreground">Loading contributions...</span>
              )}
            </p>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              @{USERNAME} <ExternalLink size={12} />
            </a>
          </div>

          <div className="github-calendar-wrapper">
            <GitHubCalendar
              username={USERNAME}
              colorScheme="dark"
              theme={EMERALD_THEME}
              blockSize={13}
              blockMargin={4}
              blockRadius={2}
              fontSize={11}
              hideColorLegend
              hideMonthLabels={false}
              hideTotalCount
              transformData={handleTransformData}
              style={{ width: "100%" }}
            />
          </div>

          {/* Custom Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-[10px] text-muted-foreground font-mono">Less</span>
            {LEGEND_COLORS.map((color, i) => (
              <div
                key={i}
                className="w-[13px] h-[13px] rounded-sm"
                style={{
                  background: color,
                  border: i === 0 ? "1px solid #1a1a1a" : "none",
                }}
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
