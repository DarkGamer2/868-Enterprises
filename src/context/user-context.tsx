import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface UserContextType {
  user: { username: string } | null;
  setUser: (user: { username: string } | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://868-enterprises-api-production.up.railway.app/api/users/me', {
          withCredentials: true,
        });
        setUser({ username: response.data.username });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};