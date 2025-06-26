import { UserDto } from "@redlight-events-manager/constants/user.dto";
import { createContext, ReactNode, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { $api } from "~/services/api-client";

interface UserContextProps {
  signIn: (email: string, password: string) => Promise<UserDto | undefined>;
  authorize: (token: string) => Promise<UserDto | undefined>;
  user: UserDto | null;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [_, setCookie, removeCookie] = useCookies(["sessionId"]);
  const [user, setUser] = useState<UserDto | null>(null);

  const signIn = async (email: string, password: string): Promise<UserDto | undefined> => {
    removeCookie("sessionId");

    const { data, error } = await $api.POST("/user/signIn", {
      body: {
        email,
        password,
      },
    });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setCookie("sessionId", data.token);
      return await authorize(data.token);
    }
  };

  const authorize = async (token: string): Promise<UserDto | undefined> => {
    const { data, error } = await $api.POST("/user/auth", {
      body: {
        token: token,
      },
    });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      const newUser = {
        ...data,
        birthday: new Date(data.birthday),
      };

      setUser(newUser);

      return newUser;
    }
  };

  return (
    <UserContext.Provider value={{ signIn, authorize, user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("useUser has to be used within UserProvider");
  }

  return context;
};
