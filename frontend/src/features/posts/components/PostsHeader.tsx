import { usePostsHeader } from '../hooks/usePostsHeader';

export const PostsHeader = () => {
  const { searchTerm, handleSearchChange } = usePostsHeader();

  return (
    <div className="flex justify-between items-center mb-6">
      <input
        type="text"
        placeholder="Filtro de Nombre o Descripción..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
      <button 
        className="ml-4 px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-50 transition-colors"
      >
        Buscar
      </button>
    </div>
  );
};