import type { Request, Response } from "express";
import expenseService from "../services/expense.service.js";
import type { ApiSucess } from "../types/ApiResponse.js";
import type { ExpenseCreateInput, ExpenseReponse, ExpenseUpdateInput } from "../schemas/expense.schema.js";
import type { AuthRequest } from "../types/AuthRequest.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllExpenses = catchAsync(async (
    req: AuthRequest<{ id?: string }>,
    res: Response<ApiSucess<ExpenseReponse[]>>
) => {
    const userId = req.userId!;
    const expenseId = req.params.id;
    const expense = await expenseService.getAllExpenses(userId);

    res.json({
        status: 'success',
        data: expense
    });
});

export const getExpenseById = catchAsync(async (
    req: AuthRequest<{ id: string }>,
    res: Response<ApiSucess<ExpenseReponse | undefined>>
) => {
    const userId = req.userId!;
    const expenseId = req.params.id;
    const expense = await expenseService.getExpenseById(userId, expenseId);

    res.json({
        status: 'success',
        data: expense
    });
});

export const createExpense = async (
    req: AuthRequest<{}, ExpenseCreateInput>,
    res: Response<ApiSucess<ExpenseReponse>>
) => {
    const userId = req.userId!;
    const newExpense = await expenseService.createExpense(userId, req.body);

    res.status(201).json({
        status: 'success',
        data: newExpense
    });
};

export const updateExpense = catchAsync(async (
    req: AuthRequest<{ id: string }, ExpenseUpdateInput>,
    res: Response<ApiSucess<ExpenseReponse>>
) => {
    const userId = req.userId!;
    const expenseId = req.params.id;
    const updatedExpense = await expenseService.updateExpense(userId, expenseId, req.body);

    res.json({
        status: 'success',
        data: updatedExpense
    });
});

export const deleteExpense = catchAsync(async (
    req: AuthRequest<{ id: string }>,
    res: Response<ApiSucess<null>>
) => {
    const userId = req.userId!;
    const expenseId = req.params.id;
    await expenseService.deleteExpense(userId, expenseId);

    res.status(204).json({
        status: 'success',
        data: null
    });
});