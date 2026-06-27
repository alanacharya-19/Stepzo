import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RunData } from "@/types";
import { calcStreak } from "./goals";

const EARNED_KEY = "@stepzo_achievements";

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

const ALL: Achievement[] = [
  { id: "first_run", title: "First Run", subtitle: "Complete your first run", icon: "footsteps" },
  { id: "5k", title: "5K Club", subtitle: "Run 5 km in a single run", icon: "trophy" },
  { id: "10k", title: "10K Club", subtitle: "Run 10 km in a single run", icon: "trophy" },
  { id: "half", title: "Half Marathon", subtitle: "Run 21.1 km in a single run", icon: "trophy" },
  { id: "marathon", title: "Marathon", subtitle: "Run 42.2 km in a single run", icon: "trophy" },
  { id: "streak_3", title: "3-Day Streak", subtitle: "Run 3 days in a row", icon: "flame" },
  { id: "streak_7", title: "7-Day Streak", subtitle: "Run 7 days in a row", icon: "flame" },
  { id: "streak_30", title: "30-Day Streak", subtitle: "Run 30 days in a row", icon: "flame" },
  { id: "week_warrior", title: "Week Warrior", subtitle: "Run 5 days in a week", icon: "calendar" },
  { id: "monthly_50", title: "Monthly 50K", subtitle: "Run 50 km in a month", icon: "map" },
  { id: "monthly_100", title: "Monthly 100K", subtitle: "Run 100 km in a month", icon: "map" },
  { id: "runs_10", title: "10 Runs", subtitle: "Complete 10 runs", icon: "repeat" },
  { id: "runs_50", title: "50 Runs", subtitle: "Complete 50 runs", icon: "repeat" },
  { id: "runs_100", title: "100 Runs", subtitle: "Complete 100 runs", icon: "repeat" },
];

export { ALL as ALL_ACHIEVEMENTS };

export async function loadEarned(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(EARNED_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export async function earnAchievement(id: string): Promise<void> {
  const earned = await loadEarned();
  if (!earned.includes(id)) {
    earned.push(id);
    await AsyncStorage.setItem(EARNED_KEY, JSON.stringify(earned));
  }
}

function getWeekDays(runs: RunData[]): Set<string> {
  const now = new Date();
  const day = now.getDay();
  const mon = new Date(now);
  mon.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  const weekDates = new Set<string>();
  for (let i = 0; i < 7; i++) {
    const d = new Date(mon);
    d.setDate(mon.getDate() + i);
    weekDates.add(d.toDateString());
  }
  const runDates = new Set(runs.map((r) => new Date(Number(r.id)).toDateString()));
  const intersection = new Set([...weekDates].filter((d) => runDates.has(d)));
  return intersection;
}

export async function checkAchievements(runs: RunData[]): Promise<string[]> {
  const earned = await loadEarned();
  const newly: string[] = [];
  const totalDist = runs.reduce((s, r) => s + r.distance, 0);
  const streak = calcStreak(runs);
  const weekDays = getWeekDays(runs);
  const month = new Date().getMonth();
  const monthRuns = runs.filter((r) => new Date(Number(r.id)).getMonth() === month);
  const monthDist = monthRuns.reduce((s, r) => s + r.distance, 0);
  const single = Math.max(...runs.map((r) => r.distance), 0);

  const checks: [string, boolean][] = [
    ["first_run", runs.length >= 1],
    ["5k", single >= 5],
    ["10k", single >= 10],
    ["half", single >= 21.1],
    ["marathon", single >= 42.2],
    ["streak_3", streak >= 3],
    ["streak_7", streak >= 7],
    ["streak_30", streak >= 30],
    ["week_warrior", weekDays.size >= 5],
    ["monthly_50", monthDist >= 50],
    ["monthly_100", monthDist >= 100],
    ["runs_10", runs.length >= 10],
    ["runs_50", runs.length >= 50],
    ["runs_100", runs.length >= 100],
  ];

  for (const [id, met] of checks) {
    if (met && !earned.includes(id)) {
      newly.push(id);
      await earnAchievement(id);
    }
  }

  return newly;
}
