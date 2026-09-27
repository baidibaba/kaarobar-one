import { db, type Transaction } from "../schema";

export const transactionRepository = {
  async getAll(): Promise<Transaction[]> {
    return db.transactions.toArray();
  },

  async getByUser(userId: string): Promise<Transaction[]> {
    return db.transactions.where("userId").equals(userId).toArray();
  },

  async create(transaction: Omit<Transaction, "createdAt">): Promise<Transaction> {
    const newTransaction: Transaction = {
      ...transaction,
      createdAt: new Date(),
    };
    await db.transactions.add(newTransaction);
    return newTransaction;
  },

  async update(id: string, updates: Partial<Transaction>): Promise<void> {
    await db.transactions.update(id, updates);
  },

  async delete(id: string): Promise<void> {
    await db.transactions.delete(id);
  },
};
