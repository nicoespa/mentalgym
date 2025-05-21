"use client";
import { motion } from "framer-motion";

export default function TestMotion() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ background: "#eee", padding: 32, borderRadius: 8, margin: 32 }}
    >
      ¡Hola desde Framer Motion!
    </motion.div>
  );
} 