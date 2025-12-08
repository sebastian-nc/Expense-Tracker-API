import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { ApiError } from '../types/ApiResponse';


export const errorController = (err: Error, _req: Request, res: Response<ApiError>, _next: NextFunction) => {

    if (err instanceof AppError) {
        const status = `${err.statusCode}`.startsWith('4') ? 'error' : 'fatal';
        const message = err.message;
        const stack = err.stack;
        res.status(err.statusCode).json({
            status,
            message,
            stack
        })
    }

    res.status(500).json({
        status: 'fatal',
        message: 'Error in the Server',
        stack: err.stack
    });
}