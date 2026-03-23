import { AccidentType, BodyPart, Treatment, DailyLifeImpact, EmotionalImpact, InjurySeverity } from './types';

export const ACCIDENT_TYPES: { value: AccidentType; label: string; icon: string }[] = [
  { value: 'car_crash', label: 'Car Crash', icon: 'Car' },
  { value: 'truck_accident', label: 'Truck Accident', icon: 'Truck' },
  { value: 'motorcycle', label: 'Motorcycle', icon: 'Bike' },
  { value: 'slip_and_fall', label: 'Slip & Fall', icon: 'PersonStanding' },
  { value: 'workplace', label: 'Workplace Injury', icon: 'HardHat' },
  { value: 'medical_malpractice', label: 'Medical Malpractice', icon: 'Stethoscope' },
  { value: 'pedestrian_bicycle', label: 'Pedestrian / Bicycle', icon: 'Footprints' },
  { value: 'other', label: 'Other', icon: 'AlertCircle' },
];

export const SEVERITY_OPTIONS: { value: InjurySeverity; label: string; description: string }[] = [
  { value: 'minor', label: 'Minor', description: 'Bruises, sprains, whiplash. Recovered within weeks.' },
  { value: 'moderate', label: 'Moderate', description: 'Fractures, herniated discs, significant soft tissue. Months of treatment.' },
  { value: 'severe', label: 'Severe', description: 'Multiple fractures, spinal injury, TBI. Extended recovery, possible permanent effects.' },
  { value: 'catastrophic', label: 'Catastrophic', description: 'Paralysis, amputation, severe TBI. Life-altering permanent disability.' },
];

export const BODY_PARTS: { value: BodyPart; label: string }[] = [
  { value: 'head_brain', label: 'Head / Brain' },
  { value: 'neck_spine', label: 'Neck / Spine' },
  { value: 'back', label: 'Back' },
  { value: 'shoulder', label: 'Shoulder' },
  { value: 'knee', label: 'Knee' },
  { value: 'hip', label: 'Hip' },
  { value: 'wrist_hand', label: 'Wrist / Hand' },
  { value: 'ankle_foot', label: 'Ankle / Foot' },
  { value: 'ribs_chest', label: 'Ribs / Chest' },
  { value: 'internal_organs', label: 'Internal Organs' },
];

export const TREATMENTS: { value: Treatment; label: string; hasQuantity: boolean; quantityLabel?: string }[] = [
  { value: 'emergency_room', label: 'Emergency Room', hasQuantity: false },
  { value: 'ambulance', label: 'Ambulance', hasQuantity: false },
  { value: 'hospital_stay', label: 'Hospital Stay', hasQuantity: true, quantityLabel: 'nights' },
  { value: 'surgery', label: 'Surgery', hasQuantity: true, quantityLabel: 'surgeries' },
  { value: 'physical_therapy', label: 'Physical Therapy', hasQuantity: true, quantityLabel: 'sessions' },
  { value: 'chiropractic', label: 'Chiropractic', hasQuantity: true, quantityLabel: 'visits' },
  { value: 'medications', label: 'Prescription Medications', hasQuantity: false },
  { value: 'imaging_xray', label: 'X-Ray', hasQuantity: false },
  { value: 'imaging_mri', label: 'MRI / CT Scan', hasQuantity: false },
  { value: 'specialist_visits', label: 'Specialist Visits', hasQuantity: true, quantityLabel: 'visits' },
  { value: 'mental_health_therapy', label: 'Mental Health Therapy', hasQuantity: true, quantityLabel: 'sessions' },
];

export const DAILY_LIFE_OPTIONS: { value: DailyLifeImpact; label: string; description: string }[] = [
  { value: 'childcare', label: 'Childcare', description: 'Needed help with children during recovery' },
  { value: 'household_help', label: 'Household Help', description: 'Cleaning, cooking, yard work' },
  { value: 'transportation', label: 'Transportation', description: 'Rideshare, taxis, or others driving you' },
  { value: 'home_modifications', label: 'Home Modifications', description: 'Ramps, grab bars, accessibility changes' },
  { value: 'assistive_devices', label: 'Assistive Devices', description: 'Wheelchair, crutches, braces, etc.' },
];

export const EMOTIONAL_OPTIONS: { value: EmotionalImpact; label: string; description: string }[] = [
  { value: 'anxiety', label: 'Anxiety', description: 'Persistent worry, panic attacks, fear of driving' },
  { value: 'depression', label: 'Depression', description: 'Persistent sadness, loss of motivation' },
  { value: 'ptsd', label: 'PTSD / Flashbacks', description: 'Reliving the accident, nightmares, triggers' },
  { value: 'sleep_disorders', label: 'Sleep Problems', description: 'Insomnia, disrupted sleep, fatigue' },
  { value: 'relationship_strain', label: 'Relationship Strain', description: 'Tension with partner, family, or friends' },
  { value: 'loss_of_enjoyment', label: 'Loss of Enjoyment', description: 'Unable to do hobbies or activities you loved' },
];

export const STEP_TITLES = [
  'What happened to you?',
  'Tell us about your injuries',
  'Medical treatment received',
  'How has this affected your work?',
  'Impact on your daily life',
  'Emotional and mental health',
  'Looking ahead',
];

export const TOTAL_STEPS = 7;
