import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios and AxiosRequestConfig

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>; // Login now returns a Promise
  logout: () => void;
  loading: boolean;
  csrfToken: string | null; // To store the CSRF token
  getCsrfToken: () => Promise<void>; // Function to fetch the CSRF token
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [csrfToken, setCsrfToken] = useState<string | null>(null);
    const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check for a token on component mount
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        // In a real application, you'd verify the token with your backend
        // For this example, we'll assume if a token exists, the user is authenticated
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuthentication();
    fetchCsrfToken(); // Fetch CSRF token on mount
  }, []);

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('https://868-enterprises-api-production.up.railway.app/api/csrf-token'); // Assuming your backend provides a CSRF endpoint
      const token = response.data?.csrfToken; // Adjust based on your backend response
      if (token) {
        setCsrfToken(token);
      } else {
        console.error('Failed to fetch CSRF token');
      }
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  const login = async (token: string) => {
    try {
      // In a real app, you'd make an API call to authenticate
      // Example using axios with CSRF token in headers
      await axios.post('/api/login', { /* your login data */ }, {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
        },
      });

      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error, maybe clear token if it was set
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      // Optionally show an error message to the user
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    loading,
    csrfToken,
    getCsrfToken: fetchCsrfToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Example of how to use the CSRF token in a protected API call (in another component)
// import axios from 'axios';
// import { useAuth } from './AuthContext';
//
// const MyComponent = () => {
//   const { csrfToken } = useAuth();
//
//   const fetchData = async () => {
//     if (!csrfToken) {
//       console.log('CSRF token not yet available');
//       return;
//     }
//     try {
//       const response = await axios.get('/api/protected-data', {
//         headers: {
//           'X-CSRF-TOKEN': csrfToken,
//         },
//       });
//       console.log('Data:', response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//
//   return (
//     <div>
//       <button onClick={fetchData}>Fetch Protected Data</button>
//     </div>
//   );
// };