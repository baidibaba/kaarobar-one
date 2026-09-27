export const APP_NAME = "Kaarobar One";
export const APP_NAME_URDU = "کاروبار ون";
export const APP_VERSION = "0.1.0";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ONBOARDING: "/onboarding",
  DASHBOARD: "/dashboard",
  TRANSACTIONS: "/transactions",
  INVENTORY: "/inventory",
  REPORTS: "/reports",
  SETTINGS: "/settings",
} as const;

export const USER_ROLES = {
  ADMIN: "admin",
  WORKER: "worker",
  VIEWER: "viewer",
} as const;

export const TRANSACTION_TYPES = {
  SALE: "sale",
  PURCHASE: "purchase",
  EXPENSE: "expense",
} as const;
