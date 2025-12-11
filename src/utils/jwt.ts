import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';

export const generateToken = (payload: object) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN as StringValue });
};

export const verifyToken = async <T>(token: string): Promise<T> => {
    return jwt.verify(token, process.env.JWT_SECRET!) as T;
}