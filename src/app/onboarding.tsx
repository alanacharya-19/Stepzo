import { useState, useEffect } from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "@stepzo_onboarding_done";
const USER_DATA_KEY = "@stepzo_user_data";

const SLIDES = [
  { key: "gender", emoji: "👤", title: "What's your gender?", subtitle: "We'll personalize your running experience" },
  { key: "age", emoji: "🎂", title: "How old are you?", subtitle: "To calculate accurate running metrics" },
  { key: "height", emoji: "📏", title: "What's your height?", subtitle: "Helps track your stride and progress" },
  { key: "weight", emoji: "⚖️", title: "What's your weight?", subtitle: "For precise calorie calculations" },
  { key: "running", emoji: "🏃", title: "How much do you run?", subtitle: "And where do you usually run?" },
];

const GENDERS = [
  { label: "Male", icon: require("@/assets/images/men.png") },
  { label: "Female", icon: require("@/assets/images/women.png") },
];

const RUN_FREQUENCIES = ["Just starting", "1-2 times/week", "3-4 times/week", "5+ times/week"];
const RUN_PLACES = [
  { label: "Outdoor", icon: "🌳" },
  { label: "Treadmill", icon: "🏋️" },
  { label: "Trail", icon: "⛰️" },
  { label: "Mixed", icon: "🔄" },
];

const GR = ["Under 18", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
const HR = ["Under 150 cm", "150-160 cm", "160-170 cm", "170-180 cm", "180-190 cm", "Over 190 cm"];
const WR = ["Under 50 kg", "50-60 kg", "60-70 kg", "70-80 kg", "80-90 kg", "90-100 kg", "Over 100 kg"];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [frequency, setFrequency] = useState("");
  const [place, setPlace] = useState("");

  const current = SLIDES[step];
  const isLast = step === SLIDES.length - 1;
  const isGender = current.key === "gender";

  const goHome = () => {
    const userData = JSON.stringify({ gender, age, height, weight, frequency, place });
    AsyncStorage.multiSet([[ONBOARDING_KEY, "true"], [USER_DATA_KEY, userData]]).then(() => router.replace("/(tabs)"));
  };
  const goNext = () => { if (isLast) goHome(); else setStep((s) => s + 1); };

  useEffect(() => {
    if (frequency && place && current.key === "running") {
      const timer = setTimeout(goNext, 300);
      return () => clearTimeout(timer);
    }
  }, [frequency, place]);

  const optBtn = (label: string, sel: boolean, onPress: () => void) => (
    <Pressable
      key={label}
      onPress={onPress}
      style={{
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: sel ? "rgba(183,255,60,0.1)" : "rgba(255,255,255,0.03)",
        borderWidth: 1,
        borderColor: sel ? "rgba(183,255,60,0.4)" : "rgba(255,255,255,0.05)",
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: "600", color: sel ? "#FFF" : "#B5BDC9", textAlign: "center" }}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1020" }}>
      {/* Top bar */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 56, paddingBottom: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", minWidth: 60 }}>
          {step > 0 && <Pressable onPress={() => setStep((s) => s - 1)}><Text style={{ color: "#B7FF3C", fontSize: 20, fontWeight: "600" }}>←</Text></Pressable>}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          {SLIDES.map((_, i) => (
            <View key={i} style={{ width: i <= step ? 22 : 8, height: 8, borderRadius: 4, backgroundColor: i <= step ? "#B7FF3C" : "rgba(255,255,255,0.08)" }} />
          ))}
        </View>
        <Text style={{ color: "#7D8799", fontSize: 13, fontWeight: "500", minWidth: 40, textAlign: "right" }}>{step + 1}/{SLIDES.length}</Text>
      </View>

      {/* Content */}
      {isGender ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
          <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: "rgba(183,255,60,0.08)", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <Text style={{ fontSize: 26 }}>{current.emoji}</Text>
          </View>
          <Text style={{ fontSize: 26, fontWeight: "700", color: "#FFF", letterSpacing: 0.3, lineHeight: 34, textAlign: "center" }}>{current.title}</Text>
          <Text style={{ fontSize: 14, color: "#7D8799", marginTop: 6, marginBottom: 36, lineHeight: 20, textAlign: "center" }}>{current.subtitle}</Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            {GENDERS.map((g) => {
              const sel = gender === g.label;
              return (
                <Pressable
                  key={g.label}
                  onPress={() => { setGender(g.label); setTimeout(goNext, 250); }}
                  style={{ width: 140, height: 260, borderRadius: 24, backgroundColor: sel ? "rgba(183,255,60,0.08)" : "rgba(255,255,255,0.02)", borderWidth: 1.5, borderColor: sel ? "rgba(183,255,60,0.35)" : "rgba(255,255,255,0.04)", overflow: "hidden" }}
                >
                  {sel && (
                    <View style={{ position: "absolute", top: 10, right: 10, zIndex: 10, width: 24, height: 24, borderRadius: 12, backgroundColor: "#B7FF3C", alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ fontSize: 11, color: "#0B1020", fontWeight: "800" }}>✓</Text>
                    </View>
                  )}
                  <View style={{ flex: 1, overflow: "hidden" }}>
                    <Image source={g.icon} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                  </View>
                  <View style={{ height: "18%", alignItems: "center", justifyContent: "center", backgroundColor: sel ? "rgba(183,255,60,0.06)" : "rgba(255,255,255,0.02)", borderTopWidth: 1, borderTopColor: sel ? "rgba(183,255,60,0.15)" : "rgba(255,255,255,0.03)" }}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: sel ? "#FFF" : "#B5BDC9" }}>{g.label}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 40 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: "rgba(183,255,60,0.08)", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <Text style={{ fontSize: 26 }}>{current.emoji}</Text>
          </View>
          <Text style={{ fontSize: 26, fontWeight: "700", color: "#FFF", letterSpacing: 0.3, lineHeight: 34 }}>{current.title}</Text>
          <Text style={{ fontSize: 14, color: "#7D8799", marginTop: 6, marginBottom: 28, lineHeight: 20 }}>{current.subtitle}</Text>

          {current.key === "age" && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {GR.map((a) => optBtn(a, age === a, () => { setAge(a); setTimeout(goNext, 200); }))}
            </View>
          )}
          {current.key === "height" && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {HR.map((h) => optBtn(h, height === h, () => { setHeight(h); setTimeout(goNext, 200); }))}
            </View>
          )}
          {current.key === "weight" && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {WR.map((w) => optBtn(w, weight === w, () => { setWeight(w); setTimeout(goNext, 200); }))}
            </View>
          )}
          {current.key === "running" && (
            <View>
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#7D8799", marginBottom: 10, letterSpacing: 0.5 }}>FREQUENCY</Text>
              <View style={{ gap: 8, marginBottom: 28 }}>
                {RUN_FREQUENCIES.map((f) => (
                  <Pressable
                    key={f}
                    onPress={() => setFrequency(f)}
                    style={{ paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12, backgroundColor: frequency === f ? "rgba(183,255,60,0.1)" : "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: frequency === f ? "rgba(183,255,60,0.4)" : "rgba(255,255,255,0.05)", flexDirection: "row", alignItems: "center", gap: 10 }}
                  >
                    {frequency === f && <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#B7FF3C", alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 10, color: "#0B1020", fontWeight: "700" }}>✓</Text></View>}
                    <Text style={{ fontSize: 15, fontWeight: "600", color: frequency === f ? "#FFF" : "#B5BDC9" }}>{f}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#7D8799", marginBottom: 10, letterSpacing: 0.5 }}>TERRAIN</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                {RUN_PLACES.map((p) => (
                  <Pressable
                    key={p.label}
                    onPress={() => setPlace(p.label)}
                    style={{ flex: 1, minWidth: "45%", paddingVertical: 20, borderRadius: 14, backgroundColor: place === p.label ? "rgba(183,255,60,0.1)" : "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: place === p.label ? "rgba(183,255,60,0.4)" : "rgba(255,255,255,0.05)", alignItems: "center", justifyContent: "center", gap: 6 }}
                  >
                    <Text style={{ fontSize: 26 }}>{p.icon}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "600", color: place === p.label ? "#FFF" : "#B5BDC9" }}>{p.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      )}

      {/* Bottom */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 50, paddingTop: 4 }}>
        {!isGender && (
          <Pressable onPress={goNext} style={{ height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 14 }}>
            <LinearGradient colors={["#D8FF5A", "#B7FF3C", "#8FD600"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#0B1020" }}>{isLast ? "Finish Setup" : "Continue"}</Text>
          </Pressable>
        )}
        <Pressable onPress={goHome} style={{ alignItems: "center" }}>
          <Text style={{ color: "#7D8799", fontSize: 14, fontWeight: "500" }}>Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}
