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
import Header from "./Header";

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

  const onPressLogin = () => {
    setLoader(true);
    promptAsync().then(async (value) => {
      console.log("promptAsync:", value)
      await signIn(value.params.code).catch((error) =>
        console.log("error:", error)
      );
    });
  };

  return (
    <ContainerStyle>
      <Header navigation={navigation} />
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
  margin-top: 50px;
  color: ${({ theme }) => theme.color};
`;

const ButtonStyle = styled.TouchableOpacity`
  border-radius: 10px;
  padding: 10px 20px;
  background-color: #841584;
  border: 0.5px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.buttonBackground};
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.buttonColor};
`;
const ContainerStyle = styled.View`
  align-items: center;
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  /* margin-top: 200px; */
`;
