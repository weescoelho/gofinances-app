import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collectionsKey } from "../storage";

WebBrowser.maybeCompleteAuthSession();

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string | undefined;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const storageUser = await AsyncStorage.getItem(collectionsKey.user);
      setUser(JSON.parse(storageUser));
      setUserStorageLoading(false);
    }
    loadData();
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "331400609667-spt2c9ukisa5975cuddi1lrehuliqtga.apps.googleusercontent.com",
    iosClientId:
      "331400609667-a3lt301hhmk9n7k7uro5q47cc4n7jel3.apps.googleusercontent.com",
    androidClientId:
      "331400609667-a61v2ck0retv860vd1bidj9hpleg8lad.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  async function signInWithGoogle() {
    try {
      const result = await promptAsync();
      if (result.type === "success") {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          {
            headers: {
              Authorization: `Bearer ${result.authentication.accessToken}`,
            },
          },
        );
        const userInfo = {
          id: String(data.id),
          name: data.name,
          email: data.email,
          photo: data.picture,
        };
        setUser(userInfo);
        await AsyncStorage.setItem(
          collectionsKey.user,
          JSON.stringify(userInfo),
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const userInfo = {
          id: String(credential.user),
          name: String(credential.fullName),
          email: credential.email,
          photo: `https://ui-avatars.com/api/?name=${String(
            credential.fullName,
          ).replace(" ", "+")}`,
        };
        setUser(userInfo);
        await AsyncStorage.setItem(
          collectionsKey.user,
          JSON.stringify(userInfo),
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(collectionsKey.user);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
