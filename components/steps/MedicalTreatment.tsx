'use client';

import { motion } from 'framer-motion';
import { Treatment } from '@/lib/types';
import { TREATMENTS } from '@/lib/constants';
import { Check } from 'lucide-react';

interface Props {
  treatments: Treatment[];
  quantities: Partial<Record<Treatment, number>>;
  onToggle: (t: Treatment) => void;
  onQuantityChange: (t: Treatment, qty: number) => void;
}

export default function MedicalTreatment({ treatments, quantities, onToggle, onQuantityChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Medical treatment received</h2>
      <p className="text-text-secondary mb-6">Select all treatments you have received or are currently receiving.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TREATMENTS.map((t, i) => {
          const isSelected = treatments.includes(t.value);
          return (
            <motion.div
              key={t.value}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <button
                onClick={() => onToggle(t.value)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'border-accent-green bg-accent-green/10'
                    : 'border-border bg-bg-surface hover:bg-bg-surface-hover'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border ${
                    isSelected ? 'bg-accent-green border-accent-green' : 'border-text-secondary'
                  }`}
                >
                  {isSelected && <Check size={14} className="text-bg-primary" />}
                </div>
                <span className={`font-medium text-sm ${isSelected ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {t.label}
                </span>
              </button>
              {isSelected && t.hasQuantity && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-2 ml-8 flex items-center gap-2"
                >
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={quantities[t.value] ?? ''}
                    placeholder="#"
                    onChange={(e) => onQuantityChange(t.value, parseInt(e.target.value) || 1)}
                    className="w-20 bg-bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent-green"
                  />
                  <span className="text-text-secondary text-sm">{t.quantityLabel}</span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
