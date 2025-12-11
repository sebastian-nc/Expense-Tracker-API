import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';
import type { ApiError } from '../types/ApiResponse.js';


export const errorController = (err: Error, _req: Request, res: Response<ApiError>, _next: NextFunction) => {

    if (err instanceof AppError) {
        const status = `${err.statusCode}`.startsWith('4') ? 'error' : 'fatal';
        const message = err.message;
        return res.status(err.statusCode).json({
            status,
            message
        })
    }

    res.status(500).json({
        status: 'fatal',
        message: 'Error in the Server',
        stack: err.stack!
    });
}