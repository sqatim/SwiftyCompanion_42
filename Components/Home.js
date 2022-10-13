import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { getTokenFromStorage } from "../Utils/data";

export default function Home() {
  useEffect(() => {
    setTimeout(() => {
      getTokenFromStorage().then((value) => console.log(value));
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Text>salam a drari</Text>
    </View>
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
