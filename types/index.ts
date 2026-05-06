export type AnalysisCategory = 'all' | 'hair' | 'outfit' | 'makeup' | 'accessory';

export type StylePreset = 'casual' | 'business' | 'street' | 'elegant' | 'sweet' | 'cool';

export interface AspectAnalysis {
  name: string;
  score: number;
  comment: string;
}

export interface AnalysisResult {
  overallScore: number;
  summary: string;
  aspects: AspectAnalysis[];
  suggestions: string[];
}

export interface AnalysisRecord {
  id: string;
  createdAt: number;
  imageUri: string;
  category: AnalysisCategory;
  result: AnalysisResult;
}

export interface UserPreferences {
  nickname: string;
  gender: 'female' | 'male' | 'unspecified';
  stylePreference: StylePreset[];
}
