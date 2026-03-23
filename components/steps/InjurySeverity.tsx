'use client';

import { motion } from 'framer-motion';
import { InjurySeverity as SeverityValue, BodyPart } from '@/lib/types';
import { SEVERITY_OPTIONS, BODY_PARTS } from '@/lib/constants';

interface Props {
  severity: SeverityValue | null;
  bodyParts: BodyPart[];
  onSeverityChange: (s: SeverityValue) => void;
  onToggleBodyPart: (p: BodyPart) => void;
}

const SEVERITY_COLORS: Record<SeverityValue, string> = {
  minor: 'border-yellow-400 bg-yellow-400/10 text-yellow-400',
  moderate: 'border-orange-400 bg-orange-400/10 text-orange-400',
  severe: 'border-red-400 bg-red-400/10 text-red-400',
  catastrophic: 'border-red-600 bg-red-600/10 text-red-500',
};

export default function InjurySeverity({ severity, bodyParts, onSeverityChange, onToggleBodyPart }: Props) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Tell us about your injuries</h2>
      <p className="text-text-secondary mb-6">This helps estimate the full scope of your medical costs.</p>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">How severe were your injuries?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SEVERITY_OPTIONS.map((opt, i) => {
            const isSelected = severity === opt.value;
            return (
              <motion.button
                key={opt.value}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSeverityChange(opt.value)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? SEVERITY_COLORS[opt.value]
                    : 'border-border bg-bg-surface hover:bg-bg-surface-hover'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-semibold block mb-1">{opt.label}</span>
                <span className={`text-sm ${isSelected ? 'opacity-90' : 'text-text-secondary'}`}>
                  {opt.description}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">What parts of your body were injured?</h3>
        <p className="text-text-secondary text-sm mb-3">Select all that apply.</p>
        <div className="flex flex-wrap gap-2">
          {BODY_PARTS.map((part, i) => {
            const isSelected = bodyParts.includes(part.value);
            return (
              <motion.button
                key={part.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => onToggleBodyPart(part.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-accent-cyan bg-accent-cyan/15 text-accent-cyan'
                    : 'border-border bg-bg-surface hover:bg-bg-surface-hover text-text-secondary hover:text-text-primary'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {part.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
