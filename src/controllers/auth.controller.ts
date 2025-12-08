import type { Request, Response } from 'express';

import catchAsync from '../utils/cathAsync';
import { AppError } from '../errors/AppError';
import { ApiSucess } from '../types/ApiResponse';

export const register = catchAsync(async (req: Request, res: Response<ApiSucess<string>>) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
        throw new AppError('Email y contraseña son obligatorios', 400)
    }
    res.json({
        status: 'sucess',
        data: 'OK'
    })

});

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
        throw new AppError('Email y contraseña son obligatorios', 400);
    }
    // try {

    //     const user = await authService.loginUser(email, password);

    //     res.status(200).json({ message: 'Login exitoso', user });

    // } catch (error: any) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Error interno del servidor' });
    // }
}