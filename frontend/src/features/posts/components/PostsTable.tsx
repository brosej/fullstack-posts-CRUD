import { usePostsTable } from '../hooks/usePostsTable';

export const PostsTable = () => {
  const {
    paginatedPosts,
    handleDelete,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    hasResults,
  } = usePostsTable();

  if (!hasResults) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
        No se encontraron posts que coincidan con la búsqueda.
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* 1. Contenedor de la tabla con scroll */}
      <div className="max-h-[400px] overflow-y-auto relative border border-gray-300 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-300">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-300">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-300">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-100">
                  {post.nombre}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 border-r border-gray-100">
                  {post.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-800 font-semibold transition-colors px-3 py-1 rounded hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. Controles de paginación */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700 font-medium">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};