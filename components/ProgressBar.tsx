'use client';

import { motion } from 'framer-motion';
import { TOTAL_STEPS } from '@/lib/constants';

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, #F87171, #FBBF24, #4ADE80)',
        }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}
