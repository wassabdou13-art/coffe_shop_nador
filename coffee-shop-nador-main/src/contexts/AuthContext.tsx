import { createContext, useContext, useState, ReactNode } from "react";

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

interface User {
  name: string;
  email: string;
  loyaltyPoints: number;
  orders: Order[];
  role: "customer" | "admin";
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string, name?: string) => boolean;
  logout: () => void;
}

const MOCK_USER: User = {
  name: "Youssef Alaoui",
  email: "youssef@example.com",
  loyaltyPoints: 340,
  orders: [
    { id: "ORD-7829", date: "2023-10-15", total: 125, status: "Delivered" },
    { id: "ORD-7940", date: "2023-11-02", total: 85, status: "Delivered" },
    { id: "ORD-8102", date: "2023-12-10", total: 210, status: "Delivered" },
  ],
  role: "customer",
};

const ADMIN_USER: User = {
  name: "Admin Qahwa",
  email: "admin@qahwa.ma",
  loyaltyPoints: 0,
  orders: [],
  role: "admin",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password?: string, name?: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === "admin@qahwa.ma") {
      if (password !== "admin123") return false;
      setUser(ADMIN_USER);
      return true;
    }

    setUser({ ...MOCK_USER, email, name: name || MOCK_USER.name });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isAdmin: user?.role === "admin", login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
