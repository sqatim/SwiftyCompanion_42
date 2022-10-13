import { Button, StyleSheet, Text, View } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { NativeRouter, Route, Link, Routes } from "react-router-native";
import Login from "./Components/Login";
import Home from "./Components/Home";

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </NativeRouter>
    // <View style={styles.container}>
    //   <Text> salam</Text>
    // </View>
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