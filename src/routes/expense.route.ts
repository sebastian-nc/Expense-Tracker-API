import { Router } from "express"
import { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense } from "../controllers/expense.controller.js"
import { securityMiddleware } from "../middlewares/security.middleware.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { ExpenseCreateSchema, ExpenseUpdateSchema, ExpenseDeleteSchema } from "../schemas/expense.schema.js";

const router = Router()

router.get('/', securityMiddleware, getAllExpenses);
router.get('/:id', securityMiddleware, getExpenseById);
router.post('/', securityMiddleware, validateSchema(ExpenseCreateSchema), createExpense);
router.put('/:id', securityMiddleware, validateSchema(ExpenseUpdateSchema), updateExpense);
router.delete('/:id', securityMiddleware, validateSchema(ExpenseDeleteSchema), deleteExpense);

export default router