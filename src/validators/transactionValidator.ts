import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const transactionSchema = z.object({
  title: z.string({
    required_error: "title is required",
    invalid_type_error: "title must be a string",
  }),
  amount: z
    .number({
      required_error: "amount is required",
      invalid_type_error: "amount must be a number",
    })
    .positive({
      message:
        "Amount must be a positive number, if you are adding a credit transaction (money taken out) input 'amount' as a positive number and switch 'deposit' as false",
    }),
  transaction_date: z.number({
    required_error: "date is required",
    invalid_type_error: "date must be a number",
  }),
  transaction_from: z.string().nullable().optional(),
  category: z.string().optional().nullable(),
  deposit: z.boolean({
    required_error: "desposit is required",
    invalid_type_error: "desposit must be either true or false",
  }),
});

const transactionsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    transactionSchema.parse(req.body);
    return next();
  } catch (e: any) {
    return res.status(400).json({ error: e.issues[0].message });
  }
};

export type transactionSchemaType = z.infer<typeof transactionSchema>;
export default transactionsValidator;
