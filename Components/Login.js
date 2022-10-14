import {
  ActivityIndicator,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useNavigate } from "react-router-native";
import { fetchToken } from "../Utils/data";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from "@env";
import styled from "styled-components/native";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
  tokenEndpoint: "https://api.intra.42.fr/oauth/token",
};

export default function Login() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URL,
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
          console.log("test:", value.data);
          navigate("/home", { replace: true });
        })
        .catch((error) => console.log("error:", error));
    });
  };
  return (
    <ContainerStyle>
      {/* <ImageBackgroundStyle
        resizeMode="cover"
        source={require("../assets/background.jpg")}
        // style={{ flex: 1 }}
      > */}
      {!loader ? (
        <Button onPress={onPressLearnMore} title="Learn More" color="#841584" />
      ) : (
        <ActivityIndicator size="large"></ActivityIndicator>
      )}
      {/* </ImageBackgroundStyle> */}
    </ContainerStyle>
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

const TitleStyle = styled.Text`
  flex: 1;
`;
const ContainerStyle = styled.View`
  /* background-color: red; */
  align-items: center;
  /* justify-content: center; */
  flex: 1;
`;

const ImageBackgroundStyle = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  width: 100%;
`;
