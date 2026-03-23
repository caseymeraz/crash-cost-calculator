'use client';

import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/formatCurrency';

interface Props {
  annualIncome: number;
  missedWorkDays: number;
  workCapacityReduction: number;
  jobLost: boolean;
  onIncomeChange: (v: number) => void;
  onMissedDaysChange: (v: number) => void;
  onCapacityChange: (v: number) => void;
  onJobLostChange: (v: boolean) => void;
}

export default function WorkImpact({
  annualIncome, missedWorkDays, workCapacityReduction, jobLost,
  onIncomeChange, onMissedDaysChange, onCapacityChange, onJobLostChange,
}: Props) {
  const dailyRate = annualIncome / 260;
  const lostFromMissed = Math.round(dailyRate * missedWorkDays);

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">How has this affected your work?</h2>
      <p className="text-text-secondary mb-8">Lost income is one of the largest hidden costs of an accident.</p>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Annual income before the accident
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={300000}
              step={5000}
              value={annualIncome}
              onChange={(e) => onIncomeChange(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="font-mono text-accent-green font-bold min-w-[100px] text-right">
              {formatCurrency(annualIncome)}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Days of work missed
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={365}
              step={1}
              value={missedWorkDays}
              onChange={(e) => onMissedDaysChange(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="font-mono text-text-primary font-bold min-w-[70px] text-right">
              {missedWorkDays} days
            </span>
          </div>
          {lostFromMissed > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-accent-red text-sm mt-2"
            >
              That is {formatCurrency(lostFromMissed)} in lost wages alone.
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Has your ability to work been reduced?
          </label>
          <div className="flex items-center gap-4 mb-3">
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={workCapacityReduction}
              onChange={(e) => onCapacityChange(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="font-mono text-text-primary font-bold min-w-[50px] text-right">
              {workCapacityReduction}%
            </span>
          </div>
          {workCapacityReduction > 0 && (
            <p className="text-text-secondary text-sm">
              A {workCapacityReduction}% reduction in earning capacity has significant long-term financial consequences.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-3">
            Did you lose your job because of this accident?
          </label>
          <div className="flex gap-3">
            {[true, false].map((val) => (
              <button
                key={String(val)}
                onClick={() => onJobLostChange(val)}
                className={`px-6 py-2.5 rounded-lg border font-medium transition-all cursor-pointer ${
                  jobLost === val
                    ? val
                      ? 'border-accent-red bg-accent-red/10 text-accent-red'
                      : 'border-accent-green bg-accent-green/10 text-accent-green'
                    : 'border-border bg-bg-surface hover:bg-bg-surface-hover text-text-secondary'
                }`}
              >
                {val ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
