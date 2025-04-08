import instance from '@/libs/instance';
import { EnrollmentStatus, Field, UserInfo } from '@/types/users';

// 권한 조회
export const getRole = async () => {
  const response = await instance.get('/api/members/role');
  return response.data;
};

// 사용자 유저 정보 조회
export const getUserInfo = async () => {
  const response = await instance.get('/api/members/me');
  return response.data;
};

// 사용자 정보 수정
export const updateUserInfo = async (userInfo: UserInfo) => {
  console.log(userInfo);
  const response = await instance.post('/api/members', userInfo);
  return response.data;
};

// 멤버 리스트 조회
export const getMemberList = async (
  name?: string | undefined,
  field?: Field | undefined,
  enrollmentStatus?: EnrollmentStatus | undefined,
  coffeeChat?: boolean | undefined,
  codeReview?: boolean | undefined,
  page?: number | undefined,
  size?: number | undefined
) => {
  const queryParams = new URLSearchParams({
    size: size?.toString() || '10',
  });

  if (coffeeChat) queryParams.append('coffeeChat', coffeeChat.toString());
  if (codeReview) queryParams.append('codeReview', codeReview.toString());
  if (name !== undefined) queryParams.append('name', name);
  if (field !== undefined) queryParams.append('field', field);
  if (enrollmentStatus !== undefined) queryParams.append('enrollmentStatus', enrollmentStatus);
  if (page !== undefined) queryParams.append('page', page.toString());

  const response = await instance.get(`/api/members?${queryParams.toString()}`);
  return response.data;
};

// 멤버 상세 조회
export const getMemberDetail = async (memberId: number) => {
  const response = await instance.get(`/api/members/${memberId}`);
  return response.data;
};

// 커피챗 요청
export const requestCoffeeChat = async (toMemberId: number, content: string) => {
  const response = await instance.post(`/api/members/request/coffee-chat`, {
    toMemberId,
    content,
  });
  return response.data;
};

// 코드리뷰 요청
export const requestCodeReview = async (
  toMemberId: number,
  content: string,
  githubLink?: string
) => {
  const response = await instance.post(`/api/members/request/code-review`, {
    toMemberId,
    content,
    githubLink,
  });
  return response.data;
};
