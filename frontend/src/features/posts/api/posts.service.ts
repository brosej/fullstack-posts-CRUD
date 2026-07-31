import { axiosClient } from '../../../api/axiosClient';
import type { Post } from '../models/post.model';
import type { CreatePostDTO } from '../schemas/post.schema';

export const postsService = {
  getAll: async (): Promise<Post[]> => {
    const response = await axiosClient.get<Post[]>('/posts');
    return response.data;
  },

  create: async (data: CreatePostDTO): Promise<Post> => {
    const response = await axiosClient.post<Post>('/posts', data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/posts/${id}`);
  },
};