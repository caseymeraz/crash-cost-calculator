'use client';

import { motion } from 'framer-motion';
import { EmotionalImpact as EmotionalValue } from '@/lib/types';
import { EMOTIONAL_OPTIONS } from '@/lib/constants';

interface Props {
  impacts: EmotionalValue[];
  onToggle: (impact: EmotionalValue) => void;
}

export default function EmotionalImpact({ impacts, onToggle }: Props) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Emotional and mental health</h2>
      <p className="text-text-secondary mb-6">
        Injuries affect more than your body. These non-economic damages are real and legally compensable.
      </p>

      <div className="space-y-3">
        {EMOTIONAL_OPTIONS.map((opt, i) => {
          const isSelected = impacts.includes(opt.value);
          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onToggle(opt.value)}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-purple-400 bg-purple-400/10'
                  : 'border-border bg-bg-surface hover:bg-bg-surface-hover'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`font-medium block ${isSelected ? 'text-purple-300' : 'text-text-secondary'}`}>
                {opt.label}
              </span>
              <span className="text-text-secondary text-sm">{opt.description}</span>
            </motion.button>
          );
        })}
      </div>

      {impacts.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-text-secondary text-sm border-l-2 border-purple-400 pl-4"
        >
          Each of these conditions may require professional treatment and can significantly increase the
          compensable value of your claim.
        </motion.p>
      )}
    </div>
  );
}
