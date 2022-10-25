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

const TOKEN_URL = "https://api.intra.42.fr/oauth/token";
const USER_URL = "https://api.intra.42.fr/v2/users/";

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
        const tokenInfo = await checkExpirationToken(dispatch);
        const { access_token } = JSON.parse(tokenInfo);
        userToken = access_token;
        console.log("userToken:", tokenInfo);
        dispatch({ type: "RESTORE_TOKEN", token: userToken });
      } catch (e) {
        console.log("error:", e);
        dispatch({ type: "SIGN_OUT" });
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (code) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        console.log("SignIn:", code);
        let data;
        try {
          data = await axios.post(TOKEN_URL, {
            grant_type: GRANT_TYPE,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: `${REDIRECT_URL}`,
          });
        } catch (error) {
          console.log("error:", error);
        }
        console.log("dispatch:", data.data);
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
        console.log("dispatch:", data.data);
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
