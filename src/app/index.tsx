import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "@stepzo_onboarding_done";

export default function RootScreen() {
  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY).then((done) => {
      router.replace(done === "true" ? "/(tabs)" : "/login");
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1020", alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#B7FF3C" />
    </View>
  );
}
