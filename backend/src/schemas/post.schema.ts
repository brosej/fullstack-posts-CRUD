import { z } from 'zod';

export const createPostSchema = z.object({
    body: z.object({
        nombre: z.string().min(1, 'El nombre es obligatorio').max(100, 'El nombre no puede tener más de 100 caracteres'),
        descripcion: z.string().min(1, 'La descripción es obligatoria').max(500, 'La descripción no puede tener más de 1000 caracteres')
    })
});

export const deletePostSchema = z.object({
    params: z.object({
            id: z.string().regex(/^\d+$/, 'El ID debe ser un número entero válido')
    }),
});