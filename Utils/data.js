import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from "@env";

const TOKEN_URL = "https://api.intra.42.fr/oauth/token";
const USER_URL = "https://api.intra.42.fr/v2/users/";

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

export const getUser = async (user) => {
  return new Promise(async (resolve, reject) => {
    await getTokenFromStorage().then((token) => {
      console.log("value:", token, "| user:", user);
      return axios
        .get(USER_URL + user, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((value) => {
          const {
            login,
            correction_point: correction,
            wallet,
            location,
            projects_users: projects,
            cursus_users: cursus,
            image_url: picture,
          } = value.data;
          const data = {};
          Object.assign(data, {
            login,
            correction,
            wallet,
            location,
            projects,
            picture,
            cursus
          });
          resolve(data);
        })
        .catch(() => {
          reject("User not found!");
        });
    });
  });
};
