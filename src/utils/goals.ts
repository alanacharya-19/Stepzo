import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RunData } from "@/types";
import { loadRuns } from "./storage";

const GOALS_KEY = "@stepzo_goals";

export interface UserGoals {
  weeklyDistance: number;
  monthlyDistance: number;
}

const DEFAULTS: UserGoals = { weeklyDistance: 15, monthlyDistance: 60 };

export async function loadGoals(): Promise<UserGoals> {
  const raw = await AsyncStorage.getItem(GOALS_KEY);
  if (!raw) return DEFAULTS;
  try {
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

export async function saveGoals(goals: UserGoals): Promise<void> {
  await AsyncStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function calcWeeklyDistance(runs: RunData[]): number {
  const monday = getMonday(new Date());
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 7);
  return runs
    .filter((r) => {
      const d = new Date(Number(r.id));
      return d >= monday && d < sunday;
    })
    .reduce((s, r) => s + r.distance, 0);
}

export function calcMonthlyDistance(runs: RunData[]): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return runs
    .filter((r) => {
      const d = new Date(Number(r.id));
      return d >= start && d < end;
    })
    .reduce((s, r) => s + r.distance, 0);
}

export function calcStreak(runs: RunData[]): number {
  const dates = [
    ...new Set(
      runs.map((r) => new Date(Number(r.id)).toDateString())
    ),
  ].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  if (dates.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if streak is active (today or yesterday have runs)
  const latest = new Date(dates[0]);
  latest.setHours(0, 0, 0, 0);
  if (latest.getTime() !== today.getTime() && latest.getTime() !== yesterday.getTime()) return 0;

  let check = new Date(latest);
  for (const dStr of dates) {
    const d = new Date(dStr);
    d.setHours(0, 0, 0, 0);
    if (d.getTime() === check.getTime()) {
      streak++;
      check.setDate(check.getDate() - 1);
    } else if (d.getTime() < check.getTime()) {
      break;
    }
  }
  return streak;
}
