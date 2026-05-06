import { AnalysisCategory } from '@/types';

export interface CategoryDef {
  key: AnalysisCategory;
  label: string;
  icon: string; // FontAwesome icon name
}

export const CATEGORIES: CategoryDef[] = [
  { key: 'all', label: '全面', icon: 'star' },
  { key: 'hair', label: '发型', icon: 'scissors' },
  { key: 'outfit', label: '穿搭', icon: 'shopping-bag' },
  { key: 'makeup', label: '妆容', icon: 'paint-brush' },
  { key: 'accessory', label: '配饰', icon: 'diamond' },
];
