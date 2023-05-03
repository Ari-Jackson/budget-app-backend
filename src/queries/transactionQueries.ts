import { ParsedQs } from "qs";
import db from "../../db/dbConfig.js";
import { transactionSchemaType } from "../../src/validators/transactionValidator.js";

type queryFunctionType = (id: string) => Promise<any>;
type queryFunctionType2 = (
  order?: ParsedQs[string],
  is_favorite?: ParsedQs[string]
) => Promise<any>;

const getAllTransactions: queryFunctionType2 = async (order, is_favorite) => {
  let baseQuery = "SELECT * FROM transactions";
  if (!!is_favorite) {
    if (is_favorite === "true") {
      baseQuery += " WHERE is_favorite=true";
    }
    if (is_favorite === "false") {
      baseQuery += " WHERE is_favorite=false";
    }
  }
  if (!!order) {
    if (order.toString().toLowerCase() === "desc") {
      baseQuery += " ORDER BY name DESC";
    }
    if (order.toString().toLowerCase() === "asc") {
      baseQuery += " ORDER BY name ASC";
    }
  }

  try {
    const result = await db.any(baseQuery);
    return { result };
  } catch (error) {
    return { error };
  }
};

const getOneTransaction: queryFunctionType = async (id: string) => {
  try {
    const result = await db.one("SELECT * FROM transactions WHERE id=$1;", id);
    return { result };
  } catch (error) {
    return { error };
  }
};

const createOneTransaction = async (
  newTransactionInfo: transactionSchemaType
) => {
  if (!newTransactionInfo.transaction_from)
    newTransactionInfo.transaction_from = null;
  if (!newTransactionInfo.category) newTransactionInfo.category = null;
  if (!newTransactionInfo.deposit) newTransactionInfo.deposit = false;
  try {
    const result = await db.any(
      "INSERT INTO transactions(title, amount, transaction_date, deposit) VALUES($1, $2, $3, $4) RETURNING *;",
      [
        newTransactionInfo.title,
        newTransactionInfo.amount,
        newTransactionInfo.transaction_date,
        newTransactionInfo.transaction_from,
        newTransactionInfo.category,
        newTransactionInfo.deposit,
      ]
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

const deleteOneTransaction: queryFunctionType = async (id: string) => {
  try {
    const result = await db.oneOrNone(
      "DELETE FROM transactions WHERE id=$1 RETURNING *;",
      id
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

const updateOneTransaction = async (id: string, newTransactionInfo: any) => {
  try {
    const result = await db.one(
      "UPDATE transactions SET title=$1, amount=$2, transaction_date=$3, transaction_from=$4, category=$5, deposit=$6  WHERE id=$7 RETURNING *;",
      [
        newTransactionInfo.title,
        newTransactionInfo.amount,
        newTransactionInfo.transaction_date,
        newTransactionInfo.transaction_from,
        newTransactionInfo.category,
        newTransactionInfo.deposit,
        id,
      ]
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

export {
  getAllTransactions,
  getOneTransaction,
  createOneTransaction,
  deleteOneTransaction,
  updateOneTransaction,
};
