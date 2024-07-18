import { ColumnType, Generated } from 'kysely';

export interface UserData {
  id: Generated<number>;
  name: string;
  email: string;
  password: string;
  picture: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
}
