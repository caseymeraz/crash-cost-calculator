'use client';

import { useState, useMemo, useCallback } from 'react';
import { CalculatorState, AccidentType, InjurySeverity, BodyPart, Treatment, DailyLifeImpact, EmotionalImpact } from './types';
import { calculateCosts } from './calculations';
import { TOTAL_STEPS } from './constants';

const initialState: CalculatorState = {
  currentStep: 0,
  accidentType: null,
  injurySeverity: null,
  bodyParts: [],
  treatments: [],
  treatmentQuantities: {},
  annualIncome: 55000,
  missedWorkDays: 0,
  workCapacityReduction: 0,
  jobLost: false,
  dailyLifeImpacts: [],
  dailyLifeMonths: 3,
  emotionalImpacts: [],
  needsOngoingCare: false,
  futureYearsOfCare: 5,
  futureSurgeries: false,
  permanentEarningReduction: false,
};

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [showResults, setShowResults] = useState(false);

  const costs = useMemo(() => calculateCosts(state), [state]);

  const setAccidentType = useCallback((type: AccidentType) => {
    setState(s => ({ ...s, accidentType: type }));
  }, []);

  const setSeverity = useCallback((severity: InjurySeverity) => {
    setState(s => ({ ...s, injurySeverity: severity }));
  }, []);

  const toggleBodyPart = useCallback((part: BodyPart) => {
    setState(s => ({
      ...s,
      bodyParts: s.bodyParts.includes(part)
        ? s.bodyParts.filter(p => p !== part)
        : [...s.bodyParts, part],
    }));
  }, []);

  const toggleTreatment = useCallback((treatment: Treatment) => {
    setState(s => ({
      ...s,
      treatments: s.treatments.includes(treatment)
        ? s.treatments.filter(t => t !== treatment)
        : [...s.treatments, treatment],
    }));
  }, []);

  const setTreatmentQuantity = useCallback((treatment: Treatment, qty: number) => {
    setState(s => ({
      ...s,
      treatmentQuantities: { ...s.treatmentQuantities, [treatment]: qty },
    }));
  }, []);

  const setAnnualIncome = useCallback((income: number) => {
    setState(s => ({ ...s, annualIncome: income }));
  }, []);

  const setMissedWorkDays = useCallback((days: number) => {
    setState(s => ({ ...s, missedWorkDays: days }));
  }, []);

  const setWorkCapacityReduction = useCallback((pct: number) => {
    setState(s => ({ ...s, workCapacityReduction: pct }));
  }, []);

  const setJobLost = useCallback((lost: boolean) => {
    setState(s => ({ ...s, jobLost: lost }));
  }, []);

  const toggleDailyLifeImpact = useCallback((impact: DailyLifeImpact) => {
    setState(s => ({
      ...s,
      dailyLifeImpacts: s.dailyLifeImpacts.includes(impact)
        ? s.dailyLifeImpacts.filter(i => i !== impact)
        : [...s.dailyLifeImpacts, impact],
    }));
  }, []);

  const setDailyLifeMonths = useCallback((months: number) => {
    setState(s => ({ ...s, dailyLifeMonths: months }));
  }, []);

  const toggleEmotionalImpact = useCallback((impact: EmotionalImpact) => {
    setState(s => ({
      ...s,
      emotionalImpacts: s.emotionalImpacts.includes(impact)
        ? s.emotionalImpacts.filter(i => i !== impact)
        : [...s.emotionalImpacts, impact],
    }));
  }, []);

  const setNeedsOngoingCare = useCallback((needs: boolean) => {
    setState(s => ({ ...s, needsOngoingCare: needs }));
  }, []);

  const setFutureYearsOfCare = useCallback((years: number) => {
    setState(s => ({ ...s, futureYearsOfCare: years }));
  }, []);

  const setFutureSurgeries = useCallback((needs: boolean) => {
    setState(s => ({ ...s, futureSurgeries: needs }));
  }, []);

  const setPermanentEarningReduction = useCallback((has: boolean) => {
    setState(s => ({ ...s, permanentEarningReduction: has }));
  }, []);

  const nextStep = useCallback(() => {
    setState(s => {
      if (s.currentStep >= TOTAL_STEPS - 1) {
        setShowResults(true);
        return s;
      }
      return { ...s, currentStep: s.currentStep + 1 };
    });
  }, []);

  const prevStep = useCallback(() => {
    if (showResults) {
      setShowResults(false);
      return;
    }
    setState(s => ({
      ...s,
      currentStep: Math.max(0, s.currentStep - 1),
    }));
  }, [showResults]);

  return {
    state,
    costs,
    showResults,
    setAccidentType,
    setSeverity,
    toggleBodyPart,
    toggleTreatment,
    setTreatmentQuantity,
    setAnnualIncome,
    setMissedWorkDays,
    setWorkCapacityReduction,
    setJobLost,
    toggleDailyLifeImpact,
    setDailyLifeMonths,
    toggleEmotionalImpact,
    setNeedsOngoingCare,
    setFutureYearsOfCare,
    setFutureSurgeries,
    setPermanentEarningReduction,
    nextStep,
    prevStep,
  };
}
