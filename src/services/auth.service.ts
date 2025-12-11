import { generateToken, verifyToken } from '../utils/jwt.js';
import { comparePassword, hashPassword } from "../utils/security.password.js";
import { prisma } from '../utils/prisma.js'
import { AppError } from "../errors/AppError.js";


const login = async (email: string, password: string) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!user || await comparePassword(password, user.password) == false) {
        throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken({ id: user.id });

    return token;
};

const register = async (name: string, email: string, password: string) => {

    const userExists = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (userExists) {
        throw new AppError('Email already in use', 409);
    }

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: await hashPassword(password)
        },
        select: {
            id: true,
            name: true,
            email: true,
            created_at: true
        }
    })

    return newUser
};

export default {
    login,
    register
}