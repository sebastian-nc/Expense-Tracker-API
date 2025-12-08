export class AppError extends Error {
    public statusCode: number;
    public stack?: string;

    constructor(message: string, code: number = 500) {
        super(message);
        this.statusCode = code;
        this.stack = new Error().stack
    }
}

