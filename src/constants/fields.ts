export enum Field {
  PLANNING = 'PLANNING',
  DESIGN = 'DESIGN',
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  AI = 'AI',
}

export const FIELD_LABELS: Record<Field, string> = {
  [Field.PLANNING]: '기획',
  [Field.DESIGN]: '디자인',
  [Field.FRONTEND]: '프론트엔드',
  [Field.BACKEND]: '백엔드',
  [Field.AI]: 'AI',
};

export const FIELD_OPTIONS = Object.entries(FIELD_LABELS).map(([value, label]) => ({
  value: value as Field,
  label,
}));
