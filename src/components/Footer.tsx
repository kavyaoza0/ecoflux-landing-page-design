import { motion } from "framer-motion";

const footerLinks = ["Privacy", "Terms", "Contact"];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="border-t border-border/50 py-8 sm:py-12 px-4 sm:px-6"
    >
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-xl font-bold tracking-tight cursor-pointer"
        >
          <span className="text-gradient">Eco</span>
          <span className="text-foreground">Flux</span>
        </motion.div>
        <div className="flex gap-6 sm:gap-8 text-sm text-muted-foreground">
          {footerLinks.map((link, i) => (
            <motion.span
              key={link}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="hover:text-foreground transition-colors duration-300 cursor-pointer relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
            </motion.span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">© 2026 EcoFlux. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
