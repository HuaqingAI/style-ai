import { StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View } from '@/components/Themed';
import { getAnalysis } from '@/services/storage';
import { AnalysisRecord, AspectAnalysis } from '@/types';
import { CATEGORIES } from '@/constants/Categories';

export default function AnalysisDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [record, setRecord] = useState<AnalysisRecord | null>(null);

  useEffect(() => {
    if (id) getAnalysis(id).then(setRecord);
  }, [id]);

  if (!record) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  const categoryLabel = CATEGORIES.find((c) => c.key === record.category)?.label ?? '综合';

  return (
    <>
      <Stack.Screen options={{ title: `${categoryLabel}分析` }} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <Image source={{ uri: record.imageUri }} style={styles.image} />

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>综合评分</Text>
          <Text style={styles.scoreValue}>{record.result.overallScore}</Text>
          <Text style={styles.scoreMax}>/10</Text>
        </View>

        <Text style={styles.summary}>{record.result.summary}</Text>

        {record.result.aspects.map((aspect) => (
          <AspectCard key={aspect.name} aspect={aspect} />
        ))}

        {record.result.suggestions.length > 0 && (
          <View style={styles.suggestionsCard}>
            <Text style={styles.suggestionsTitle}>改进建议</Text>
            {record.result.suggestions.map((s, i) => (
              <View key={i} style={styles.suggestionItem}>
                <FontAwesome name="lightbulb-o" size={14} color="#ff9800" />
                <Text style={styles.suggestionText}>{s}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}

function AspectCard({ aspect }: { aspect: AspectAnalysis }) {
  return (
    <View style={styles.aspectCard}>
      <View style={styles.aspectHeader}>
        <Text style={styles.aspectName}>{aspect.name}</Text>
        <Text style={styles.aspectScore}>{aspect.score}/10</Text>
      </View>
      <View style={styles.scoreBar}>
        <View style={[styles.scoreFill, { width: `${aspect.score * 10}%` }]} />
      </View>
      <Text style={styles.aspectComment}>{aspect.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: 16, paddingBottom: 40 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', aspectRatio: 3 / 4, borderRadius: 12, marginBottom: 16 },
  scoreCard: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff0f5',
    borderRadius: 12,
    gap: 6,
    marginBottom: 16,
  },
  scoreLabel: { fontSize: 14, color: '#888', marginRight: 8 },
  scoreValue: { fontSize: 42, fontWeight: '800', color: '#E91E63' },
  scoreMax: { fontSize: 18, color: '#E91E63' },
  summary: { fontSize: 15, lineHeight: 22, color: '#444', marginBottom: 20 },
  aspectCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    marginBottom: 12,
  },
  aspectHeader: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent' },
  aspectName: { fontSize: 15, fontWeight: '700' },
  aspectScore: { fontSize: 15, fontWeight: '700', color: '#E91E63' },
  scoreBar: { height: 6, backgroundColor: '#eee', borderRadius: 3, marginTop: 8, overflow: 'hidden' },
  scoreFill: { height: '100%', backgroundColor: '#E91E63' },
  aspectComment: { fontSize: 13, lineHeight: 20, color: '#666', marginTop: 10 },
  suggestionsCard: {
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff8e1',
  },
  suggestionsTitle: { fontSize: 15, fontWeight: '700', marginBottom: 12 },
  suggestionItem: { flexDirection: 'row', gap: 10, marginBottom: 10, backgroundColor: 'transparent' },
  suggestionText: { flex: 1, fontSize: 13, lineHeight: 20, color: '#555' },
});
