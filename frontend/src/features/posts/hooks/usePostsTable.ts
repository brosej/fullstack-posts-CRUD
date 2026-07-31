import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { deletePost, setCurrentPage } from '../store/posts.slice';

export const usePostsTable = () => {
  const dispatch = useAppDispatch();
  const { posts, searchTerm, currentPage } = useAppSelector((state) => state.posts);

  const itemsPerPage = 10;
  
  const filteredPosts = posts.filter((post) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.nombre.toLowerCase().includes(searchLower) ||
      post.descripcion.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este post?')) {
      dispatch(deletePost(id));
      
      if (paginatedPosts.length === 1 && currentPage > 1) {
        dispatch(setCurrentPage(currentPage - 1));
      }
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  };

  return {
    paginatedPosts,
    handleDelete,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    hasResults: filteredPosts.length > 0,
  };
};