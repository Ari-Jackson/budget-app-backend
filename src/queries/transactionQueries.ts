import { ParsedQs } from "qs";
import db from "../../db/dbConfig.js";

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
    const { result } = await db.oneOrNone(
      "SELECT * FROM transactions WHERE id=$1;",
      id
    );
    return { result };
  } catch (error) {
    return { error };
  }
};

const createOneTransaction = async (newTransactionInfo: any) => {
  try {
    const result = await db.one(
      "INSERT INTO transactions (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [
        newTransactionInfo.name,
        newTransactionInfo.artist,
        newTransactionInfo.album,
        newTransactionInfo.time,
        newTransactionInfo.is_favorite,
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
      "UPDATE transactions SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *;",
      [
        newTransactionInfo.name,
        newTransactionInfo.artist,
        newTransactionInfo.album,
        newTransactionInfo.time,
        newTransactionInfo.is_favorite,
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
