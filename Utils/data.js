import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TOKEN_URL = "https://api.intra.42.fr/oauth/token";
const CLIEND_ID =
  "206fee68cc46139632092b796bfb14ed8b572f45c6a5e84228a4163d2f73644a";
const CLIENT_SECRET =
  "218cd86759148a22d151b1be4b12322506a12dbe63e464ef3c4b933c90c49fb3";

const GRANT_TYPE = "client_credentials";

export const fetchToken = async (code) => {
  const data = await axios.post(TOKEN_URL, {
    grant_type: GRANT_TYPE,
    client_id: CLIEND_ID,
    client_secret: CLIENT_SECRET,
    code: code,
  });
  console.log("token:", data.data);
  await SecureStore.setItemAsync("token", data.data.access_token);
  return data;
};

export const getTokenFromStorage = async () => {
  return await SecureStore.getItemAsync("token");
};
