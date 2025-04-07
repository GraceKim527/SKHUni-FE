import instance from '@/libs/instance';

// 이미지 업로드
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await instance.post('/api/images/upload', formData);
  return response.data;
};

// 프로필 이미지 업로드
export const uploadProfileImage = async (multipartFile: File) => {
  const formData = new FormData();
  formData.append('multipartFile', multipartFile);
  const response = await instance.post('/api/images/profile/upload', formData);
  return response.data;
};
