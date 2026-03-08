import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12 px-6 border-t border-border relative"
    >
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rafael Ibayev. All rights reserved.
        </p>
        <motion.p
          className="font-mono-label text-muted-foreground"
          whileHover={{ color: "hsl(24 100% 50%)" }}
        >
          Built with passion & precision
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
