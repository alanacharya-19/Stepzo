export interface RunPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface RunData {
  id: string;
  title: string;
  date: string;
  distance: number;
  duration: number;
  pace: number;
  coords: RunPoint[];
}
