'use client';

import { motion } from 'framer-motion';

interface Props {
  needsOngoingCare: boolean;
  futureYearsOfCare: number;
  futureSurgeries: boolean;
  permanentEarningReduction: boolean;
  onCareChange: (v: boolean) => void;
  onYearsChange: (v: number) => void;
  onSurgeriesChange: (v: boolean) => void;
  onEarningChange: (v: boolean) => void;
}

function YesNo({ value, onChange, yesLabel = 'Yes', noLabel = 'No' }: { value: boolean; onChange: (v: boolean) => void; yesLabel?: string; noLabel?: string }) {
  return (
    <div className="flex gap-3">
      {[true, false].map((val) => (
        <button
          key={String(val)}
          onClick={() => onChange(val)}
          className={`px-6 py-2.5 rounded-lg border font-medium transition-all cursor-pointer ${
            value === val
              ? val
                ? 'border-accent-red bg-accent-red/10 text-accent-red'
                : 'border-accent-green bg-accent-green/10 text-accent-green'
              : 'border-border bg-bg-surface hover:bg-bg-surface-hover text-text-secondary'
          }`}
        >
          {val ? yesLabel : noLabel}
        </button>
      ))}
    </div>
  );
}

export default function FutureCosts({
  needsOngoingCare, futureYearsOfCare, futureSurgeries, permanentEarningReduction,
  onCareChange, onYearsChange, onSurgeriesChange, onEarningChange,
}: Props) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Looking ahead</h2>
      <p className="text-text-secondary mb-8">
        Future costs are often the largest part of an injury claim. This is where the real numbers show up.
      </p>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-semibold mb-3">
            Will you need ongoing medical care?
          </label>
          <YesNo value={needsOngoingCare} onChange={onCareChange} />
        </div>

        {needsOngoingCare && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <label className="block text-sm font-semibold mb-2">
              For how many years?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={1}
                max={30}
                value={futureYearsOfCare}
                onChange={(e) => onYearsChange(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="font-mono text-text-primary font-bold min-w-[70px] text-right">
                {futureYearsOfCare} {futureYearsOfCare === 1 ? 'year' : 'years'}
              </span>
            </div>
          </motion.div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-3">
            Do you expect future surgeries or procedures?
          </label>
          <YesNo value={futureSurgeries} onChange={onSurgeriesChange} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-3">
            Will your earning capacity be permanently reduced?
          </label>
          <YesNo value={permanentEarningReduction} onChange={onEarningChange} />
          {permanentEarningReduction && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-accent-red text-sm mt-2"
            >
              Permanent earning reduction can be the single largest component of your claim.
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
