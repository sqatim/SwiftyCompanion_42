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

export const fetchNewToken = async (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    return await axios
      .post(TOKEN_URL, {
        grant_type: "refresh_token",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: refreshToken,
      })
      .then((value) => {
        // console.log("jat:", value.data);
        resolve(value.data);
      });
  });
};

export const getTokenFromStorage = async () => {
  return await SecureStore.getItemAsync("token");
};

export const checkExpirationToken = async (dispatch) => {
  const tokenInfo = await getTokenFromStorage("token");
  const date = new Date().getTime() / 1000;
  // console.log("tokenInfo:", tokenInfo);
  if (!tokenInfo) throw "No token found";
  // console.log("test:", tokenInfo)
  const { expires_in: expire, created_at: createdAt } = JSON.parse(tokenInfo);
  // console.log("-------------------------------------");
  // console.log("expire:", expire);
  // console.log("created at:", createdAt);
  // console.log("Date:", date);
  // console.log("-------------------------------------");
  if (createdAt + expire > date) {
    // console.log("not yet expired");
    return { refreshed: false, tokenInfo: JSON.parse(tokenInfo) };
  } else {
    const { refresh_token } = JSON.parse(tokenInfo);
    const newTokenInfo = await fetchNewToken(refresh_token);
    const newTokenInfoString = JSON.stringify(newTokenInfo);
    await SecureStore.setItemAsync("token", newTokenInfoString);
    dispatch({ type: "RESTORE_TOKEN", token: newTokenInfo.access_token });
    console.log("new Token Info:", newTokenInfo);
    return { refreshed: true, tokenInfo: newTokenInfo };
  }
};

export const getUser = async (user, dispatch) => {
  const { tokenInfo } = await checkExpirationToken(dispatch);
  const { access_token } = tokenInfo;
  // console.log("SignIn:", access_token);
  return new Promise(async (resolve, reject) => {
    return await axios
      .get(USER_URL + user, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((value) => {
        const {
          login,
          correction_point: correction,
          wallet,
          location,
          projects_users: projects,
          cursus_users: cursus,
          image: { link: picture },
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
        // console.log("error:error:", error);
        reject("User not found!:");
      });
  });
  // });
};
