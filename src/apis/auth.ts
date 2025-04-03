// src/apis/auth.ts

import instance from '@/libs/instance';

export const exchangeToken = async (provider: string, code: string) => {
  const response = await instance.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${provider}/token`,
    {
      code: code || '',
    }
  );

  return response.data;
};
