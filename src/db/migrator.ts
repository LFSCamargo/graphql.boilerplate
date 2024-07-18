import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { FileMigrationProvider, Migrator } from 'kysely';
import { run } from 'kysely-migration-cli';
import { db } from './db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrator = new Migrator({
  db,
  allowUnorderedMigrations: false,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.resolve(__dirname, 'migrations'),
  }),
});

run(db, migrator, './src/db/migrations');
