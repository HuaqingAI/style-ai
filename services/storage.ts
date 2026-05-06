import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnalysisRecord, UserPreferences } from '@/types';

const KEY_ANALYSES = 'style-ai:analyses';
const KEY_PREFERENCES = 'style-ai:preferences';

const DEFAULT_PREFS: UserPreferences = {
  nickname: '',
  gender: 'unspecified',
  stylePreference: [],
};

export async function listAnalyses(): Promise<AnalysisRecord[]> {
  const raw = await AsyncStorage.getItem(KEY_ANALYSES);
  if (!raw) return [];
  try {
    const list = JSON.parse(raw) as AnalysisRecord[];
    return list.sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export async function getAnalysis(id: string): Promise<AnalysisRecord | null> {
  const list = await listAnalyses();
  return list.find((r) => r.id === id) ?? null;
}

export async function saveAnalysis(record: AnalysisRecord): Promise<string> {
  const list = await listAnalyses();
  list.unshift(record);
  await AsyncStorage.setItem(KEY_ANALYSES, JSON.stringify(list));
  return record.id;
}

export async function clearAllAnalyses(): Promise<void> {
  await AsyncStorage.removeItem(KEY_ANALYSES);
}

export async function getPreferences(): Promise<UserPreferences> {
  const raw = await AsyncStorage.getItem(KEY_PREFERENCES);
  if (!raw) return DEFAULT_PREFS;
  try {
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export async function savePreferences(prefs: UserPreferences): Promise<void> {
  await AsyncStorage.setItem(KEY_PREFERENCES, JSON.stringify(prefs));
}
