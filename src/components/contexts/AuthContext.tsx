"use client";

import React, { createContext, useState, useEffect } from "react";
import { AuthUser, AuthContextValue } from "../../types";

// const defaultValue: AuthContextValue = {
//   user: null,
//   login: async (username: string, password: string) => {
//     return new Promise((resolve, reject) => {
//       resolve();
//     });
//   },
//   signup: async (username: string, password: string) => {
//     return new Promise((resolve, reject) => {
//       resolve();
//     });
//   },
//   logout: () => {
//     return null;
//   },
//   updateUser: (newUser: AuthUser) => {
//     return null;
//   },
// };

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        sessionStorage.setItem("user", JSON.stringify(data));
      } else {
        const { error } = await response.json();
        throw new Error(error);
      }
    } catch (err: any) {
      throw new Error(err?.message || err);
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        return response.json();
      } else {
        const { error } = await response.json();
        throw new Error(error);
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const updateUser = (newUser: AuthUser) => {
    sessionStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
