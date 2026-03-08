import { motion } from "framer-motion";
import { Home, FolderOpen, Award, Wrench, Mail, Clock, BarChart3 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { icon: Home, href: "#top", label: "Home" },
  { icon: FolderOpen, href: "#projects", label: "Projects" },
  { icon: Award, href: "#achievements", label: "Achievements" },
  { icon: BarChart3, href: "#skills", label: "Skills" },
  { icon: Clock, href: "#timeline", label: "Timeline" },
  { icon: Wrench, href: "#specs", label: "Specs" },
  { icon: Mail, href: "#contact", label: "Contact" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:block"
    >
      <div className="glass-card flex flex-col items-center gap-1 px-2 py-3 animate-pulse-glow">
        <ThemeToggle />
        {navItems.map((item, i) => (
          <motion.a
            key={item.href}
            href={item.href}
            className="p-3 rounded-xl text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all relative group"
            title={item.label}
            whileHover={{ scale: 1.15, x: 4 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 + i * 0.08 }}
          >
            <item.icon size={18} />
            <span className="absolute left-12 top-1/2 -translate-y-1/2 font-mono-label text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-card/90 backdrop-blur-sm px-2 py-1 rounded-md border border-border/50">
              {item.label}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
