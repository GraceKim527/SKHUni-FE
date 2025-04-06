import instance from '@/libs/instance';

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
