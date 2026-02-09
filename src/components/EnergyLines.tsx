import { motion } from "framer-motion";

const EnergyLines = () => {
  const lines = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{
            top: `${20 + i * 15}%`,
            left: "-10%",
            width: "120%",
          }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default EnergyLines;
