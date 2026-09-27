export type { User, Transaction, InventoryItem, Setting } from "@/db/schema";

export type { Language, TranslationKey } from "@/lib/i18n/translations";

export type UserRole = "admin" | "worker" | "viewer";

export type TransactionType = "sale" | "purchase" | "expense";
