import React, { createContext, useContext, useState, useEffect } from 'react';

// Demo users for testing
const demoUsers = [
  {
    id: 'client-1',
    email: 'client@demo.com',
    password: 'password123',
    name: 'John Demo',
    type: 'client' as const
  },
  {
    id: 'professional-1',
    email: 'professional@demo.com',
    password: 'password123',
    name: 'Dev Johns',
    type: 'professional' as const
  },
  {
    id: 'admin-1',
    email: 'admin@demo.com',
    password: 'admin123',
    name: 'Admin User',
    type: 'admin' as const
  }
];

interface User {
  id: string;
  name: string;
  email: string;
  type: 'client' | 'professional' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'client' | 'professional' | 'admin') => Promise<boolean>;
  signup: (email: string, password: string, name: string, userType: 'client' | 'professional' | 'admin') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children  } : any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('g-urban-glow-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  // Login function
  const login = async (email: string, password: string, userType: 'client' | 'professional' | 'admin'): Promise<boolean> => {
    const demoUser = demoUsers.find(u => 
      u.email === email && 
      u.password === password && 
      u.type === userType
    );
    
    if (demoUser) {
      const { password: _, ...userWithoutPassword } = demoUser;
      setUser(userWithoutPassword);
      localStorage.setItem('g-urban-glow-user', JSON.stringify(userWithoutPassword));

      if (userType === 'admin') {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = userType === 'client' ? '/client-dashboard' : '/professional-dashboard';
      }
      return true;
    }
    
    return false;
  };
  
  // Signup function
  const signup = async (
    email: string, 
    password: string, 
    name: string, 
    userType: 'client' | 'professional' | 'admin'
  ): Promise<boolean> => {
    if (demoUsers.some(u => u.email === email)) {
      return false;
    }

    const newUser = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      email,
      name,
      type: userType
    };
    
    setUser(newUser);
    localStorage.setItem('g-urban-glow-user', JSON.stringify(newUser));

    window.location.href = userType === 'client' ? '/client-dashboard' : '/professional-dashboard';
    return true;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('g-urban-glow-user');
    window.location.href = '/';
  };
  
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};