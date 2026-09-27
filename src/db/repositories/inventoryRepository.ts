import { db, type InventoryItem } from "../schema";

export const inventoryRepository = {
  async getAll(): Promise<InventoryItem[]> {
    return db.inventory.toArray();
  },

  async getById(id: string): Promise<InventoryItem | undefined> {
    return db.inventory.get(id);
  },

  async create(item: Omit<InventoryItem, "createdAt">): Promise<InventoryItem> {
    const newItem: InventoryItem = {
      ...item,
      createdAt: new Date(),
    };
    await db.inventory.add(newItem);
    return newItem;
  },

  async update(id: string, updates: Partial<InventoryItem>): Promise<void> {
    await db.inventory.update(id, updates);
  },

  async delete(id: string): Promise<void> {
    await db.inventory.delete(id);
  },
};
