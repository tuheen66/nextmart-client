import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/type";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

//! creating a wrapper function (contextApi) to wrap all components

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //! getting user info from server function
  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };

  //! loading user info by calling the function handleUser()

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  //! sending userInfo as 'value' via Provider so that {children} can access them

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

//! this hook can only be used in components wrapped by UserProvider wrapper

//? we'll get user info when we call useUser hook from anywhere within UserProvider wrapper

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;

//! next=> got provider folder and create a component Providers.tsx
