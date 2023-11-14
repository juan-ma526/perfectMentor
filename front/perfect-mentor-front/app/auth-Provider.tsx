"use client";

import { NextResponse } from "next/server";
import { ReactNode, useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";

interface ContextProps {
  user: {
    id: string;
    name: string;
    email: string;
    rol: string;
    age: string;
    status: string;
    createdAt: string;
  } | null;
  signUp: (name: string, email: string, password: string) => any;
  signIn: (email: string, password: string) => any;
  logout: () => any;
  isAuthenticated: boolean;
  error: string[] | boolean;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext({} as ContextProps);

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string[] | boolean>(false);

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/users/signUp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
      const data = await response.json();
      if (data.message) {
        setError(data.message);
      }
      if (data.id) {
        setUser(data);
        setIsAuthenticated(true);
        setError(false);
      }
      return NextResponse.json(data);
    } catch (error: any) {
      setError(["Contraseña o mail incorrectos"]);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/users/signIn", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      if (data.message) {
        setError(data.message);
      }
      if (data.id) {
        setUser(data);
        setIsAuthenticated(true);
        setError(false);
      }

      return NextResponse.json(data);
    } catch (error: any) {
      setError(["Contraseña o mail incorrectos"]);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/users/logout", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
      setError(false);

      return NextResponse.json(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (cookies.token) {
        try {
          const response = await fetch(
            "http://localhost:3001/api/users/verifyToken",
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (!data) setIsAuthenticated(false);

          setIsAuthenticated(true);
          setUser(data);
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signUp, user, isAuthenticated, error, signIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
