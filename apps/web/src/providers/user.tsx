import { createContext, ReactNode, useContext } from "react";

interface UserContextProps {
    test:string;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  return <UserContext.Provider value={undefined}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("useUser has to be used within UserProvider");
  }

  return context;
};
