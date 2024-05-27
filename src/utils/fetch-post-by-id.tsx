import { api } from '~/api/client';

export const fetchPostById = async (infoId: string) => {
  try {
    const res = await api.info.getInfoById(infoId);
    if (!res.ok) throw new Error('Failed to fetch posts');
    const json = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
};
