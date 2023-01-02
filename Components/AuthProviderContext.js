import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from "@env";
import { checkExpirationToken, fetchNewToken } from "../Utils/data";
import { makeRedirectUri } from "expo-auth-session";

const TOKEN_URL = "https://api.intra.42.fr/oauth/token";

const GRANT_TYPE = "authorization_code";

const AuthContext = createContext(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProviderContext({ children }) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN": {
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        }
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case "CHANGE_MODE": {
          return {
            ...prevState,
            light: !prevState.light,
          };
        }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      light: true,
    }
  );
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        const { tokenInfo } = await checkExpirationToken(dispatch);
        if (!tokenInfo.refreshed) {
          dispatch({ type: "SIGN_IN", token: tokenInfo.access_token });
        }
      } catch (e) {
        dispatch({ type: "SIGN_OUT" });
        // Restoring token failed
      }

    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (code) => {
        let data;
        try {
          data = await axios.post(TOKEN_URL, {
            grant_type: GRANT_TYPE,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URL,
          });
        } catch (error) {
          console.log("error:", error);
        }
        const tokenInfo = JSON.stringify(data.data);
        await SecureStore.setItemAsync("token", tokenInfo);
        dispatch({ type: "SIGN_IN", token: data.data.access_token });
      },
      refreshToken: async (refreshToken) => {
        let data;
        try {
          data = await axios.post(TOKEN_URL, {
            grant_type: "refresh_token",
            refresh_token: `${refreshToken}`,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          });
        } catch (error) {
          console.log("error:", error);
        }
        const tokenInfo = JSON.stringify(data.data);
        await SecureStore.setItemAsync("token", tokenInfo);
        dispatch({ type: "SIGN_IN", token: data.data.access_token });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync("token");
        dispatch({ type: "SIGN_OUT" });
      },
      changeMode: () => {
        dispatch({ type: "CHANGE_MODE" });
      },
      state: state,
      dispatch: dispatch,
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
