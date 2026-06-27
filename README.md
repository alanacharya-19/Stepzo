# Stepzo 🏃‍♂️

A premium running companion built with **Expo SDK 56** + **NativeWind v4**. Dark mode, glassmorphism vibes, lime green accents — like Strava if it hung out in a cyberpunk alley.

![Expo](https://img.shields.io/badge/Expo-56-000?style=flat&logo=expo) ![React Native](https://img.shields.io/badge/RN-0.85-61DAFB?style=flat&logo=react) ![NativeWind](https://img.shields.io/badge/NativeWind-v4-06B6D4?style=flat&logo=tailwindcss)

---

## ✨ Features

**Onboarding** — 5-slide flow (gender, age, height, weight, running level) with tap-to-select cards that auto-advance. Data saved to AsyncStorage.

**Live Run Tracking** — Full GPS tracking with `BestForNavigation` accuracy. Start / pause / resume / stop state machine. Kilometer split detection with voice announcements via `expo-speech`. Haptic feedback on every transition. Route drawn as a real-time Polyline.

**Dashboard** — Weekly & monthly distance progress bars, streak badge (consecutive days), today's stats in concentric SVG rings (steps/time/calories), recent runs list. Pull-to-refresh with loading skeleton placeholders.

**Territory Map** — Full-screen map showing saved run routes as colored Polylines with a toggle overlay button. Location permission handling with two overlay states. Recent activities list populated from saved runs.

**Leaderboard** — Friends / Global toggle. Mocked friends + real "You" row with actual user stats. Gold/silver/bronze rank badges.

**Profile** — Real aggregated stats from saved runs. Goals section with inline edit modal. Achievements grid (14 badges, earned = green glow, locked = dimmed). Menu item to navigate to Analytics charts. Onboarding data display. Logout.

**Charts** — SVG bar chart for 8-week distance trends, dot/line chart for pace over time (last 20 runs), calendar heatmap for current month (green cells = ran, highlighted today). All built with `react-native-svg`.

**Run Detail** — Map replay of the route, distance / duration / pace stats, kilometer splits table, Share button that captures a screenshot via `react-native-view-shot` and shares via `expo-sharing`.

**Custom Tab Bar** — Dynamic Island-style pill with PNG icons and a floating lime green Start button. Animated press feedback via `react-native-reanimated`.

**Achievements (14)** — Automatically checked on every Home focus. First Run, 5K/10K/Half/Marathon clubs, streak milestones (3/7/30 days), Week Warrior, Monthly 50K/100K, runs milestones (10/50/100). Persisted to `@stepzo_achievements`.

**Goals** — Weekly & monthly distance targets saved to `@stepzo_goals`. Editable inline modal from Home or Profile with numeric input fields.

**Streaks** — Calculated by walking backward from today, checking consecutive calendar days. Active if the latest run is today or yesterday.

---

## 🛠 Tech Stack

| Layer | What |
|-------|------|
| Framework | Expo SDK 56 (New Architecture) |
| Navigation | expo-router (file-based) |
| Styling | NativeWind v4 + inline style for dynamic colors |
| Animations | react-native-reanimated 4 + react-native-worklets |
| Maps | react-native-maps (Google Maps, needs API key) |
| Charts | react-native-svg (custom SVG primitives) |
| Storage | @react-native-async-storage/async-storage |
| Haptics | expo-haptics |
| Speech | expo-speech (km split announcements) |
| Sharing | react-native-view-shot + expo-sharing |
| Icons | Custom PNG assets in `assets/logo/` |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── _layout.tsx          # Root stack (login, onboarding, tabs, charts, run-detail)
│   ├── index.tsx            # Root route → redirect to login or tabs
│   ├── login.tsx            # Splash with gradient + Get Started
│   ├── onboarding.tsx       # 5-slide onboarding flow
│   ├── signup.tsx           # Signup form
│   ├── charts.tsx           # SVG bar/line charts + calendar heatmap
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab navigator → CustomTabBar
│   │   ├── index.tsx        # Home dashboard
│   │   ├── territory.tsx    # Map + run routes
│   │   ├── run.tsx          # Live run tracking
│   │   ├── leaderboard.tsx  # Friends/Global leaderboard
│   │   └── profile.tsx      # Stats, goals, achievements
│   └── run-detail/
│       └── [id].tsx         # Run detail with map + splits + share
├── components/
│   ├── CustomTabBar.tsx     # Dynamic Island pill tab bar
│   ├── HomeHeader.tsx       # Greeting + notification bell
│   ├── ThemedView.tsx
│   └── ThemedText.tsx
├── constants/
│   └── theme.ts             # Flat Colors object + Fonts + Spacing
├── hooks/
│   └── use-theme.ts         # Returns Colors directly
├── utils/
│   ├── storage.ts           # loadRuns / saveRun (AsyncStorage)
│   ├── goals.ts             # Goals CRUD + calcWeekly/Monthly + calcStreak
│   └── achievements.ts      # 14 achievements + check + persist
├── types.ts                 # RunPoint, RunData interfaces
└── global.css               # NativeWind entry
```

---

## 🚀 Getting Started

```bash
git clone <repo-url>
cd stepzo
npm install
```

### Google Maps (optional, for map tiles)

Open `app.json` and replace `YOUR_GOOGLE_MAPS_API_KEY` with a real key, then run a native build:

```bash
npx expo run:android   # or npx expo run:ios
```

### Development

```bash
npx expo start
```

Metro cache issues after config changes? Use `npx expo start --clear`.

---

## 🎨 Design System

- **Primary**: `#B7FF3C` (lime green)
- **Background**: `#0B1020` (deep navy)
- **Surface**: `#161D2E` / `#1D263A` (glass cards)
- **Text**: White → muted gray hierarchy
- **Tab Bar**: Dynamic Island pill `rgba(26,34,56,0.96)`
- **Consistent 24px margins** throughout
- **Gradients** via `expo-linear-gradient`

---

## 📦 AsyncStorage Keys

| Key | What |
|-----|------|
| `@stepzo_onboarding_done` | Onboarding completion flag |
| `@stepzo_user_data` | User profile (age, gender, etc.) |
| `@stepzo_runs` | Array of RunData objects |
| `@stepzo_goals` | `{ weeklyDistance, monthlyDistance }` |
| `@stepzo_achievements` | Array of earned achievement IDs |

---

## 🤝 Contributing

PRs welcome. Keep the dark theme consistent, use the flat Colors object, and don't touch `babel.config.js`'s `jsxImportSource` — NativeWind v4 handles that.

---

## 📄 License

MIT — see [LICENSE](LICENSE).
