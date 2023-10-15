import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { authModel, childern, userModel } from "./_models";
import * as Authhelper from "./Authhelper";
import { getUserByToken } from "./_request";

type AuthContextProps = {
  auth: authModel | undefined;
  saveAuth: (auth: authModel | undefined) => void;
  currentUser: userModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<userModel | undefined>>;
  logout: () => void;
};

const initAuthContext = {
  auth: Authhelper.Authhelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContext);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<childern> = ({ children }) => {
  const [auth, setAuth] = useState<authModel | undefined>(
    Authhelper.Authhelper.getAuth()
  );
  const [currentUser, setCurrentUser] = useState<userModel | undefined>();

  const saveAuth = (auth: authModel | undefined) => {
    setAuth(auth);
    if (auth) {
      Authhelper.Authhelper.setAuth(auth);
    } else {
      Authhelper.Authhelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<childern> = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth();
  const didRequest = useRef(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const request = async (apiToken: string) => {
      setLoading(true);
      try {
        if (!didRequest.current) {
          const { data } = await getUserByToken(apiToken);
          if (data) {
            setCurrentUser(data);
          } else {
            logout();
          }
        }
      } catch (error: any) {
        console.error(error);
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setLoading(false);
      }

      return () => (didRequest.current = true);
    };

    if (auth && auth.accessToken) {
      request(auth.accessToken);
    } else {
      logout();
      setLoading(false);
    }
  }, []);

  return <>{loading ? <div>Loading...</div> : children}</>;
};

export { AuthProvider, AuthInit, useAuth };
