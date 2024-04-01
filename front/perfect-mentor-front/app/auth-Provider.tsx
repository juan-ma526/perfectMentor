"use client";

import { ReactNode, useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  age: string;
  createdAt: string;
  email: string;
  id: string;
  password: string;
  rol: string;
  status: string;
  updatedAt: string;
  username: string;
}

interface ContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<ContextProps>({ user: null, setUser: () => {} });

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (cookies.token) {
        try {
          const response = await fetch("http://localhost:3001/api/users/verifyToken", {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Fallo en la verificacion del token");
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.log("Error en la verificacion", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkLogin();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
