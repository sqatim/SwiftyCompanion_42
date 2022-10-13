import { Button, StyleSheet, Text, View } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useNavigate } from "react-router-native";
import { fetchToken } from "../Utils/data";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
  tokenEndpoint: "https://api.intra.42.fr/oauth/token",
};

export default function Login() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId:
        "206fee68cc46139632092b796bfb14ed8b572f45c6a5e84228a4163d2f73644a",
      redirectUri: "exp://192.168.218.240:19000",
    },
    discovery
  );
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log("loader:", loader);
  //   if (response?.type == "success") {
  //     // console.log(response.params.code);
  //     // console.log("yeah:", response);
  //   }
  // }, [response]);
  const onPressLearnMore = () => {
    setLoader(true);
    promptAsync().then((value) => {
      console.log("value:", value);
      fetchToken(value.params.code)
      .then((value) => {
          navigate("/home", { replace: true });
          // console.log(value.data);
        })
        .catch((error) => console.log("error:", error));
    });
  };
  return (
    <View style={styles.container}>
      {!loader && (
        <Button onPress={onPressLearnMore} title="Learn More" color="#841584" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
