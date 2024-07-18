<!-- Create a readme with the project specs -->

# Apollo Server 4 Boilerplate Typescript

This is a boilerplate for Apollo Server 4 with Typescript, Kysely, Apollo Server, Express, and Postgres.

This boilerplate offers the three main features of GraphQL: Queries, Mutations, and Subscriptions.

## How to run the project

**Requirements: Docker, PNPM, Node.JS**

1. Clone the repository
2. Cpoy the `.env.example` file to `.env` and fill in the environment variables
3. Run `pnpm install`
4. Run `docker-compose up -d` to start the Postgres database
5. Run `pnpm dev` to start the server

## Database Migrations

To run the database migrations, run the following command:

```bash
pnpm db:migrate:up # To run the migrations
pnpm db:migrate:down # To run the migrations
```

### To Create a new migration:

```bash
touch src/db/migrations/number.quick-name-description.ts
# Example of a migration file 0001.create-users-table.ts
```

This will be the content of the migration file:

```typescript
import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  sql`
  
  `.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  sql`

  `.execute(db);
}
```

## Folder Structure

It follows a modular structure, where each module has its own folder with the following structure:

```
src
├── modules
│   ├── module-name
│   │   ├── resolvers.module-name.ts
│   │   ├── types.module-name.ts
│   │   ├── index.ts

```

## Contributing

Feel free to contribute to this project by creating a pull request, or creating an issue. If you want to fork this project, please give credit to the original author.

## Linting and Formatting

- ESLint is used for linting
- Prettier is used for formatting
- Typescript is used for type checking

To run the linting and formatting, run the following command:

```bash
pnpm lint # eslint
pnpm format # prettier
pnpm check-types # typescript type checking
```
