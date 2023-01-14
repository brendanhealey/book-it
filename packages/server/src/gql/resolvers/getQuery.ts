import db from "db";

// this is one way of doing it
export const getQuery = async (sql: string, values: any) => {
  const [rows] = await db.promise().execute(sql, values);
  return rows;
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

export default getQuery;
