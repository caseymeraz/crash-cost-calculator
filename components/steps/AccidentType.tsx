'use client';

import { motion } from 'framer-motion';
import { Car, Truck, Bike, PersonStanding, HardHat, Stethoscope, Footprints, AlertCircle, LucideIcon } from 'lucide-react';
import { AccidentType as AccidentTypeValue } from '@/lib/types';
import { ACCIDENT_TYPES } from '@/lib/constants';

const ICONS: Record<string, LucideIcon> = {
  Car, Truck, Bike, PersonStanding, HardHat, Stethoscope, Footprints, AlertCircle,
};

interface Props {
  selected: AccidentTypeValue | null;
  onSelect: (type: AccidentTypeValue) => void;
  onNext: () => void;
}

export default function AccidentType({ selected, onSelect, onNext }: Props) {
  const handleSelect = (type: AccidentTypeValue) => {
    onSelect(type);
    setTimeout(onNext, 500);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">What happened to you?</h2>
      <p className="text-text-secondary mb-8">Select the type of accident you were involved in.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ACCIDENT_TYPES.map((type, i) => {
          const Icon = ICONS[type.icon];
          const isSelected = selected === type.value;
          return (
            <motion.button
              key={type.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleSelect(type.value)}
              className={`relative flex flex-col items-center gap-3 p-5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-accent-green bg-accent-green/10'
                  : 'border-border bg-bg-surface hover:bg-bg-surface-hover hover:border-text-secondary'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {Icon && <Icon size={28} className={isSelected ? 'text-accent-green' : 'text-text-secondary'} />}
              <span className={`text-sm font-medium text-center ${isSelected ? 'text-accent-green' : ''}`}>
                {type.label}
              </span>
              {isSelected && (
                <motion.div
                  layoutId="accident-check"
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent-green flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#0A0A0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
