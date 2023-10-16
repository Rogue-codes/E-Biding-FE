import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";
interface BackDropProps {
  children: ReactNode;
}
export default function ModalBackdrop({ children }: BackDropProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
      ref={scrollRef}
      className="w-full flex pt-56 pb-4 justify-center items-center h-screen fixed left-0 top-0 bg-[#00000068] overflow-y-scroll"
    >
      {children}
    </motion.div>
  );
}
