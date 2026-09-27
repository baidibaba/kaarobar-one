import { db, type User } from "./schema";

/**
 * Seeds the database with default data for testing and first-time use.
 * Only runs if the database is empty.
 */
export async function seedDatabase(): Promise<void> {
  const userCount = await db.users.count();
  if (userCount > 0) return;

  const defaultUsers: Omit<User, "createdAt">[] = [
    {
      id: "user-1",
      name: "Ahmed",
      nameUrdu: "احمد",
      role: "admin",
      pin: "1234",
      isActive: true,
    },
    {
      id: "user-2",
      name: "Fatima",
      nameUrdu: "فاطمہ",
      role: "worker",
      pin: "5678",
      isActive: true,
    },
    {
      id: "user-3",
      name: "Ali",
      nameUrdu: "علی",
      role: "viewer",
      pin: "0000",
      isActive: true,
    },
  ];

  const now = new Date();
  for (const user of defaultUsers) {
    await db.users.add({ ...user, createdAt: now });
  }
}
