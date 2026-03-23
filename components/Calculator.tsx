'use client';

import { AnimatePresence } from 'framer-motion';
import { useCalculator } from '@/lib/useCalculator';
import CostCounter from './CostCounter';
import ProgressBar from './ProgressBar';
import StepWrapper from './StepWrapper';
import ResultsReveal from './ResultsReveal';
import AccidentType from './steps/AccidentType';
import InjurySeverity from './steps/InjurySeverity';
import MedicalTreatment from './steps/MedicalTreatment';
import WorkImpact from './steps/WorkImpact';
import DailyLifeImpact from './steps/DailyLifeImpact';
import EmotionalImpact from './steps/EmotionalImpact';
import FutureCosts from './steps/FutureCosts';
import { STEP_TITLES } from '@/lib/constants';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Calculator() {
  const calc = useCalculator();
  const { state, costs, showResults } = calc;

  const handleLeadSubmit = async (data: { name: string; phone: string; email: string }) => {
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          costBreakdown: costs,
          accidentType: state.accidentType,
        }),
      });
    } catch {
      // Silently fail - lead is still captured in the UI
    }
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 0:
        return (
          <StepWrapper stepKey="accident">
            <AccidentType
              selected={state.accidentType}
              onSelect={calc.setAccidentType}
              onNext={calc.nextStep}
            />
          </StepWrapper>
        );
      case 1:
        return (
          <StepWrapper stepKey="severity">
            <InjurySeverity
              severity={state.injurySeverity}
              bodyParts={state.bodyParts}
              onSeverityChange={calc.setSeverity}
              onToggleBodyPart={calc.toggleBodyPart}
            />
          </StepWrapper>
        );
      case 2:
        return (
          <StepWrapper stepKey="treatment">
            <MedicalTreatment
              treatments={state.treatments}
              quantities={state.treatmentQuantities}
              onToggle={calc.toggleTreatment}
              onQuantityChange={calc.setTreatmentQuantity}
            />
          </StepWrapper>
        );
      case 3:
        return (
          <StepWrapper stepKey="work">
            <WorkImpact
              annualIncome={state.annualIncome}
              missedWorkDays={state.missedWorkDays}
              workCapacityReduction={state.workCapacityReduction}
              jobLost={state.jobLost}
              onIncomeChange={calc.setAnnualIncome}
              onMissedDaysChange={calc.setMissedWorkDays}
              onCapacityChange={calc.setWorkCapacityReduction}
              onJobLostChange={calc.setJobLost}
            />
          </StepWrapper>
        );
      case 4:
        return (
          <StepWrapper stepKey="daily">
            <DailyLifeImpact
              impacts={state.dailyLifeImpacts}
              months={state.dailyLifeMonths}
              onToggle={calc.toggleDailyLifeImpact}
              onMonthsChange={calc.setDailyLifeMonths}
            />
          </StepWrapper>
        );
      case 5:
        return (
          <StepWrapper stepKey="emotional">
            <EmotionalImpact
              impacts={state.emotionalImpacts}
              onToggle={calc.toggleEmotionalImpact}
            />
          </StepWrapper>
        );
      case 6:
        return (
          <StepWrapper stepKey="future">
            <FutureCosts
              needsOngoingCare={state.needsOngoingCare}
              futureYearsOfCare={state.futureYearsOfCare}
              futureSurgeries={state.futureSurgeries}
              permanentEarningReduction={state.permanentEarningReduction}
              onCareChange={calc.setNeedsOngoingCare}
              onYearsChange={calc.setFutureYearsOfCare}
              onSurgeriesChange={calc.setFutureSurgeries}
              onEarningChange={calc.setPermanentEarningReduction}
            />
          </StepWrapper>
        );
      default:
        return null;
    }
  };

  if (showResults) {
    return (
      <div>
        <ResultsReveal costs={costs} onLeadSubmit={handleLeadSubmit} />
        <div className="max-w-2xl mx-auto mt-6 mb-8">
          <button
            onClick={calc.prevStep}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer text-sm"
          >
            <ArrowLeft size={16} /> Back to calculator
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CostCounter total={costs.total} />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-2">
          <ProgressBar currentStep={state.currentStep} />
          <p className="text-text-secondary text-xs mt-2">
            Step {state.currentStep + 1} of 7: {STEP_TITLES[state.currentStep]}
          </p>
        </div>

        <div className="py-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        {/* Navigation - step 0 auto-advances, so hide next for it */}
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <button
            onClick={calc.prevStep}
            disabled={state.currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${
              state.currentStep === 0
                ? 'text-text-secondary/30 cursor-not-allowed'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
            }`}
          >
            <ArrowLeft size={16} /> Back
          </button>

          {state.currentStep > 0 && (
            <button
              onClick={calc.nextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-accent-green/15 text-accent-green font-semibold hover:bg-accent-green/25 transition-all cursor-pointer"
            >
              {state.currentStep === 6 ? 'See My Results' : 'Continue'} <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
