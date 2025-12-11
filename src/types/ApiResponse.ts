export interface ApiSucess<T> {
    status: 'success';
    data: T;
}

export interface ApiError {
    status: 'fatal' | 'error';
    message: string;
    stack?: string;
}