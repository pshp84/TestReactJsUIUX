import { Service, User } from '../types';

// Mock user data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'User',
    email: 'user@example.com',
    password: 'password'
  }
];

// Mock service data
export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Web Development',
    description: 'Website development',
    price: 1499,
    category: 'development',
    imageUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    name: 'App Development',
    description: 'App development for iOS and Android',
    price: 2999,
    category: 'development',
    imageUrl: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '3',
    name: 'UI/UX Design',
    description: 'User interface and experience design for web and mobile',
    price: 999,
    category: 'design',
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '4',
    name: 'SEO Optimization',
    description: 'Search engine optimization',
    price: 799,
    category: 'marketing',
    imageUrl: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '5',
    name: 'Content Creation',
    description: 'Content writing and marketing',
    price: 599,
    category: 'marketing',
    imageUrl: 'https://images.pexels.com/photos/1766604/pexels-photo-1766604.jpeg'
  }
];

let services = [...mockServices];

export const getServices = (): Promise<Service[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(services);
    }, 500);
  });
};

export const getServiceById = (id: string): Promise<Service | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = services.find(s => s.id === id);
      resolve(service);
    }, 300);
  });
};

export const addService = (service: Omit<Service, 'id'>): Promise<Service> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newService = {
        ...service,
        id: Math.random().toString(36).substring(2, 9)
      };
      services = [...services, newService];
      resolve(newService);
    }, 500);
  });
};

export const updateService = (id: string, updatedService: Omit<Service, 'id'>): Promise<Service> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = services.findIndex(s => s.id === id);
      if (index === -1) {
        reject(new Error('Service not found'));
        return;
      }
      const updated = { ...updatedService, id };
      services = [
        ...services.slice(0, index),
        updated,
        ...services.slice(index + 1)
      ];
      resolve(updated);
    }, 500);
  });
};

export const deleteService = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      services = services.filter(s => s.id !== id);
      resolve();
    }, 500);
  });
};

export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

export const register = (name: string, email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        reject(new Error('Email already in use'));
        return;
      }
      
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        password
      };
      
      mockUsers.push(newUser);
      
      const { password: _, ...userWithoutPassword } = newUser;
      resolve(userWithoutPassword);
    }, 1000);
  });
};