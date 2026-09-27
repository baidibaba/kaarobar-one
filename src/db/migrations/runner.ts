import type { Dexie } from "dexie";
import { migration001 } from "./001-initial";

interface Migration {
  version: number;
  name: string;
  run: (db: Dexie) => Promise<void>;
}

const migrations: Migration[] = [
  { version: 1, name: "initial", run: migration001 },
];

/**
 * Runs all pending migrations on the database.
 * Migrations are executed in order by version number.
 */
export async function runMigrations(db: Dexie): Promise<void> {
  const currentVersion = db.verno;

  for (const migration of migrations) {
    if (migration.version > currentVersion) {
      await migration.run(db);
    }
  }
}
