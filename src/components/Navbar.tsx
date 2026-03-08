import { motion } from "framer-motion";
import { Home, FolderOpen, Award, Wrench, Mail, Clock } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { icon: Home, href: "#top", label: "Home" },
  { icon: FolderOpen, href: "#projects", label: "Projects" },
  { icon: Award, href: "#achievements", label: "Achievements" },
  { icon: Clock, href: "#timeline", label: "Timeline" },
  { icon: Wrench, href: "#specs", label: "Specs" },
  { icon: Mail, href: "#contact", label: "Contact" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-card flex items-center justify-center gap-1 px-3 py-2 animate-pulse-glow">
        <ThemeToggle />
        {navItems.map((item, i) => (
          <motion.a
            key={item.href}
            href={item.href}
            className="p-3 rounded-xl text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all relative group"
            title={item.label}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 + i * 0.08 }}
          >
            <item.icon size={18} />
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono-label text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
