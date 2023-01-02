import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Home from "./Home";
import User from "./User";
import { useAuthContext } from "./AuthProviderContext";
import { ThemeProvider } from "styled-components/native";
import styled from "styled-components/native";
import { theme } from "../Utils/theme";

const Stack = createNativeStackNavigator();

export default function Routes() {
  let { state } = useAuthContext();

  return (
    <ThemeProvider theme={state.light ? theme.lightTheme : theme.darkTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.userToken ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="User" component={User} />
            </>
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const ViewStyle = styled.View`
  flex: 1;
  width: 100%;
`;
