import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createPost } from '../store/posts.slice';
import { createPostSchema, type CreatePostDTO } from '../schemas/post.schema';

export const PostsForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.posts);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostDTO>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
    },
  });

  const onSubmit = async (data: CreatePostDTO) => {
    try {
      await dispatch(createPost(data)).unwrap();
      reset(); 
    } catch (error) {
      console.error('Fallo al crear el post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej: Mi mejor post"
            {...register('nombre')}
            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.nombre ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.nombre && (
            <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <input
            id="descripcion"
            type="text"
            placeholder="Ej: La importancia de aprender C"
            {...register('descripcion')}
            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.descripcion ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.descripcion && (
            <p className="mt-1 text-sm text-red-600">{errors.descripcion.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-white border border-gray-400 text-gray-800 font-bold rounded-md shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Creando...' : 'Crear'}
        </button>
      </div>
    </form>
  );
};