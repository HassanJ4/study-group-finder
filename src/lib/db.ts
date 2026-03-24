import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

export const sql: any = postgres(connectionString, {
  max: 10,
});