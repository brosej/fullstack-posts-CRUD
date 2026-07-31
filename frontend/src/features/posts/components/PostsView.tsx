import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchPosts } from '../store/posts.slice';

import { PostsHeader } from './PostsHeader';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ErrorMessage } from './ui/ErrorMessage';

import { PostsTable } from './PostsTable';
import { PostsForm } from './PostsForm';

export const PostsView = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white min-h-screen shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Dashboard</h1>

      <PostsHeader />

      <div className="bg-gray-50 py-3 px-6 mb-6 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Crear Nuevo Post</h2>
        <PostsForm />
      </div>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <PostsTable />
      )}

    </div>
  );
};