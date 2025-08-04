import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  username: string;
  email: string;
  profilePic: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<{ username: string; email: string; profilePic: string }>('https://868-enterprises-api-production.up.railway.app/api/users/profile', {
          withCredentials: true,
        });
        setUser({ username: response.data.username, email: response.data.email, profilePic: response.data.profilePic });
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null); // Ensure user is null in case of error
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