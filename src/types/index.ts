export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
  specialty?: string;
  city?: string;
  phone?: string;
  photo?: string;
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
  register: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
  updateUser?: (updatedUser: Partial<User>) => void;
  deleteUser?: (userId: string) => void;
  registered?: User[] | null;
}

export interface FormErrors {
  [key: string]: string;
}

export interface ClientService {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface ClientServiceRequest {
  id: number;
  city: string;
  address: string;
  serviceType: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed";
}
