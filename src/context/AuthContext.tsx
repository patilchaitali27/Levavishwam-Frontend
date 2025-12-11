import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface IUser {
  userId: number;
  name: string;
  email?: string;
  role?: string;
}

interface IAuthContext {
  user: IUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (payload: any) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

 //const API_BASE = "https://localhost:7283/api/Auth";
//const API_BASE = "http://localhost:5041/api/auth";
const API_BASE = "https://localhost:44315/api/Auth";


function decodeJwtPayload(token: string) {
  try {
    const payload = token.split(".")[1];
    // Base64Url -> Base64
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<IUser | null>(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    // Optional: set axios default header when token is present
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const resp = await axios.post(`${API_BASE}/login`, { email, password });
      const data = resp.data;
      if (data?.isSuccess && data.token) {
        const jwt = data.token as string;
        // backend already returns userId & name; use that
        const userObj: IUser = {
          userId: data.userId,
          name: data.name,
          role: data.role
        };

        // try to decode email from token if present
        const decoded = decodeJwtPayload(jwt);
        if (decoded && decoded.sub) {
          userObj.email = decoded.sub;
        }

        // save to localStorage
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(userObj));

        setToken(jwt);
        setUser(userObj);

        return { success: true };
      } else {
        return { success: false, message: data?.message || "Login failed" };
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Network error";
      return { success: false, message };
    }
  };

  const signup = async (payload: any) => {
    try {
      const resp = await axios.post(`${API_BASE}/signup`, payload);
      const data = resp.data;
      if (data?.isSuccess) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data?.message || "Signup failed" };
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Network error";
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
