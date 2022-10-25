import Login from "./Components/Login";
import Home from "./Components/Home";
import User from "./Components/User";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import Routes from "./Components/Routes";
import AuthProviderContext from "./Components/AuthProviderContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />
      <AuthProviderContext>
        <Routes />
      </AuthProviderContext>
    </SafeAreaView>
  );
}
