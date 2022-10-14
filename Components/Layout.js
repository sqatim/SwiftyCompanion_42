import React from "react";
import { Image, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Outlet } from "react-router-native";
import styled from "styled-components/native";

export default function Layout({ children }) {
  return (
    <LayoutStyle>
      <NavBarStyle>
        {/* <ImageStyle source={require("../assets/Intra42.svg")}></ImageStyle> */}
        {/* <Image></Image> */}
        {/* <Image></Image> */}
      </NavBarStyle>
      <Outlet />
    </LayoutStyle>
  );
}

const LayoutStyle = styled.View`
  flex: 1;
  background-color: black;
  margin-top: 40px;
`;
const NavBarStyle = styled.View`
  flex: 1;
  background-color: red;
`;

const ImageStyle = styled.Image`
  width: 50px;
  height: 50px;
  margin-top: 100px;
  /* background-color: white; */
`;
