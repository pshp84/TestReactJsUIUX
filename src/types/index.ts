export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface FormErrors {
  [key: string]: string;
}