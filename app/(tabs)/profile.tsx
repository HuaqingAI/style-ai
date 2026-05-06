import { StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View } from '@/components/Themed';
import { getPreferences, savePreferences, clearAllAnalyses } from '@/services/storage';
import { UserPreferences, StylePreset } from '@/types';

const STYLE_PRESETS: { key: StylePreset; label: string }[] = [
  { key: 'casual', label: '休闲' },
  { key: 'business', label: '商务' },
  { key: 'street', label: '街头' },
  { key: 'elegant', label: '优雅' },
  { key: 'sweet', label: '甜美' },
  { key: 'cool', label: '酷飒' },
];

export default function ProfileScreen() {
  const [prefs, setPrefs] = useState<UserPreferences>({
    nickname: '',
    gender: 'unspecified',
    stylePreference: [],
  });

  useEffect(() => {
    getPreferences().then(setPrefs);
  }, []);

  const updatePrefs = async (patch: Partial<UserPreferences>) => {
    const next = { ...prefs, ...patch };
    setPrefs(next);
    await savePreferences(next);
  };

  const toggleStyle = (style: StylePreset) => {
    const list = prefs.stylePreference.includes(style)
      ? prefs.stylePreference.filter((s) => s !== style)
      : [...prefs.stylePreference, style];
    updatePrefs({ stylePreference: list });
  };

  const confirmClear = () => {
    Alert.alert('清空记录', '确定要清空所有分析记录吗？此操作不可恢复。', [
      { text: '取消', style: 'cancel' },
      { text: '清空', style: 'destructive', onPress: () => clearAllAnalyses() },
    ]);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.avatarCard}>
        <View style={styles.avatar}>
          <FontAwesome name="user" size={40} color="#fff" />
        </View>
        <Text style={styles.nickname}>{prefs.nickname || '未设置昵称'}</Text>
      </View>

      <Text style={styles.sectionTitle}>性别</Text>
      <View style={styles.row}>
        {(['female', 'male', 'unspecified'] as const).map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.chip, prefs.gender === g && styles.chipActive]}
            onPress={() => updatePrefs({ gender: g })}
          >
            <Text style={[styles.chipText, prefs.gender === g && styles.chipTextActive]}>
              {g === 'female' ? '女' : g === 'male' ? '男' : '不指定'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>风格偏好（可多选）</Text>
      <View style={styles.row}>
        {STYLE_PRESETS.map((p) => (
          <TouchableOpacity
            key={p.key}
            style={[styles.chip, prefs.stylePreference.includes(p.key) && styles.chipActive]}
            onPress={() => toggleStyle(p.key)}
          >
            <Text style={[styles.chipText, prefs.stylePreference.includes(p.key) && styles.chipTextActive]}>
              {p.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>数据管理</Text>
      <TouchableOpacity style={styles.dangerBtn} onPress={confirmClear}>
        <FontAwesome name="trash" size={14} color="#e53935" />
        <Text style={styles.dangerText}>清空所有分析记录</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Style AI · v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  avatarCard: { alignItems: 'center', marginVertical: 20, backgroundColor: 'transparent' },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nickname: { fontSize: 18, fontWeight: '600', marginTop: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#333', marginTop: 20, marginBottom: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, backgroundColor: 'transparent' },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0' },
  chipActive: { backgroundColor: '#E91E63' },
  chipText: { fontSize: 13, color: '#555' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  dangerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  dangerText: { fontSize: 14, color: '#e53935', fontWeight: '600' },
  footer: { textAlign: 'center', color: '#bbb', fontSize: 12, marginTop: 40 },
});
