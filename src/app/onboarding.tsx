import { useState, useEffect } from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "@stepzo_onboarding_done";

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
    AsyncStorage.setItem(ONBOARDING_KEY, "true").then(() => {
      router.replace("/(tabs)");
    });
  };
  const goNext = () => {
    if (isLast) { goHome(); }
    else { setStep((s) => s + 1); }
  };

  useEffect(() => {
    if (frequency && place && current.key === "running") {
      const timer = setTimeout(goNext, 300);
      return () => clearTimeout(timer);
    }
  }, [frequency, place]);

  return (
    <View style={{ flex: 1, backgroundColor: "#0B1020" }}>
      <LinearGradient
        colors={["rgba(183,255,60,0.06)", "transparent", "rgba(59,130,246,0.04)"]}
        locations={[0, 0.5, 1]}
        style={{ flex: 1 }}
      >
        {/* ── Top bar ── */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 56, paddingBottom: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", minWidth: 60 }}>
            {step > 0 && (
              <Pressable onPress={() => setStep((s) => s - 1)}>
                <Text style={{ color: "#B7FF3C", fontSize: 22, fontWeight: "600" }}>←</Text>
              </Pressable>
            )}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            {SLIDES.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i <= step ? 22 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: i <= step ? "#B7FF3C" : "#242E42",
                }}
              />
            ))}
          </View>
          <Text style={{ color: "#7D8799", fontSize: 13, fontWeight: "500", minWidth: 40, textAlign: "right" }}>
            {step + 1}/{SLIDES.length}
          </Text>
        </View>

        {/* ── Content area (fills remaining space) ── */}
        {isGender ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
            <View
              style={{
                width: 64, height: 64, borderRadius: 20,
                backgroundColor: "rgba(183,255,60,0.1)",
                alignItems: "center", justifyContent: "center",
                marginBottom: 24,
                borderWidth: 1, borderColor: "rgba(183,255,60,0.15)",
              }}
            >
              <Text style={{ fontSize: 30 }}>{current.emoji}</Text>
            </View>
            <Text style={{ fontSize: 28, fontWeight: "700", color: "#FFF", letterSpacing: 0.3, lineHeight: 36, textAlign: "center" }}>
              {current.title}
            </Text>
            <Text style={{ fontSize: 15, color: "#7D8799", marginTop: 8, marginBottom: 40, lineHeight: 22, textAlign: "center" }}>
              {current.subtitle}
            </Text>
            <View style={{ flexDirection: "row", gap: 24 }}>
              {GENDERS.map((g) => {
                const sel = gender === g.label;
                return (
                  <Pressable
                    key={g.label}
                    onPress={() => { setGender(g.label); setTimeout(goNext, 250); }}
                    style={{
                      width: 146, height: 280, borderRadius: 28,
                      backgroundColor: sel ? "rgba(183,255,60,0.1)" : "rgba(22,29,46,0.8)",
                      borderWidth: 2,
                      borderColor: sel ? "#B7FF3C" : "rgba(42,52,72,0.5)",
                      overflow: "hidden",
                    }}
                  >
                    {sel && (
                      <View style={{ position: "absolute", top: 12, right: 12, zIndex: 10, width: 26, height: 26, borderRadius: 13, backgroundColor: "#B7FF3C", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 13, color: "#0B1020", fontWeight: "800" }}>✓</Text>
                      </View>
                    )}
                    <View style={{ flex: 1, overflow: "hidden" }}>
                      <Image source={g.icon} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                    </View>
                    <View style={{ height: "20%", alignItems: "center", justifyContent: "center", backgroundColor: sel ? "rgba(183,255,60,0.08)" : "rgba(255,255,255,0.03)", borderTopWidth: 1, borderTopColor: sel ? "rgba(183,255,60,0.2)" : "rgba(255,255,255,0.05)" }}>
                      <Text style={{ fontSize: 17, fontWeight: "700", color: sel ? "#FFF" : "#B5BDC9" }}>{g.label}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: "rgba(183,255,60,0.1)", alignItems: "center", justifyContent: "center", marginBottom: 24, borderWidth: 1, borderColor: "rgba(183,255,60,0.15)" }}>
              <Text style={{ fontSize: 30 }}>{current.emoji}</Text>
            </View>
            <Text style={{ fontSize: 28, fontWeight: "700", color: "#FFF", letterSpacing: 0.3, lineHeight: 36 }}>
              {current.title}
            </Text>
            <Text style={{ fontSize: 15, color: "#7D8799", marginTop: 8, marginBottom: 32, lineHeight: 22 }}>
              {current.subtitle}
            </Text>

            {/* Age */}
            {current.key === "age" && (
              <View>
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#7D8799", marginBottom: 12, letterSpacing: 1 }}>
                  SELECT YOUR AGE GROUP
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                  {["Under 18", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"].map((a) => (
                    <Pressable
                      key={a}
                      onPress={() => { setAge(a); setTimeout(goNext, 200); }}
                      style={{
                        width: "48%", height: 56, borderRadius: 16,
                        backgroundColor: age === a ? "rgba(183,255,60,0.12)" : "rgba(22,29,46,0.8)",
                        borderWidth: 1.5,
                        borderColor: age === a ? "#B7FF3C" : "rgba(42,52,72,0.6)",
                        alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: "600", color: age === a ? "#FFF" : "#B5BDC9" }}>{a}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            {/* Height */}
            {current.key === "height" && (
              <View>
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#7D8799", marginBottom: 12, letterSpacing: 1 }}>
                  SELECT YOUR HEIGHT
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                  {["Under 150 cm", "150-160 cm", "160-170 cm", "170-180 cm", "180-190 cm", "Over 190 cm"].map((h) => (
                    <Pressable
                      key={h}
                      onPress={() => { setHeight(h); setTimeout(goNext, 200); }}
                      style={{
                        width: "48%", height: 56, borderRadius: 16,
                        backgroundColor: height === h ? "rgba(183,255,60,0.12)" : "rgba(22,29,46,0.8)",
                        borderWidth: 1.5,
                        borderColor: height === h ? "#B7FF3C" : "rgba(42,52,72,0.6)",
                        alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: "600", color: height === h ? "#FFF" : "#B5BDC9" }}>{h}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            {/* Weight */}
            {current.key === "weight" && (
              <View>
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#7D8799", marginBottom: 12, letterSpacing: 1 }}>
                  SELECT YOUR WEIGHT
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                  {["Under 50 kg", "50-60 kg", "60-70 kg", "70-80 kg", "80-90 kg", "90-100 kg", "Over 100 kg"].map((w) => (
                    <Pressable
                      key={w}
                      onPress={() => { setWeight(w); setTimeout(goNext, 200); }}
                      style={{
                        width: "48%", height: 56, borderRadius: 16,
                        backgroundColor: weight === w ? "rgba(183,255,60,0.12)" : "rgba(22,29,46,0.8)",
                        borderWidth: 1.5,
                        borderColor: weight === w ? "#B7FF3C" : "rgba(42,52,72,0.6)",
                        alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: "600", color: weight === w ? "#FFF" : "#B5BDC9" }}>{w}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            {/* Running */}
            {current.key === "running" && (
              <View>
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#7D8799", marginBottom: 12, letterSpacing: 1 }}>
                  FREQUENCY
                </Text>
                <View style={{ gap: 10, marginBottom: 32 }}>
                  {RUN_FREQUENCIES.map((f) => (
                    <Pressable
                      key={f}
                      onPress={() => setFrequency(f)}
                      style={{
                        height: 52, borderRadius: 14,
                        backgroundColor: frequency === f ? "rgba(183,255,60,0.12)" : "rgba(22,29,46,0.8)",
                        borderWidth: 1.5,
                        borderColor: frequency === f ? "#B7FF3C" : "rgba(42,52,72,0.6)",
                        alignItems: "center", justifyContent: "center",
                        flexDirection: "row", gap: 8,
                      }}
                    >
                      {frequency === f && (
                        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#B7FF3C", alignItems: "center", justifyContent: "center" }}>
                          <Text style={{ fontSize: 11, color: "#0B1020", fontWeight: "700" }}>✓</Text>
                        </View>
                      )}
                      <Text style={{ fontSize: 16, fontWeight: "600", color: frequency === f ? "#FFF" : "#B5BDC9" }}>{f}</Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={{ fontSize: 14, fontWeight: "600", color: "#7D8799", marginBottom: 12, letterSpacing: 1 }}>
                  TERRAIN
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                  {RUN_PLACES.map((p) => (
                    <Pressable
                      key={p.label}
                      onPress={() => setPlace(p.label)}
                      style={{
                        flex: 1, minWidth: "45%", height: 80, borderRadius: 16,
                        backgroundColor: place === p.label ? "rgba(183,255,60,0.12)" : "rgba(22,29,46,0.8)",
                        borderWidth: 1.5,
                        borderColor: place === p.label ? "#B7FF3C" : "rgba(42,52,72,0.6)",
                        alignItems: "center", justifyContent: "center", gap: 6,
                      }}
                    >
                      <Text style={{ fontSize: 28 }}>{p.icon}</Text>
                      <Text style={{ fontSize: 13, fontWeight: "600", color: place === p.label ? "#FFF" : "#B5BDC9" }}>{p.label}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        )}

        {/* ── Bottom section (always in flow, never absolute) ── */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 50, paddingTop: 4 }}>
          {!isGender && (
            <Pressable
              onPress={goNext}
              style={{
                height: 56,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                marginBottom: 16,
              }}
            >
              <LinearGradient
                colors={["#D8FF5A", "#B7FF3C", "#8FD600"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
              />
              <Text style={{ fontSize: 17, fontWeight: "700", color: "#0B1020" }}>
                {isLast ? "Finish Setup" : "Continue"}
              </Text>
            </Pressable>
          )}
          <Pressable onPress={goHome} style={{ alignItems: "center" }}>
            <Text style={{ color: "#7D8799", fontSize: 15, fontWeight: "500" }}>Skip</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}
