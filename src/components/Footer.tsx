const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-gradient">Eco</span>
          <span className="text-foreground">Flux</span>
        </div>
        <div className="flex gap-8 text-sm text-muted-foreground">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 EcoFlux. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
