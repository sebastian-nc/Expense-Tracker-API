import type { Request } from "express";

export interface AuthRequest<P = unknown, B = unknown, Q = unknown>
    extends Request<P, unknown, B, Q> {
    userId?: number;
}
