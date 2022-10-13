import { Button, StyleSheet, Text, View } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useNavigate } from "react-router-native";

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
      redirectUri: "exp://192.168.99.11:19000",
    },
    discovery
  );
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // const responseObj = JSON.parse(response);
    // console.log("response:", response.type);
    console.log("loader:", loader);
    if (response?.type == "success") {
      console.log("yeah");
    }
  }, [response]);
  const onPressLearnMore = () => {
    setLoader(true);
    promptAsync().then((value) => {
      console.log("value:", value);
      navigate("/home", { replace: true });
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
