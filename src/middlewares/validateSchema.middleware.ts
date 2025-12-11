import type { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export const validateSchema = (schema: ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { data, success, error } = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params
        })

        if (!success) {
            const errors = JSON.parse(error.message).map(({ path, message }: { path: string[], message: string }) => {
                return {
                    path: path[1],
                    message
                }
            })

            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors
            });
        }

        req.body = data.body;

        if (data.query) req.query = data.query;
        if (data.params) req.params = data.params;

        next();
    }
}