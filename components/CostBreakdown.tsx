'use client';

import { motion } from 'framer-motion';
import { CostBreakdown as CostBreakdownType } from '@/lib/types';
import { formatCurrency } from '@/lib/formatCurrency';

interface Props {
  costs: CostBreakdownType;
}

const CATEGORIES: { key: keyof Omit<CostBreakdownType, 'total'>; label: string; color: string }[] = [
  { key: 'medicalToDate', label: 'Medical Bills', color: '#F87171' },
  { key: 'injurySurcharges', label: 'Injury Complexity', color: '#FB923C' },
  { key: 'lostWages', label: 'Lost Wages', color: '#FBBF24' },
  { key: 'dailyLifeCosts', label: 'Daily Life Costs', color: '#A78BFA' },
  { key: 'emotionalCosts', label: 'Mental Health', color: '#C084FC' },
  { key: 'painAndSuffering', label: 'Pain & Suffering', color: '#22D3EE' },
  { key: 'futureMedical', label: 'Future Medical', color: '#4ADE80' },
  { key: 'futureLostEarnings', label: 'Future Lost Earnings', color: '#34D399' },
];

export default function CostBreakdown({ costs }: Props) {
  const max = Math.max(...CATEGORIES.map(c => costs[c.key]), 1);
  const nonZero = CATEGORIES.filter(c => costs[c.key] > 0);

  return (
    <div className="space-y-3">
      {nonZero.map((cat, i) => {
        const value = costs[cat.key];
        const pct = (value / max) * 100;
        return (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">{cat.label}</span>
              <span className="font-mono font-bold" style={{ color: cat.color }}>
                {formatCurrency(value)}
              </span>
            </div>
            <div className="h-3 bg-border/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: cat.color }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
