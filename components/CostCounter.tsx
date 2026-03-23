'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { formatCurrency } from '@/lib/formatCurrency';

interface CostCounterProps {
  total: number;
  label?: string;
}

export default function CostCounter({ total, label = 'Estimated total cost' }: CostCounterProps) {
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const display = useTransform(spring, (v) => formatCurrency(Math.round(v)));
  const [displayValue, setDisplayValue] = useState('$0');
  const [isGlowing, setIsGlowing] = useState(false);
  const prevTotal = useRef(0);

  useEffect(() => {
    const jump = total - prevTotal.current;
    if (jump > 10000) {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 1500);
    }
    prevTotal.current = total;
    spring.set(total);
  }, [total, spring]);

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setDisplayValue(v));
    return unsubscribe;
  }, [display]);

  return (
    <div className="sticky top-0 z-50 w-full bg-bg-primary/90 backdrop-blur-md border-b border-border py-4 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-text-secondary text-sm mb-1">{label}</p>
        <motion.div
          className={`text-4xl md:text-5xl font-bold font-mono tabular-nums tracking-tight ${
            isGlowing ? 'glow-pulse' : ''
          }`}
          style={{ color: total > 0 ? '#4ADE80' : '#F0F0F5' }}
          animate={isGlowing ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          {displayValue}
        </motion.div>
      </div>
    </div>
  );
}
