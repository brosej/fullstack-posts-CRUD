import { z } from 'zod';

export const createPostSchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre es obligatorio')
    .max(50, 'El nombre no puede superar los 50 caracteres'),
  descripcion: z.string()
    .min(1, 'La descripción es obligatoria')
    .max(200, 'La descripción no puede superar los 200 caracteres')
});

export type CreatePostDTO = z.infer<typeof createPostSchema>;