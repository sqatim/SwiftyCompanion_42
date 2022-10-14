import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from "@env";

const TOKEN_URL = "https://api.intra.42.fr/oauth/token";

const GRANT_TYPE = "authorization_code";

export const fetchToken = async (code) => {
  const data = await axios.post(TOKEN_URL, {
    grant_type: GRANT_TYPE,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    redirect_uri: REDIRECT_URL,
  });
  await SecureStore.setItemAsync("token", data.data.access_token);
  return data;
};

export const getTokenFromStorage = async () => {
  return await SecureStore.getItemAsync("token");
};
