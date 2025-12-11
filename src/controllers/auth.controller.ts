import type { Request, Response } from 'express';
import authService from '../services/auth.service.js';
import type { LoginInput } from '../schemas/auth.schema.js';
import type { ApiSucess } from '../types/ApiResponse.js';
import { catchAsync } from '../utils/catchAsync.js';

type LoginResponse = ApiSucess<{ token: string }>;

export const login = catchAsync(async (req: Request<{}, {}, LoginInput['body']>, res: Response<LoginResponse>) => {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.json({
        status: 'success',
        data: { token }
    });
});

type RegisterResponse = ApiSucess<{
    id: number;
    email: string;
    name: string | null;
    created_at: Date;
}>;

export const register = catchAsync(async (req: Request, res: Response<RegisterResponse>) => {
    const { email, password, name } = req.body;
    const newUser = await authService.register(name, email, password);

    res.status(201).json({
        status: 'success',
        data: newUser
    });

});

