import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'; 
import { postsService } from '../api/posts.service';
import { isAxiosError } from 'axios';
import type { Post } from '../models/post.model';
import type { CreatePostDTO } from '../schemas/post.schema';

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string; 
  currentPage: number;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  currentPage: 1,
};

// THUNKS ASÍNCRONOS

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      return await postsService.getAll();
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data?.message || 'Error al obtener los posts');
      }
      return rejectWithValue('Error de conexión desconocido');
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: CreatePostDTO, { rejectWithValue }) => {
    try {
      return await postsService.create(postData);
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data?.message || 'Error al crear el post');
      }
      return rejectWithValue('Error al intentar crear el post');
    }
  }
);


export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number, { rejectWithValue }) => {
    try {
      await postsService.delete(id);
      return id; 
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data?.message || 'Error al eliminar el post');
      }
      return rejectWithValue('Error al intentar eliminar el post');
    }
  }
);

//

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => { 
    // thunks para acciones asíncronas (como fetchPosts, createPost, deletePost)
    builder
      // fetch 
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // create 
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        state.posts.unshift(action.payload); 
        state.currentPage = 1;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // delete
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setSearchTerm, setCurrentPage, clearError } = postsSlice.actions;

export default postsSlice.reducer;