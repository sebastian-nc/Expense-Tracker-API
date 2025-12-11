import z from 'zod';

enum CATEGORY {
    FOOD = 'FOOD',
    TRANSPORT = 'TRANSPORT',
    UTILITIES = 'UTILITIES',
    ENTERTAINMENT = 'ENTERTAINMENT',
    HEALTH = 'HEALTH',
    OTHER = 'OTHER'

}

export const ExpenseCreateSchema = z.object({
    body: z.object({
        amount: z.number().positive(),
        description: z.string().nullable(),
        category: z.enum(CATEGORY),
    })
});

export const ExpenseUpdateSchema = z.object({
    body: z.object({
        amount: z.number().positive().optional(),
        description: z.string().optional(),
        category: z.enum(CATEGORY).optional(),
    })
});

export const ExpenseDeleteSchema = z.object({
    body: z.object({
        confirm: z.boolean().default(false).refine((val) => val == true, {
            error: 'You must confirm deletion'
        })
    })
})


export type ExpenseCreateInput = z.infer<typeof ExpenseCreateSchema.shape.body>;
export type ExpenseUpdateInput = z.infer<typeof ExpenseUpdateSchema.shape.body>;
export type ExpenseDeleteInput = z.infer<typeof ExpenseDeleteSchema.shape.body>;

const ExpenseResponseSchema = z.object({
    id: z.number().int(),
    amount: z.number(),
    description: z.string().nullable(),
    date: z.date(),
    category: z.string()
});

export type ExpenseReponse = z.infer<typeof ExpenseResponseSchema>;
