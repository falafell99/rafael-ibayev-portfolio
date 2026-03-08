import { motion } from "framer-motion";
import { Home, FolderOpen, Award, Wrench, Mail } from "lucide-react";

const navItems = [
  { icon: Home, href: "#top", label: "Home" },
  { icon: FolderOpen, href: "#projects", label: "Projects" },
  { icon: Award, href: "#achievements", label: "Achievements" },
  { icon: Wrench, href: "#specs", label: "Specs" },
  { icon: Mail, href: "#contact", label: "Contact" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-card flex items-center gap-1 px-2 py-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="p-3 rounded-xl text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all"
            title={item.label}
          >
            <item.icon size={18} />
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
