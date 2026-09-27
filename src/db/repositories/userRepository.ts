import { db, type User } from "../schema";

export const userRepository = {
  async getAll(): Promise<User[]> {
    return db.users.toArray();
  },

  async getAllActive(): Promise<User[]> {
    return db.users.filter((user) => user.isActive === true).toArray();
  },

  async getById(id: string): Promise<User | undefined> {
    return db.users.get(id);
  },

  async create(user: Omit<User, "createdAt">): Promise<User> {
    const newUser: User = {
      ...user,
      createdAt: new Date(),
    };
    await db.users.add(newUser);
    return newUser;
  },

  async update(id: string, updates: Partial<User>): Promise<void> {
    await db.users.update(id, updates);
  },

  async delete(id: string): Promise<void> {
    await db.users.delete(id);
  },
};
