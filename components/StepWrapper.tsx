'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StepWrapperProps {
  children: ReactNode;
  stepKey: string;
}

export default function StepWrapper({ children, stepKey }: StepWrapperProps) {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
