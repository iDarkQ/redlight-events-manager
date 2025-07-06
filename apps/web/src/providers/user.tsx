import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Configuration,
  ParticipantDto,
  UpdateProfileDto,
  UserApi,
  UserDto,
  UserRole,
} from "~/lib/api";
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
  participants: ParticipantDto[];
  fetched: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserDto | null>>;
  updateUser: (profileDto: UpdateProfileDto) => Promise<void>;
  updateUserBan: (id: string, ban: boolean) => Promise<void>;
  updateUserRole: (id: string, role: UserRole) => Promise<void>;
  fetchParticipants: () => Promise<void>;
  logout: () => void;
  uploadProfilePicture: (file: File) => Promise<string | undefined>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [cookie, setCookie, removeCookie] = useCookies(["sessionId"]);
  const { throwMessage } = useMessage();
  const [fetched, setFetched] = useState(false);

  const [user, setUser] = useState<UserDto | null>(null);
  const [participants, setParticipants] = useState<ParticipantDto[]>([]);

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
        setFetched(true);
        return data;
      }
    } catch (err) {
      throwMessage(err, "Failed to authorize");
      setFetched(true);
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

  const logout = () => {
    try {
      removeCookie("sessionId");

      // HACK: For some reason removing cookie is not enough
      // And so, I noticed that refreshing the site actually reloads them
      // Thus, clearing the one I intended to delete
      window.location.reload();

      setUser(null);
    } catch (err) {
      throwMessage(err, "Failed to logout");
    }
  };

  const fetchParticipants = async () => {
    try {
      const { data } = await userApi.userControllerFetchAll();

      setParticipants(data);
    } catch (err) {
      throwMessage(err, "Failed to fetch participants");
    }
  };

  const updateUserBan = async (id: string, ban: boolean) => {
    try {
      const { data } = await userApi.userControllerBanUser(id, { banned: ban });

      setParticipants((prev) =>
        prev.map((participant) =>
          participant.id === data.id
            ? {
                ...participant,
                ...data,
              }
            : participant,
        ),
      );
    } catch (err) {
      throwMessage(err, "Failed to ban participant");
    }
  };

  const updateUserRole = async (id: string, role: UserRole) => {
    try {
      const { data } = await userApi.userControllerUpdateRole(id, { role });

      setParticipants((prev) =>
        prev.map((participant) =>
          participant.id === data.id
            ? {
                ...participant,
                ...data,
              }
            : participant,
        ),
      );
    } catch (err) {
      throwMessage(err, "Failed to ban participant");
    }
  };

  useEffect(() => {
    if (cookie.sessionId) {
      authorize(cookie.sessionId);
    } else {
      setFetched(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        signIn,
        signUp,
        authorize,
        updateUser,
        updateUserBan,
        updateUserRole,
        uploadProfilePicture,
        fetchParticipants,
        participants,
        user,
        logout,
        setUser,
        fetched,
      }}
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
