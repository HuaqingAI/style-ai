import { StyleSheet, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View } from '@/components/Themed';
import { CATEGORIES, AnalysisCategory } from '@/constants/Categories';
import { analyzeImage } from '@/services/ai';
import { saveAnalysis } from '@/services/storage';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<AnalysisCategory>('all');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async (source: 'camera' | 'library') => {
    try {
      const ImagePicker = await import('expo-image-picker');

      const permission =
        source === 'camera'
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert('需要权限', '请允许访问相机或相册');
        return;
      }

      const result =
        source === 'camera'
          ? await ImagePicker.launchCameraAsync({ quality: 0.8 })
          : await ImagePicker.launchImageLibraryAsync({ quality: 0.8 });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('提示', '图片选择功能需要在原生设备上使用');
    }
  };

  const handleAnalyze = async () => {
    if (!imageUri) {
      Alert.alert('提示', '请先选择或拍摄照片');
      return;
    }
    setLoading(true);
    try {
      const result = await analyzeImage(imageUri, selectedCategory);
      const id = await saveAnalysis({
        id: Date.now().toString(),
        createdAt: Date.now(),
        imageUri,
        category: selectedCategory,
        result,
      });
      router.push(`/analysis/${id}`);
    } catch (e: any) {
      Alert.alert('分析失败', e?.message ?? '请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.title}>你好，今天想分析什么？</Text>
      <Text style={styles.subtitle}>上传照片，AI 为你点评发型、穿搭、妆容、配饰</Text>

      <View style={styles.categoryRow}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.categoryChip, selectedCategory === cat.key && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(cat.key)}
          >
            <FontAwesome
              name={cat.icon as any}
              size={16}
              color={selectedCategory === cat.key ? '#fff' : '#555'}
            />
            <Text style={[styles.categoryLabel, selectedCategory === cat.key && styles.categoryLabelActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.imageCard}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <FontAwesome name="image" size={48} color="#bbb" />
            <Text style={styles.placeholderText}>还没有照片</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => pickImage('camera')}>
          <FontAwesome name="camera" size={18} color="#fff" />
          <Text style={styles.actionBtnText}>拍照</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => pickImage('library')}>
          <FontAwesome name="photo" size={18} color="#fff" />
          <Text style={styles.actionBtnText}>从相册选择</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.analyzeBtn, (!imageUri || loading) && styles.analyzeBtnDisabled]}
        onPress={handleAnalyze}
        disabled={!imageUri || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <FontAwesome name="magic" size={18} color="#fff" />
            <Text style={styles.analyzeBtnText}>开始 AI 分析</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>拍摄建议</Text>
        <Text style={styles.tipsItem}>• 光线充足，自然光最佳</Text>
        <Text style={styles.tipsItem}>• 全身照分析穿搭，近照分析妆容</Text>
        <Text style={styles.tipsItem}>• 避免逆光和强滤镜</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', marginTop: 8 },
  subtitle: { fontSize: 14, color: '#888', marginTop: 4, marginBottom: 20 },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16, backgroundColor: 'transparent' },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    gap: 6,
  },
  categoryChipActive: { backgroundColor: '#E91E63' },
  categoryLabel: { fontSize: 14, color: '#555' },
  categoryLabelActive: { color: '#fff', fontWeight: '600' },
  imageCard: {
    aspectRatio: 3 / 4,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    marginBottom: 16,
  },
  image: { width: '100%', height: '100%' },
  imagePlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  placeholderText: { color: '#bbb', fontSize: 14 },
  buttonRow: { flexDirection: 'row', gap: 12, marginBottom: 12, backgroundColor: 'transparent' },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#333',
    paddingVertical: 14,
    borderRadius: 12,
  },
  actionBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  analyzeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#E91E63',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 4,
  },
  analyzeBtnDisabled: { backgroundColor: '#ddd' },
  analyzeBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  tipsCard: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff8f0',
    borderWidth: 1,
    borderColor: '#ffe4cc',
  },
  tipsTitle: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  tipsItem: { fontSize: 13, color: '#666', marginTop: 4 },
});
