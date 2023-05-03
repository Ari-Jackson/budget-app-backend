import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const bookmarkSchema = z.object({
  title: z.string(),
  amount: z.number(),
  transaction_date: z.number(),
  transaction_from: z.string().optional(),
  category: z.string().optional(),
  deposit: z.boolean(),
});

const transactionsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    bookmarkSchema.parse(req.body);
    return next();
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

export default transactionsValidator;
