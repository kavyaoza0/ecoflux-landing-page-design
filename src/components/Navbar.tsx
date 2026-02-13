import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["Solutions", "How It Works", "Impact", "Use Cases"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <button onClick={() => scrollTo("hero")} className="text-xl sm:text-2xl font-bold tracking-tight group">
          <span className="text-gradient group-hover:opacity-80 transition-opacity">Green</span>
          <span className="text-foreground">Pulse</span>
        </button>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase().replace(/\s/g, "-"))}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <button
            onClick={() => scrollTo("cta")}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors relative group"
          >
            Get Started
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
          </button>
        </div>

        <button className="md:hidden text-foreground p-1" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass mx-3 sm:mx-4 mt-2 rounded-lg overflow-hidden"
          >
            <div className="p-3 sm:p-4 space-y-1 sm:space-y-3">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.toLowerCase().replace(/\s/g, "-"))}
                  className="block w-full text-left text-sm text-muted-foreground hover:text-foreground py-2 hover:pl-2 transition-all duration-200"
                >
                  {item}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                onClick={() => scrollTo("cta")}
                className="block w-full text-left text-sm font-medium text-primary py-2"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
