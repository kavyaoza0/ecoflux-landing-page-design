import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
}

export const TextReveal = ({ children, delay = 0 }: TextRevealProps) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
