import { Image } from "expo-image";
import { router } from "expo-router";
import { Dimensions, Pressable, Text, View } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function LoginScreen() {
  return (
    <View className="flex-1">
      <Image
        source={require("@/assets/images/banner.png")}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: SCREEN_HEIGHT * 0.4,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 32,
        }}
      >
        <Image
          source={require("@/assets/logo/logo.png")}
          style={{ width: 100, height: 100, marginBottom: -10 }}
          contentFit="contain"
        />
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Text
            style={{
              fontSize: 62,
              fontWeight: "800",
              color: "#FFFFFF",
              letterSpacing: 2,
            }}
          >
            step
          </Text>
          <Text
            style={{
              fontSize: 62,
              fontWeight: "800",
              color: "#B7FF3C",
              letterSpacing: 2,
            }}
          >
            zo
          </Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            color: "#7D8799",
            letterSpacing: 0.5,
          }}
        >
          Track Every Step,
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#7D8799",
            marginTop: 4,
            letterSpacing: 0.5,
          }}
        >
          Achieve Every Goal
        </Text>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 60,
          left: 32,
          right: 32,
        }}
      >
        <Pressable
          style={{
            height: 56,
            borderRadius: 16,
            backgroundColor: "#B7FF3C",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => router.replace("/onboarding")}
        >
          <Text style={{ fontSize: 17, fontWeight: "700", color: "#000" }}>
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
