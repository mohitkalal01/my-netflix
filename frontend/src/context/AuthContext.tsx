import { createContext, useState, useEffect, useCallback, useContext, ReactNode } from "react";
import api from "../services/api";
import { getMyList, addToMyList, removeFromMyList } from "../services/userApi";

interface IUser {
  id: string;
  username: string;
  role: string;
  email: string;
  isAdmin: boolean;
}

interface IMovie {
  _id: string;
  thumbnail: string;
  title: string;
  // Add other movie properties here
}

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
  loading: boolean;
  myList: IMovie[];
  addToMyListContext: (movie: IMovie) => void;
  removeFromMyListContext: (movieId: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: true,
  myList: [],
  addToMyListContext: () => {},
  removeFromMyListContext: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [myList, setMyList] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    if (token) {
      try {
        const [userData, listData] = await Promise.all([
          api.get("/users/me"),
          getMyList(),
        ]);
        setUser(userData.data);
        setMyList(listData);
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setMyList([]);
  };

  const addToMyListContext = async (movie: IMovie) => {
    // Optimistic update using the full movie object
    setMyList(prevList => [...prevList, movie]);

    try {
      const updatedList = await addToMyList(movie._id);
      // Replace the optimistic list with the confirmed list from the server
      setMyList(updatedList);
    } catch (error) {
      // Revert on error by removing the movie that was added optimistically
      setMyList(prevList => prevList.filter(m => m._id !== movie._id));
      console.error("Failed to add to list:", error);
    }
  };

  const removeFromMyListContext = async (movieId: string) => {
    const originalList = [...myList];
    
    // Optimistic update
    setMyList(prevList => prevList.filter(m => m._id !== movieId));
    
    try {
      const updatedList = await removeFromMyList(movieId);
      setMyList(updatedList); // Update with the actual list from the server
    } catch (error) {
      // Revert on error
      setMyList(originalList);
      console.error("Failed to remove from list:", error);
    }
  };
  
  // Set up interceptor
  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, myList, addToMyListContext, removeFromMyListContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
