import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate = (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            res.status(400).json({
                status: 'error',
                message: 'Error de validación de datos',
                errors: error.issues.map(e => ({ path: e.path.join('.'), message: e.message })),
            });
            return;
        }
        next(error);
    }
};