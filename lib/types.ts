export type AccidentType =
  | 'car_crash'
  | 'truck_accident'
  | 'motorcycle'
  | 'slip_and_fall'
  | 'workplace'
  | 'medical_malpractice'
  | 'pedestrian_bicycle'
  | 'other';

export type InjurySeverity = 'minor' | 'moderate' | 'severe' | 'catastrophic';

export type BodyPart =
  | 'head_brain'
  | 'neck_spine'
  | 'back'
  | 'shoulder'
  | 'knee'
  | 'hip'
  | 'wrist_hand'
  | 'ankle_foot'
  | 'ribs_chest'
  | 'internal_organs';

export type Treatment =
  | 'emergency_room'
  | 'ambulance'
  | 'hospital_stay'
  | 'surgery'
  | 'physical_therapy'
  | 'chiropractic'
  | 'medications'
  | 'imaging_xray'
  | 'imaging_mri'
  | 'specialist_visits'
  | 'mental_health_therapy';

export type DailyLifeImpact =
  | 'childcare'
  | 'household_help'
  | 'transportation'
  | 'home_modifications'
  | 'assistive_devices';

export type EmotionalImpact =
  | 'anxiety'
  | 'depression'
  | 'ptsd'
  | 'sleep_disorders'
  | 'relationship_strain'
  | 'loss_of_enjoyment';

export interface CalculatorState {
  currentStep: number;
  accidentType: AccidentType | null;
  injurySeverity: InjurySeverity | null;
  bodyParts: BodyPart[];
  treatments: Treatment[];
  treatmentQuantities: Partial<Record<Treatment, number>>;
  annualIncome: number;
  missedWorkDays: number;
  workCapacityReduction: number;
  jobLost: boolean;
  dailyLifeImpacts: DailyLifeImpact[];
  dailyLifeMonths: number;
  emotionalImpacts: EmotionalImpact[];
  needsOngoingCare: boolean;
  futureYearsOfCare: number;
  futureSurgeries: boolean;
  permanentEarningReduction: boolean;
}

export interface CostBreakdown {
  medicalToDate: number;
  injurySurcharges: number;
  lostWages: number;
  dailyLifeCosts: number;
  emotionalCosts: number;
  painAndSuffering: number;
  futureMedical: number;
  futureLostEarnings: number;
  total: number;
}

export interface LeadData {
  name: string;
  phone: string;
  email: string;
  costBreakdown: CostBreakdown;
  accidentType: AccidentType | null;
}
