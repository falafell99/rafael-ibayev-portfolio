const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rafael Ibayev. All rights reserved.
        </p>
        <p className="font-mono-label text-muted-foreground">
          Built with passion & precision
        </p>
      </div>
    </footer>
  );
};

export default Footer;
