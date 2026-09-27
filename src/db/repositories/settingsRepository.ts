import { db, type Setting } from "../schema";

/**
 * Repository for managing application settings in IndexedDB.
 * Provides CRUD operations for key-value settings.
 */
export const settingsRepository = {
  /**
   * Get all settings as key-value pairs.
   */
  async getAll(): Promise<Setting[]> {
    return db.settings.toArray();
  },

  /**
   * Get a setting value by key.
   */
  async get<T = unknown>(key: string): Promise<T | undefined> {
    const setting = await db.settings.get(key);
    return setting?.value as T | undefined;
  },

  /**
   * Create or update a setting.
   */
  async set(key: string, value: unknown): Promise<void> {
    await db.settings.put({ key, value, updatedAt: new Date() });
  },

  /**
   * Delete a setting by key.
   */
  async delete(key: string): Promise<void> {
    await db.settings.delete(key);
  },

  /**
   * Clear all settings.
   */
  async clear(): Promise<void> {
    await db.settings.clear();
  },
};
