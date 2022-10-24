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

export const fetchNewToken = async () => {
  console.log("server");
  const data = await axios
    .post(TOKEN_URL, {
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: `${REDIRECT_URL}`,
    })
    .then(() => {
      console.log("jat ");
    });
  console.log("new fetch:", data);
  // await SecureStore.setItemAsync("token", data.data.access_token);
  // return data;
};

export const getTokenFromStorage = async () => {
  return await SecureStore.getItemAsync("token");
};

const checkExpirationToken = async () => {
  const tokenInfo = await getTokenFromStorage("token");
  const date = new Date().getTime() / 1000;
  console.log("token:", tokenInfo);
  const { expires_in: expire, created_at: createdAt } = JSON.parse(tokenInfo);
  console.log("-------------------------------------");
  console.log("expire:", expire);
  console.log("created at:", createdAt);
  console.log("Date:", date);
  console.log("-------------------------------------");
  if (createdAt + expire > date) return 1;
  else return 0;
};

export const getUser = async (user, token) => {
  // console.log("result:", await checkExpirationToken());
  console.log("token:", token);
  console.log("test:", token);
  return new Promise(async (resolve, reject) => {
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
          cursus,
        });
        resolve(data);
      })
      .catch((error) => {
        console.log("error:error:", error);
        reject("User not found!:");
      });
  });
  // });
};
