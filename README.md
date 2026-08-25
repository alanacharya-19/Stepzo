# Stepzo 🏃‍♂️

**Stepzo** is a modern running companion designed to help you **track runs, set goals, build streaks, and improve your performance** — all in a clean dark interface with a fresh lime-green style.

![Expo](https://img.shields.io/badge/Expo-56-000?style=flat\&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.85-61DAFB?style=flat\&logo=react)
![NativeWind](https://img.shields.io/badge/NativeWind-v4-06B6D4?style=flat\&logo=tailwindcss)

## ✨ What Stepzo Offers

* 🏃 **Run Tracking** — Track distance, time, pace, route, and kilometer splits using GPS.
* 🗺️ **Run Maps** — View your current route and replay previous runs.
* 📊 **Progress Dashboard** — See weekly and monthly progress, recent runs, and daily stats.
* 🔥 **Running Streaks** — Stay motivated by maintaining consecutive running days.
* 🎯 **Goals** — Create weekly and monthly distance targets.
* 🏆 **Achievements** — Unlock badges for milestones, streaks, and distance goals.
* 🥇 **Leaderboard** — Compare your performance with friends and global runners.
* 📈 **Analytics** — View distance trends, pace history, and monthly activity.
* 👤 **Profile** — Manage your information, goals, achievements, and running statistics.
* 📤 **Share Runs** — Capture and share your completed run details.
* 📳 **Haptic & Voice Feedback** — Get vibration and voice notifications while running.

## 🛠️ Built With

| Technology            | Purpose               |
| --------------------- | --------------------- |
| **Expo SDK 56**       | App framework         |
| **React Native**      | Mobile application    |
| **Expo Router**       | Navigation            |
| **NativeWind v4**     | Styling               |
| **React Native Maps** | GPS maps and routes   |
| **React Native SVG**  | Charts and statistics |
| **AsyncStorage**      | Local data storage    |
| **Reanimated**        | Animations            |
| **Expo Haptics**      | Vibration feedback    |
| **Expo Speech**       | Voice announcements   |

## 📁 Project Structure

```text
src/
├── app/
│   ├── login.tsx
│   ├── signup.tsx
│   ├── onboarding.tsx
│   ├── charts.tsx
│   ├── run-detail/
│   └── (tabs)/
│       ├── index.tsx
│       ├── run.tsx
│       ├── territory.tsx
│       ├── leaderboard.tsx
│       └── profile.tsx
│
├── components/
│   ├── CustomTabBar.tsx
│   ├── HomeHeader.tsx
│   ├── ThemedView.tsx
│   └── ThemedText.tsx
│
├── constants/
│   └── theme.ts
│
├── hooks/
│   └── use-theme.ts
│
├── utils/
│   ├── storage.ts
│   ├── goals.ts
│   └── achievements.ts
│
├── types.ts
└── global.css
```

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone <repo-url>
cd stepzo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npx expo start
```

For a clean Metro cache:

```bash
npx expo start --clear
```

### 🗺️ Google Maps Setup

If you want to use Google Maps, add your API key inside `app.json`.

Then build the native project:

```bash
npx expo run:android
```

or

```bash
npx expo run:ios
```

## 🎨 Design

Stepzo uses a simple **dark + neon** visual style:

* 🟢 Primary: `#B7FF3C`
* 🌑 Background: `#0B1020`
* 🪟 Cards: `#161D2E`
* ⚪ Primary text: White
* 🔘 Secondary text: Muted gray

The interface uses rounded cards, subtle gradients, smooth animations, and a floating tab bar to create a modern running-app experience.

## 💾 Local Storage

Stepzo stores important app data locally using AsyncStorage.

| Storage Key               | Data                 |
| ------------------------- | -------------------- |
| `@stepzo_onboarding_done` | Onboarding status    |
| `@stepzo_user_data`       | User information     |
| `@stepzo_runs`            | Saved runs           |
| `@stepzo_goals`           | Weekly/monthly goals |
| `@stepzo_achievements`    | Earned achievements  |

## 🏆 Achievements

Stepzo includes **14 achievements**, including:

* First Run
* 5K Club
* 10K Club
* Half Marathon
* Marathon
* 3-Day Streak
* 7-Day Streak
* 30-Day Streak
* Week Warrior
* 50K Month
* 100K Month
* 10 Runs
* 50 Runs
* 100 Runs

Achievements are automatically checked as you continue running.

## 🤝 Contributing

Contributions are welcome!

When contributing:

1. Keep the existing design style.
2. Follow the current project structure.
3. Keep components reusable.
4. Test your changes before submitting a PR.

## 📄 License

This project is licensed under the **MIT License**.
