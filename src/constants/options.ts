import { EnrollmentStatus, Field } from '@/types/users';
import { ENROLLMENT_STATUS_LABELS, FIELD_LABELS } from './labels';

export const ENROLLMENT_STATUS_OPTIONS = Object.entries(ENROLLMENT_STATUS_LABELS).map(
  ([value, label]) => ({
    value: value as EnrollmentStatus,
    label,
  })
);

export const FIELD_OPTIONS = Object.entries(FIELD_LABELS).map(([value, label]) => ({
  value: value as Field,
  label,
}));
