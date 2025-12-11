import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";



export const securityMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ status: 'error', message: "Unauthorized" });
    };

    const token = authHeader.split(" ")[1] as string;

    try {
        const result: { id: number, exp: number } = await verifyToken(token);
        req.userId = result.id;
        next();
    } catch (error) {

        let message = "Unauthorized";

        if (error instanceof jwt.JsonWebTokenError) message = "Invalid token";
        if (error instanceof jwt.TokenExpiredError) message = "Token expired";


        res.status(401).json({ status: 'error', message });
    }

};