export interface ApiSucess<T> {
    status: 'sucess';
    data: T;
}

export interface ApiError {
    status: 'fatal' | 'error';
    message: string;
    stack?: string;
}