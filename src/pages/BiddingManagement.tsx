import { useRef } from "react";
import { motion } from "framer-motion";
export default function BiddingManagement() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: .5 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
      ref={scrollRef}
      className="w-[80%] left-[20%] h-[95vh] overflow-y-[20] fixed top-0 flex justify-center items-center"
    >
      BiddingManagement
    </motion.div>
  );
}
