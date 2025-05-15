/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "../types";
import { register as registerFunction } from "../data/mock-data";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registered, setRegistered] = useState<User[] | null>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const registerUser = localStorage.getItem("registeredusers");
    if (storedUser) {
      try {
        const CurrentUser = JSON.parse(storedUser);
        const currentRegisterUser = registerUser
          ? JSON.parse(registerUser)
          : "";
        setUser(CurrentUser);
        setRegistered(currentRegisterUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const updateUser = (updatedUser: Partial<User>) => {
    if (!user) return;

    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    // Also update in registered users list
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredusers") || "[]"
    );
    const updatedUsers = registeredUsers.map((u: User) =>
      u.email === user.email ? newUser : u
    );
    localStorage.setItem("registeredusers", JSON.stringify(updatedUsers));
  };

  const login = async (email: string, password?: string) => {
    if (email === "admin@yopmail.com" && password === "admin123$") {
      const adminUser: User = {
        name: "Admin",
        email: "admin@example.com",
        role: "admin",
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return;
    }
    const usersFromStorage = localStorage.getItem("registeredusers");

    if (!usersFromStorage) {
      throw new Error("No registered users found");
    }

    const registeredUsers = JSON.parse(usersFromStorage);

    const foundUser = registeredUsers.find(
      (user: User) => user.email === email
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    setUser(foundUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(foundUser));
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    const newUser = await registerFunction(name, email, password, role);
    //setUser(newUser);
    //setIsAuthenticated(true);
    const existingUsers: any[] = JSON.parse(
      localStorage.getItem("registeredusers") || "[]"
    );
    existingUsers.push(newUser);
    setRegistered(existingUsers);
    localStorage.setItem("registeredusers", JSON.stringify(existingUsers));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("services");
  };

  const deleteUser = (userId: string) => {
    const updatedUsers = registered?.filter((user) => user.id !== userId) || [];
    setRegistered(updatedUsers);
    localStorage.setItem("registeredusers", JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        registered,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
