import instance from '@/libs/instance';
import { UserInfo } from '@/types/users';

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
