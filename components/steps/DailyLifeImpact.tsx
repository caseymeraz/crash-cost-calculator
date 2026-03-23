'use client';

import { motion } from 'framer-motion';
import { DailyLifeImpact as DailyLifeValue } from '@/lib/types';
import { DAILY_LIFE_OPTIONS } from '@/lib/constants';
import { Check } from 'lucide-react';

interface Props {
  impacts: DailyLifeValue[];
  months: number;
  onToggle: (impact: DailyLifeValue) => void;
  onMonthsChange: (months: number) => void;
}

export default function DailyLifeImpact({ impacts, months, onToggle, onMonthsChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Impact on your daily life</h2>
      <p className="text-text-secondary mb-6">
        These are costs most people forget about. They add up quickly.
      </p>

      <div className="space-y-3 mb-8">
        {DAILY_LIFE_OPTIONS.map((opt, i) => {
          const isSelected = impacts.includes(opt.value);
          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onToggle(opt.value)}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                isSelected
                  ? 'border-accent-green bg-accent-green/10'
                  : 'border-border bg-bg-surface hover:bg-bg-surface-hover'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-5 h-5 mt-0.5 rounded flex-shrink-0 flex items-center justify-center border ${
                  isSelected ? 'bg-accent-green border-accent-green' : 'border-text-secondary'
                }`}
              >
                {isSelected && <Check size={14} className="text-bg-primary" />}
              </div>
              <div>
                <span className={`font-medium block ${isSelected ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {opt.label}
                </span>
                <span className="text-text-secondary text-sm">{opt.description}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {impacts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <label className="block text-sm font-semibold mb-2">
            How many months have you needed this extra help?
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={24}
              value={months}
              onChange={(e) => onMonthsChange(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="font-mono text-text-primary font-bold min-w-[80px] text-right">
              {months} {months === 1 ? 'month' : 'months'}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
