'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CostBreakdown as CostBreakdownType } from '@/lib/types';
import { formatCurrency } from '@/lib/formatCurrency';
import CostBreakdown from './CostBreakdown';
import LeadCaptureForm from './LeadCaptureForm';
import { AlertTriangle } from 'lucide-react';

interface Props {
  costs: CostBreakdownType;
  onLeadSubmit: (data: { name: string; phone: string; email: string }) => void;
}

export default function ResultsReveal({ costs, onLeadSubmit }: Props) {
  const [countUp, setCountUp] = useState(0);
  const [showAndCounting, setShowAndCounting] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    const duration = 3000;
    const steps = 60;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve
      const progress = 1 - Math.pow(1 - step / steps, 3);
      const current = costs.total * progress;
      setCountUp(Math.round(current));

      if (step >= steps) {
        clearInterval(timer);
        setCountUp(costs.total);
        setTimeout(() => setShowAndCounting(true), 400);
        setTimeout(() => setShowBreakdown(true), 1000);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [costs.total]);

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 md:py-12"
      >
        <p className="text-text-secondary text-lg mb-4">Your accident has already cost you</p>
        <motion.div
          className="text-5xl md:text-7xl font-bold font-mono tabular-nums text-accent-green glow-pulse mb-2"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {formatCurrency(countUp)}
        </motion.div>
        {showAndCounting && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-text-secondary text-lg"
          >
            ...and counting
          </motion.p>
        )}
      </motion.div>

      {showBreakdown && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Cost Breakdown</h3>
            <CostBreakdown costs={costs} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-accent-red/10 border border-accent-red/30 rounded-xl p-4 flex items-start gap-3"
          >
            <AlertTriangle size={20} className="text-accent-red flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-accent-red font-semibold text-sm">Time is limited</p>
              <p className="text-text-secondary text-sm">
                Every state has a statute of limitations for personal injury claims. Once it passes, you
                lose the right to seek compensation forever. Do not wait.
              </p>
            </div>
          </motion.div>

          <LeadCaptureForm onSubmit={onLeadSubmit} />
        </motion.div>
      )}
    </div>
  );
}
