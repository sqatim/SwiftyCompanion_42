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
import * as SecureStore from "expo-secure-store";
import { fetchNewToken, getTokenFromStorage, getUser } from "../Utils/data";
import styled from "styled-components/native";
import { useNavigate } from "react-router-native";
import { useAuthContext } from "./AuthProviderContext";

export default function Home({ navigation }) {
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [found, setFound] = useState(true);
  let { state } = useAuthContext();

  // SecureStore.deleteItemAsync("token");

  const onPressSearch = () => {
    if (search) {
      setLoader(true);
      getUser(search, state.userToken)
        .then((data) => {
          navigation.navigate("User", data);
          setLoader(false);
          // navigate("/user", { replace: true, state: data });
        })
        .catch((error) => {
          console.log("error:", error);
          setFound(false);
          setLoader(false);
        });
    }
  };
  return (
    <ScrollView>
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
    </ScrollView>
  );
}

const TitleStyle = styled.Text`
  font-size: 35px;
  margin-bottom: 50px;
  font-weight: 700;
`;

const ContainerStyle = styled.View`
  width: 100%;
  align-items: center;
  flex: 1;
  margin-top: 200px;
`;

const ButtonStyle = styled.TouchableOpacity`
  border-radius: 10px;
  padding: 10px 20px;
  border: 0.5px solid #000;
  /* background-color: #841584; */
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: bold;
  align-self: center;
`;

const InputSearchStyle = styled.TextInput`
  border: 0.5px solid #000;
  padding: 5px 10px;
  width: 75%;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const SearchContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const NotFoundStyle = styled.Text`
  color: #f00;
  margin-top: 5px;
`;
