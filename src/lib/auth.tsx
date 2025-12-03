"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type AuthUser = {
  name: string;
  email: string;
};

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER: "auth:currentUser",
  USERS: "auth:users",
};

function getStoredUsers(): Record<string, { name: string; password: string }> {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse stored users", error);
    return {};
  }
}

function persistUsers(users: Record<string, { name: string; password: string }>) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getStoredSession(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch (error) {
    console.error("Failed to parse stored session", error);
    return null;
  }
}

function persistSession(user: AuthUser | null) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return;
  }

  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionUser = getStoredSession();
    if (sessionUser) {
      setUser(sessionUser);
    }
    setIsLoading(false);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const users = getStoredUsers();
    const storedUser = users[email.toLowerCase()];

    if (!storedUser || storedUser.password !== password) {
      throw new Error("Invalid email or password");
    }

    const authUser = { name: storedUser.name, email: email.toLowerCase() };
    setUser(authUser);
    persistSession(authUser);
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const normalizedEmail = email.toLowerCase();
    const users = getStoredUsers();

    if (users[normalizedEmail]) {
      throw new Error("An account with this email already exists");
    }

    const newUsers = {
      ...users,
      [normalizedEmail]: { name: name.trim(), password },
    };

    persistUsers(newUsers);

    const authUser = { name: name.trim(), email: normalizedEmail };
    setUser(authUser);
    persistSession(authUser);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    persistSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
    }),
    [user, isLoading, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
