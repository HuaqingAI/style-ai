import { StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View } from '@/components/Themed';
import { listAnalyses } from '@/services/storage';
import { AnalysisRecord } from '@/types';
import { CATEGORIES } from '@/constants/Categories';

export default function HistoryScreen() {
  const [records, setRecords] = useState<AnalysisRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      listAnalyses().then(setRecords);
    }, [])
  );

  if (records.length === 0) {
    return (
      <View style={styles.empty}>
        <FontAwesome name="inbox" size={64} color="#ddd" />
        <Text style={styles.emptyText}>还没有分析记录</Text>
        <Text style={styles.emptyHint}>去首页拍张照，让 AI 为你点评吧</Text>
      </View>
    );
  }

  const getCategoryLabel = (key: string) =>
    CATEGORIES.find((c) => c.key === key)?.label ?? key;

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={records}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => router.push(`/analysis/${item.id}`)}>
          <Image source={{ uri: item.imageUri }} style={styles.thumb} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{getCategoryLabel(item.category)}分析</Text>
            <Text style={styles.itemDate}>{new Date(item.createdAt).toLocaleString('zh-CN')}</Text>
            <Text style={styles.itemScore}>综合评分 {item.result.overallScore}/10</Text>
          </View>
          <FontAwesome name="chevron-right" size={14} color="#ccc" />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  listContent: { padding: 16, gap: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  thumb: { width: 64, height: 80, borderRadius: 8, backgroundColor: '#f0f0f0' },
  itemInfo: { flex: 1, gap: 4, backgroundColor: 'transparent' },
  itemTitle: { fontSize: 15, fontWeight: '600' },
  itemDate: { fontSize: 12, color: '#999' },
  itemScore: { fontSize: 13, color: '#E91E63', fontWeight: '600' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyText: { fontSize: 16, color: '#aaa', marginTop: 12 },
  emptyHint: { fontSize: 13, color: '#bbb' },
});
