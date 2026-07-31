import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.message);

    res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor',
        error: err.message,
    });
}