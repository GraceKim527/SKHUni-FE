import instance from '@/libs/instance';
import { ProjectCreate } from '@/types/projects';

// 내 프로젝트 목록 조회
export const getMyProjects = async () => {
  const response = await instance.get('/api/projects/my-projects');
  return response.data;
};

// 프로젝트 저장
export const createProject = async (data: ProjectCreate) => {
  const response = await instance.post('/api/projects/save', data);
  return response.data;
};

// 프로젝트 이미지 업로드
export const imageUpload = async (multipartFile: File) => {
  const formData = new FormData();
  formData.append('multipartFile', multipartFile);
  const response = await instance.post('/api/projects/image/upload', formData);
  return response.data;
};

// projectId로 프로젝트 조회
export const getProjectById = async (projectId: number) => {
  const response = await instance.get(`/api/projects/${projectId}`);
  return response.data;
};

// 프로젝트 수정
export const updateProject = async (projectId: number, data: ProjectCreate) => {
  const response = await instance.post(`/api/projects/${projectId}`, data);
  return response.data;
};

// 프로젝트 삭제
export const deleteProject = async (projectId: number) => {
  const response = await instance.delete(`/api/projects/${projectId}`);
  return response.data;
};
