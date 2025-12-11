import { prisma } from '../utils/prisma.js';
import type { ExpenseCreateInput, ExpenseUpdateInput } from "../schemas/expense.schema.js";
import { AppError } from '../errors/AppError.js';


const omit = {
    userId: true
};

const getAllExpenses = async (userId: number) => {
    const expenses = await prisma.expense.findMany({
        omit,
        where: { userId }
    });

    const data = expenses.map((expense) => {
        return { ...expense, amount: Number(expense.amount) }
    })

    if (data.length == 0) throw new AppError('Expenses not found', 404);

    return data;
};

const getExpenseById = async (userId: number, expenseId?: string) => {
    const expenses = await prisma.expense.findMany({
        omit,
        where: { userId, id: Number(expenseId) }
    });

    const data = expenses.map((expense) => {
        return { ...expense, amount: Number(expense.amount) }
    })

    if (data.length == 0) throw new AppError('Expense not found', 404);

    return data[0];
};

const createExpense = async (userId: number, { amount, category, description }: ExpenseCreateInput) => {
    const newExpense = await prisma.expense.create({
        data: {
            userId,
            amount,
            category: category,
            description
        },
        omit
    });

    return { ...newExpense, amount: Number(newExpense.amount) };
};

const updateExpense = async (userId: number, expenseId: string, updateData: ExpenseUpdateInput) => {
    const existingExpense = await prisma.expense.findUnique({
        where: {
            id: Number(expenseId),
            userId
        }
    });

    if (!existingExpense) throw new AppError('Expense not found', 404);


    const updatedExpense = await prisma.expense.update({
        where: {
            id: Number(expenseId),
            userId
        },
        data: {
            amount: updateData.amount ?? existingExpense.amount,
            category: updateData.category ?? existingExpense.category,
            description: updateData.description ?? existingExpense.description
        },
        omit
    });

    return { ...updatedExpense, amount: Number(updatedExpense.amount) };
}

const deleteExpense = async (userId: number, expenseId: string) => {
    const existingExpense = await prisma.expense.findUnique({
        where: {
            id: Number(expenseId),
            userId
        }
    });

    if (!existingExpense) throw new AppError('Expense not found', 404);

    await prisma.expense.delete({
        where: {
            id: Number(expenseId),
            userId
        }
    });

    return;
};

export default {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
}