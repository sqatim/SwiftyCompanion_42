import React, { useEffect, useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import * as SecureStore from "expo-secure-store";
import { useRoute } from "@react-navigation/native";
import { useAuthContext } from "./AuthProviderContext";
const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

export default function Header({ navigation }) {
  const route = useRoute();
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );
  let { signOut, changeMode, state } = useAuthContext();

  const logOutPress = () => {
    signOut();
  };

  const homePress = () => {
    if (route.name == "User") navigation.navigate("Home");
  };
  const changeModePress = () => {
    changeMode();
  };

  return (
    <TopSideStyle>
      <NavBarStyle>
        <TouchableOpacity onPress={homePress}>
          {state.light ? (
            <ImageStyle source={require("../assets/Intra42.png")}></ImageStyle>
          ) : (
            <ImageStyle
              source={require("../assets/Intra42White.png")}
            ></ImageStyle>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={changeModePress}>
          {state.light ? (
            <ImageStyle
              source={require("../assets/lightMode.png")}
            ></ImageStyle>
          ) : (
            <ImageStyle
              source={require("../assets/darkMode.png")}
            ></ImageStyle>
          )}
        </TouchableOpacity>
        {route.name != "Login" && (
          <TouchableOpacity activeOpacity={0.8} onPress={logOutPress}>
            {state.light ? (
              <ImageStyle
                source={require("../assets/LogoutDark.png")}
              ></ImageStyle>
            ) : (
              <ImageStyle
                source={require("../assets/LogoutWhite.png")}
              ></ImageStyle>
            )}
          </TouchableOpacity>
        )}
      </NavBarStyle>
    </TopSideStyle>
  );
}

const TopSideStyle = styled.View`
  width: 100%;
  padding: 10px 0;
  /* flex: 1; */
`;
const NavBarStyle = styled.View`
  /* flex: 1; */
  flex-direction: row;
  justify-content: space-around;
  padding: 15px 0px;
  /* background-color: red; */
`;

const ImageStyle = styled.Image`
  width: 35px;
  height: 35px;
  /* margin-top: 100px; */
  /* background-color: white; */
`;
