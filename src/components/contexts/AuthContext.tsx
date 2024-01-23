"use client";

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config.json";
import { AuthUser, AuthContextValue } from "../../types";

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // return () => {
    //   setUser(null);
    //   sessionStorage.removeItem("user");
    // };
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { data: response } = await axios(
        `${config.BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: { username, password },
        }
      );
      if (response.isSuccess) {
        const data = response.data;
        setUser(data);
        sessionStorage.setItem("user", JSON.stringify(data));
      } else throw new Error(response.error);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      const { data: response } = await axios(
        `${config.BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: { username, password },
        }
      );

      if (response.isSuccess) {
        const data = response.data;
        return data;
      } else throw new Error(response.error);
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
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
