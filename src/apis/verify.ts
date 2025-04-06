import instance from '@/libs/instance';

// 이메일 인증 코드 전송
export const sendEmailCode = async (email: string) => {
  const response = await instance.post('/api/email', { email });
  return response.data;
};

// 이메일 인증 코드 확인
export const checkEmailCode = async (email: string, authCode: string) => {
  const response = await instance.post('/api/email/check', { email, authCode });
  return response.data;
};
