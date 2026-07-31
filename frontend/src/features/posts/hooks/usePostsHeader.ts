import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSearchTerm } from '../store/posts.slice';

export const usePostsHeader = () => {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.posts);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return {
    searchTerm,
    handleSearchChange,
  };
};