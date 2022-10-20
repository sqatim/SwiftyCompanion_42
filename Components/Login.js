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
import { useAuthContext } from "./AuthProviderContext";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
  tokenEndpoint: "https://api.intra.42.fr/oauth/token",
};

export default function Login({ navigation }) {
  let { state, signIn } = useAuthContext();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: `${REDIRECT_URL}`,
    },
    discovery
  );
  const [loader, setLoader] = useState(false);
  // const navigate = useNavigate();

  const onPressLogin = () => {
    setLoader(true);
    promptAsync().then(async (value) => {
      await signIn(value.params.code).catch((error) =>
        console.log("error:", error)
      );
    });
  };

  return (
    <ContainerStyle>
      <TitleStyle>Swifty Companion</TitleStyle>
      {!loader ? (
        <ButtonStyle onPress={onPressLogin}>
          <ButtonText>Login</ButtonText>
        </ButtonStyle>
      ) : (
        <ActivityIndicator size="large"></ActivityIndicator>
      )}
    </ContainerStyle>
  );
}

const TitleStyle = styled.Text`
  font-size: 35px;
  margin-bottom: 50px;
  font-weight: 700;
`;

const ButtonStyle = styled.TouchableOpacity`
  border-radius: 10px;
  padding: 10px 20px;
  background-color: #841584;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  text-transform: uppercase;
`;
const ContainerStyle = styled.View`
  align-items: center;
  flex: 1;
  margin-top: 200px;
`;
