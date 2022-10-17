import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { getTokenFromStorage } from "../Utils/data";
import styled from "styled-components/native";

export default function Home() {
  useEffect(() => {
    setTimeout(() => {
      getTokenFromStorage().then((value) => console.log(value));
    }, 3000);
  }, []);
  return (
    <ContainerStyle>
      {!loader ? (
        <ButtonStyle onPress={onPressLearnMore}>
          <ButtonText>Search</ButtonText>
        </ButtonStyle>
      ) : (
        <ActivityIndicator size="large"></ActivityIndicator>
      )}
    </ContainerStyle>
  );
}

const ContainerStyle = styled.View`
  align-items: center;
  flex: 2;
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