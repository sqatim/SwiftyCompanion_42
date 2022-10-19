import Login from "./Components/Login";
import Home from "./Components/Home";
import Layout from "./Components/Layout";
import User from "./Components/User";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import Routes from "./Components/Routes";
import AuthProviderContext from "./Components/AuthProviderContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProviderContext>
      <Routes />
    </AuthProviderContext>
  );
}
