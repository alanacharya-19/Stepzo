import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RunData } from "@/types";

const RUNS_KEY = "@stepzo_runs";

export async function loadRuns(): Promise<RunData[]> {
  const raw = await AsyncStorage.getItem(RUNS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as RunData[];
  } catch {
    return [];
  }
}

export async function saveRun(run: RunData): Promise<void> {
  const runs = await loadRuns();
  runs.unshift(run);
  await AsyncStorage.setItem(RUNS_KEY, JSON.stringify(runs));
}

export async function deleteRun(id: string): Promise<void> {
  const runs = await loadRuns();
  const filtered = runs.filter((r) => r.id !== id);
  await AsyncStorage.setItem(RUNS_KEY, JSON.stringify(filtered));
}
