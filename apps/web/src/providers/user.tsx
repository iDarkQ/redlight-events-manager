import { createContext, ReactNode, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Configuration, UpdateProfileDto, UserApi, UserDto } from "~/lib/api";
import { useMessage } from "~/providers/message";

interface UserContextProps {
  signUp: (
    email: string,
    password: string,
    name: string,
    birthday: string,
  ) => Promise<UserDto | undefined>;
  signIn: (email: string, password: string) => Promise<UserDto | undefined>;
  authorize: (token: string) => Promise<UserDto | undefined>;
  user: UserDto | null;
  setUser: React.Dispatch<React.SetStateAction<UserDto | null>>;
  updateUser: (profileDto: UpdateProfileDto) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<string | undefined>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [cookie, setCookie, removeCookie] = useCookies(["sessionId"]);
  const { throwMessage } = useMessage();

  const [user, setUser] = useState<UserDto | null>(null);

  const config = new Configuration({
    basePath: import.meta.env.VITE_LOCAL_BACKEND_URL,
    accessToken: cookie.sessionId,
  });

  const userApi = new UserApi(config);

  const signIn = async (email: string, password: string): Promise<UserDto | undefined> => {
    try {
      removeCookie("sessionId");

      const { data } = await userApi.userControllerSignIn({ email, password });

      if (data) {
        setCookie("sessionId", data.token);
        return await authorize(data.token);
      }
    } catch (err) {
      throwMessage(err, "Failed to sign in");
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    birthday: string,
  ): Promise<UserDto | undefined> => {
    try {
      removeCookie("sessionId");

      const { data } = await userApi.userControllerSignUp({ email, password, name, birthday });

      if (data) {
        setCookie("sessionId", data.token);
        return await authorize(data.token);
      }
    } catch (err) {
      throwMessage(err, "Failed to sign up");
    }
  };

  const authorize = async (token: string): Promise<UserDto | undefined> => {
    try {
      const { data } = await userApi.userControllerAuthorize({ token });

      if (data) {
        setUser(data);
        return data;
      }
    } catch (err) {
      throwMessage(err, "Failed to authorize");
    }
  };

  const updateUser = async (profileDto: UpdateProfileDto) => {
    try {
      const { data } = await userApi.userControllerUpdate(profileDto);

      setUser(data);
    } catch (err) {
      throwMessage(err, "Failed to update event");
    }
  };

  const uploadProfilePicture = async (file: File): Promise<string | undefined> => {
    try {
      const { data } = await userApi.userControllerUploadProfilePhoto(file);

      return data.fileUrl;
    } catch (err) {
      throwMessage(err, "Failed to upload banner");
    }
  };

  return (
    <UserContext.Provider
      value={{ signIn, signUp, authorize, updateUser, uploadProfilePicture, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("useUser has to be used within UserProvider");
  }

  return context;
};
