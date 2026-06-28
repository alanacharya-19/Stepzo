import { Image } from "expo-image";
import { router } from "expo-router";
import { Dimensions, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function LoginScreen() {
  return (
    <View className="flex-1">
      <Image source={require("@/assets/images/banner.png")} style={{ width: "100%", height: "100%" }} contentFit="cover" />
      <LinearGradient colors={["transparent", "rgba(11,16,32,0.85)", "#0B1020"]} locations={[0, 0.5, 0.85]} style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: SCREEN_HEIGHT * 0.6 }} />
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: SCREEN_HEIGHT * 0.35, alignItems: "center", justifyContent: "center", paddingHorizontal: 32 }}>
        <Image source={require("@/assets/logo/logo.png")} style={{ width: 80, height: 80, marginBottom: 8 }} contentFit="contain" />
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Text style={{ fontSize: 56, fontWeight: "800", color: "#FFFFFF", letterSpacing: 1 }}>step</Text>
          <Text style={{ fontSize: 56, fontWeight: "800", color: "#B7FF3C", letterSpacing: 1 }}>zo</Text>
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 80, left: 28, right: 28 }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#FFF", textAlign: "center", marginBottom: 8 }}>Track Every Step</Text>
        <Text style={{ fontSize: 14, color: "#B5BDC9", textAlign: "center", marginBottom: 36, lineHeight: 20 }}>Monitor your runs, set goals,{'\n'}and crush your personal best.</Text>
        <Pressable style={{ height: 52, borderRadius: 14, backgroundColor: "#B7FF3C", alignItems: "center", justifyContent: "center" }} onPress={() => router.replace("/signup")}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#0B1020" }}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
}
