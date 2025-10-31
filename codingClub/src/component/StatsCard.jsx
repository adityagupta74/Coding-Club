import { motion } from "framer-motion";
import { useState } from "react";

export default function StatsCard({ title, value, color, icon }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={`stats-card ${color}`}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-2 opacity-75">{title}</h6>
          <motion.h2 
            className="fw-bold mb-0"
            animate={{ scale: isHovered ? 1.1 : 1 }}
          >
            {value}
          </motion.h2>
        </div>
        <motion.div 
          className="fs-1"
          animate={{ 
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
}
