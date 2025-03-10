import { motion, AnimatePresence } from "framer-motion";

export default function AnimationWrapper({ children }) {
  return (
    <div className="relative overflow-x-hidden">
    <AnimatePresence>
      <motion.div
       initial={{ x: 300, opacity: 0 }}
       animate={{ x: 0, opacity: 1 }}
       transition={{ type: "spring", stiffness: 100 }}
        className="!overflow-x-hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
    </div>
  );
}
