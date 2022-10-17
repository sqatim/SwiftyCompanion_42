import React, { useState } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import { Outlet } from "react-router-native";
import styled from "styled-components/native";

const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

export default function Layout({ children }) {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );
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
          <ImageStyle source={require("../assets/Intra42.png")}></ImageStyle>
          <ImageStyle source={require("../assets/lightMode.png")}></ImageStyle>
          {/* <ImageStyle
            source={require("../assets/LogoutLight.png")}
          ></ImageStyle> */}
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
  flex: 1;
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
