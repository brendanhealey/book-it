import db from "db";
import { OkPacket, RowDataPacket } from "mysql2";

// this is one way of doing it
export const getQueryOne = async <T>(
  sql: string,
  values: any
): Promise<Awaited<T>> => {
  const [rows] = await db.promise().execute(sql, values);
  return rows[0];
};

// mysql2 makes it diabolically complicated to type the query return but
// this is the most concise solution that I've been able to put together.

export type QueryResult<T> = T[] & RowDataPacket[][];

export const getQueryMany = async <T = unknown>(
  sql: string,
  values?: any
): Promise<QueryResult<T>> => {
  const [result] = await db.promise().execute<QueryResult<T>>(sql, values);
  // const [result] = await db.promise().execute<QueryResult<T[]>>(sql, values);
  return result;
};

// and this is another
export const getQuery2 = (sql: string, values: any) => {
  return new Promise((resolve, reject) => {
    db.execute(sql, values, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
};
