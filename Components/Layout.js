import React, { useEffect, useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { Outlet, useLocation, useNavigate } from "react-router-native";
import styled from "styled-components/native";
import * as SecureStore from "expo-secure-store";

const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

export default function Layout({ children }) {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );
  const location = useLocation();
  const navigate = useNavigate();

  const logOutPress = () => {
    SecureStore.deleteItemAsync("token").then(() => {
      console.log("logout");
      navigate("/", { replace: true });
    });
  };

  const homePress = () => {
    navigate("/", { replace: true });
  };
  return (
    <LayoutStyle>
      <TopSideStyle>
        <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <NavBarStyle>
          <TouchableOpacity onPress={homePress}>
            <ImageStyle source={require("../assets/Intra42.png")}></ImageStyle>
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageStyle
              source={require("../assets/lightMode.png")}
            ></ImageStyle>
          </TouchableOpacity>
          {location.pathname != "/" && (
            <TouchableOpacity activeOpacity={0.8} onPress={logOutPress}>
              <ImageStyle
                source={require("../assets/LogoutLight.png")}
              ></ImageStyle>
            </TouchableOpacity>
          )}
        </NavBarStyle>
      </TopSideStyle>
      <Outlet />
    </LayoutStyle>
  );
}

const LayoutStyle = styled.View`
  flex: 1;
  /* background-color: black; */
  /* margin-top: 40px; */
`;

const TopSideStyle = styled.View`
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
