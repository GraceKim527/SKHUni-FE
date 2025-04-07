import { EnrollmentStatus, Field } from '@/types/users';

export const ENROLLMENT_STATUS_LABELS: Record<EnrollmentStatus, string> = {
  ENROLLED: '재학중',
  LEAVE: '휴학중',
  GRADUATED: '졸업',
  DEFERRED: '졸업 유예',
};

export const FIELD_LABELS: Record<Field, string> = {
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  DESIGN: '디자인',
  PLANNING: '기획',
};
