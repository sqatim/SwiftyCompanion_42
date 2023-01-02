import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchNewToken, getTokenFromStorage, getUser } from "../Utils/data";
import styled from "styled-components/native";
import { useAuthContext } from "./AuthProviderContext";
import Header from "./Header";
import * as SecureStore from "expo-secure-store";
export default function Home({ navigation }) {
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [found, setFound] = useState(true);
  let { state, dispatch } = useAuthContext();


  const onPressSearch = () => {
    if (search) {
      setLoader(true);
      getUser(search.trim(), dispatch)
        .then((data) => {
          setFound(true);
          navigation.navigate("User", data);
          setLoader(false);
        })
        .catch((error) => {
          console.log("error:", error);
          setFound(false);
          setLoader(false);
        });
    }
  };

  return (
    <ScrollViewStyle>
      <Header navigation={navigation} />
      <ContainerStyle>
        <TitleStyle>Swifty Companion</TitleStyle>
        {!loader ? (
          <SearchContainer>
            <InputSearchStyle
              placeholder="Choose a login"
              placeholderTextColor="#B3B3B3"
              onChangeText={setSearch}
            />
            <ButtonStyle onPress={onPressSearch}>
              <ButtonText>Search</ButtonText>
            </ButtonStyle>
            {!found && <NotFoundStyle>User not Found!</NotFoundStyle>}
          </SearchContainer>
        ) : (
          <ActivityIndicator size="large"></ActivityIndicator>
        )}
      </ContainerStyle>
    </ScrollViewStyle>
  );
}

const TitleStyle = styled.Text`
  font-size: 35px;
  margin-bottom: 50px;
  font-weight: 700;
  color: ${({ theme }) => theme.color};
`;

const ContainerStyle = styled.View`
  width: 100%;
  align-items: center;
  flex: 1;
  margin-top: 40px;
`;

const ButtonStyle = styled.TouchableOpacity`
  border-radius: 10px;
  padding: 10px 20px;
  border: 0.5px solid #000;
  border-color: ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.buttonBackground};
  /* background-color: #841584; */
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: bold;
  align-self: center;
  color: ${({ theme }) => theme.buttonColor};
`;

const InputSearchStyle = styled.TextInput`
  border: 0.5px solid #000;
  padding: 5px 10px;
  width: 75%;
  margin-bottom: 20px;
  border-radius: 8px;
  color: ${({ theme }) => theme.inputColor};
  background-color: ${({ theme }) => theme.inputBackground};
`;

const SearchContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const NotFoundStyle = styled.Text`
  color: #f00;
  margin-top: 5px;
`;

const ScrollViewStyle = styled.ScrollView`
  padding: 0 15px;
  background-color: ${({ theme }) => theme.background};
`;
