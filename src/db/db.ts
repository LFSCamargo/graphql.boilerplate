import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from './types';
import { Env } from '../env';

const { Pool } = pg;

const dialect = new PostgresDialect({
  pool: new Pool({
    database: Env.DB_NAME,
    host: Env.DB_HOST,
    password: Env.DB_PASSWORD,
    port: Number(Env.DB_PORT),
    user: Env.DB_USER,
  }),
});

const db = new Kysely<Database>({
  dialect,
});

export { db };
