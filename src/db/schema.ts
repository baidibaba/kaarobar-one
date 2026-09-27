import Dexie, { type Table } from "dexie";

// Types
export interface User {
  id: string;
  name: string;
  nameUrdu: string;
  role: "admin" | "worker" | "viewer";
  avatar?: string;
  pin?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "sale" | "purchase" | "expense";
  amount: number;
  description: string;
  category: string;
  date: Date;
  createdAt: Date;
}

export interface InventoryItem {
  id: string;
  name: string;
  nameUrdu: string;
  quantity: number;
  unit: string;
  purchasePrice: number;
  salePrice: number;
  category: string;
  createdAt: Date;
}

export interface Setting {
  key: string;
  value: unknown;
  updatedAt: Date;
}

// Database
export class KaarobarDatabase extends Dexie {
  users!: Table<User>;
  transactions!: Table<Transaction>;
  inventory!: Table<InventoryItem>;
  settings!: Table<Setting>;

  constructor() {
    super("kaarobar-one");
    this.version(1).stores({
      users: "id, name, role, isActive",
      transactions: "id, userId, type, category, date",
      inventory: "id, name, category",
      settings: "key",
    });
  }
}

export const db = new KaarobarDatabase();
