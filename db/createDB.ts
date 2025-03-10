import postgres from "postgres";
import "dotenv/config";

const sql = postgres(`${process.env.DATABASE_URL_CREATE}`);

const dbName = "todoDB";

async function createDatabase() {
  const databases =
    await sql`SELECT datname FROM pg_database WHERE datname = ${dbName}`;
  if (databases.count === 0) {
    await sql`CREATE DATABASE ${sql(dbName)}`;
    console.log(`Database '${dbName}' berhasil dibuat.`);
  } else {
    console.log(`Database '${dbName}' sudah ada.`);
  }
}

createDatabase()
  .catch((err) => {
    console.error("Error saat membuat database:", err);
  })
  .finally(() => {
    sql.end();
  });
