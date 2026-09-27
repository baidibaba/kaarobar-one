import type { Dexie } from "dexie";

/**
 * Initial database migration.
 * Creates the base schema for Kaarobar One.
 */
export async function migration001(db: Dexie): Promise<void> {
  db.version(1).stores({
    users: "id, name, role, isActive",
    transactions: "id, userId, type, category, date",
    inventory: "id, name, category",
    settings: "key",
  });
}
