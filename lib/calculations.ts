import { CalculatorState, CostBreakdown, BodyPart, Treatment, DailyLifeImpact, EmotionalImpact, InjurySeverity } from './types';

const TREATMENT_COSTS: Record<Treatment, number> = {
  emergency_room: 5500,
  ambulance: 1500,
  hospital_stay: 4500,       // per night
  surgery: 50000,            // per surgery
  physical_therapy: 350,     // per session
  chiropractic: 250,         // per visit
  medications: 1800,
  imaging_xray: 1200,
  imaging_mri: 3000,
  specialist_visits: 500,    // per visit
  mental_health_therapy: 225, // per session
};

const TREATMENT_DEFAULT_QTY: Partial<Record<Treatment, number>> = {
  hospital_stay: 3,
  surgery: 1,
  physical_therapy: 24,
  chiropractic: 18,
  specialist_visits: 6,
  mental_health_therapy: 12,
};

const BODY_PART_COSTS: Record<BodyPart, number> = {
  head_brain: 15000,
  neck_spine: 12000,
  back: 8000,
  shoulder: 6000,
  knee: 7000,
  hip: 9000,
  wrist_hand: 4000,
  ankle_foot: 5000,
  ribs_chest: 6000,
  internal_organs: 20000,
};

const SEVERITY_MULTIPLIERS: Record<InjurySeverity, { medical: number; painSuffering: number }> = {
  minor: { medical: 1.0, painSuffering: 1.5 },
  moderate: { medical: 1.5, painSuffering: 3.0 },
  severe: { medical: 2.5, painSuffering: 5.0 },
  catastrophic: { medical: 4.0, painSuffering: 7.0 },
};

const DAILY_LIFE_MONTHLY_COSTS: Record<DailyLifeImpact, number> = {
  childcare: 1500,
  household_help: 600,
  transportation: 400,
  home_modifications: 2000,  // one-time
  assistive_devices: 800,    // one-time
};

const ONE_TIME_DAILY_LIFE: DailyLifeImpact[] = ['home_modifications', 'assistive_devices'];

const EMOTIONAL_THERAPY_COSTS: Record<EmotionalImpact, { sessions: number; costPerSession: number }> = {
  anxiety: { sessions: 24, costPerSession: 225 },
  depression: { sessions: 30, costPerSession: 225 },
  ptsd: { sessions: 40, costPerSession: 250 },
  sleep_disorders: { sessions: 12, costPerSession: 200 },
  relationship_strain: { sessions: 0, costPerSession: 0 },
  loss_of_enjoyment: { sessions: 0, costPerSession: 0 },
};

// Qualitative impacts that boost the pain/suffering multiplier
const PAIN_SUFFERING_BOOSTERS: EmotionalImpact[] = ['relationship_strain', 'loss_of_enjoyment'];
const PAIN_SUFFERING_BOOST = 0.5; // each adds 0.5x to multiplier

export function calculateCosts(state: CalculatorState): CostBreakdown {
  const severity = state.injurySeverity ? SEVERITY_MULTIPLIERS[state.injurySeverity] : { medical: 1, painSuffering: 1.5 };

  // Medical costs from treatments
  let medicalToDate = 0;
  for (const treatment of state.treatments) {
    const baseCost = TREATMENT_COSTS[treatment];
    const defaultQty = TREATMENT_DEFAULT_QTY[treatment];
    if (defaultQty) {
      const qty = state.treatmentQuantities[treatment] ?? defaultQty;
      medicalToDate += baseCost * qty;
    } else {
      medicalToDate += baseCost;
    }
  }

  // Apply severity multiplier to medical
  medicalToDate = Math.round(medicalToDate * severity.medical);

  // Body part injury surcharges
  const injurySurcharges = state.bodyParts.reduce((sum, part) => sum + BODY_PART_COSTS[part], 0);

  // Lost wages
  const dailyRate = state.annualIncome / 260;
  let lostWages = Math.round(dailyRate * state.missedWorkDays);
  if (state.jobLost) {
    // Assume 10 years of lost future earnings at reduced capacity
    lostWages += Math.round(state.annualIncome * 10 * (state.workCapacityReduction / 100));
  } else if (state.workCapacityReduction > 0) {
    // 3 years of reduced capacity
    lostWages += Math.round(state.annualIncome * 3 * (state.workCapacityReduction / 100));
  }

  // Daily life costs
  let dailyLifeCosts = 0;
  for (const impact of state.dailyLifeImpacts) {
    if (ONE_TIME_DAILY_LIFE.includes(impact)) {
      dailyLifeCosts += DAILY_LIFE_MONTHLY_COSTS[impact];
    } else {
      dailyLifeCosts += DAILY_LIFE_MONTHLY_COSTS[impact] * state.dailyLifeMonths;
    }
  }

  // Emotional/mental health costs
  let emotionalCosts = 0;
  for (const impact of state.emotionalImpacts) {
    const cost = EMOTIONAL_THERAPY_COSTS[impact];
    emotionalCosts += cost.sessions * cost.costPerSession;
  }

  // Pain and suffering (multiplier method)
  const totalEconomic = medicalToDate + injurySurcharges + lostWages + dailyLifeCosts + emotionalCosts;
  const painBoosterCount = state.emotionalImpacts.filter(i => PAIN_SUFFERING_BOOSTERS.includes(i)).length;
  const painMultiplier = severity.painSuffering + (painBoosterCount * PAIN_SUFFERING_BOOST);
  const painAndSuffering = Math.round(totalEconomic * painMultiplier);

  // Future costs
  let futureMedical = 0;
  let futureLostEarnings = 0;
  if (state.needsOngoingCare) {
    const annualMedical = medicalToDate * 0.4; // 40% of current medical annually
    for (let year = 1; year <= state.futureYearsOfCare; year++) {
      futureMedical += annualMedical * Math.pow(1.03, year); // 3% inflation
    }
    futureMedical = Math.round(futureMedical);
  }
  if (state.futureSurgeries) {
    futureMedical += 75000;
  }
  if (state.permanentEarningReduction) {
    // 15 years of 30% reduced earnings
    for (let year = 1; year <= 15; year++) {
      futureLostEarnings += state.annualIncome * 0.3 * Math.pow(1.03, year);
    }
    futureLostEarnings = Math.round(futureLostEarnings);
  }

  const total = medicalToDate + injurySurcharges + lostWages + dailyLifeCosts + emotionalCosts + painAndSuffering + futureMedical + futureLostEarnings;

  return {
    medicalToDate,
    injurySurcharges,
    lostWages,
    dailyLifeCosts,
    emotionalCosts,
    painAndSuffering,
    futureMedical,
    futureLostEarnings,
    total,
  };
}
