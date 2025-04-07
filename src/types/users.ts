export enum EnrollmentStatus {
  ENROLLED = 'ENROLLED',
  LEAVE = 'LEAVE',
  GRADUATED = 'GRADUATED',
  DEFERRED = 'DEFERRED',
}

export enum Field {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  DESIGN = 'DESIGN',
  PLANNING = 'PLANNING',
}

export interface UserInfo {
  memberId: number;
  email: string;
  name: string;
  picture: string;
  contactEmail: string;
  studentId: string;
  introLine: string;
  introduction: string;
  enrollmentStatus: EnrollmentStatus;
  fieldType: Field;
  techStack: string;
  coffeeChatOpen: boolean;
  codeReviewOpen: boolean;
  notion: string;
  github: string;
  linkedIn: string;
  etc1: string;
  etc2: string;
}

export interface MemberList {
  members: UserInfo[];
  pageInfo: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}
