"use client";

import { useState, useEffect } from "react";
import { userRepository } from "@/db/repositories/userRepository";
import type { User } from "@/db/schema";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session
    const checkSession = async () => {
      try {
        const savedUserId = localStorage.getItem("kaarobar_active_user");
        if (savedUserId) {
          const activeUser = await userRepository.getById(savedUserId);
          if (activeUser) {
            setUser(activeUser);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (userId: string) => {
    const activeUser = await userRepository.getById(userId);
    if (activeUser) {
      localStorage.setItem("kaarobar_active_user", userId);
      setUser(activeUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("kaarobar_active_user");
    setUser(null);
  };

  return { user, loading, login, logout };
}
