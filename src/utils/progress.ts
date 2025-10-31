import { UserProgress } from '@/types';

const STORAGE_KEY = 'word-game-progress';

// 获取用户进度
export const getUserProgress = (): Record<string, UserProgress> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load user progress:', error);
    return {};
  }
};

// 保存用户进度
export const saveUserProgress = (progress: Record<string, UserProgress>): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save user progress:', error);
  }
};

// 获取单元进度
export const getUnitProgress = (unitId: string): UserProgress => {
  const allProgress = getUserProgress();
  return allProgress[unitId] || {
    unitId,
    learnedWords: [],
    completedTests: [],
    stars: 0,
    lastStudiedAt: new Date(),
  };
};

// 更新单元进度
export const updateUnitProgress = (unitId: string, updates: Partial<UserProgress>): void => {
  const allProgress = getUserProgress();
  const currentProgress = getUnitProgress(unitId);
  
  allProgress[unitId] = {
    ...currentProgress,
    ...updates,
    lastStudiedAt: new Date(),
  };
  
  saveUserProgress(allProgress);
};

// 标记单词为已学习
export const markWordAsLearned = (unitId: string, word: string): void => {
  const progress = getUnitProgress(unitId);
  if (!progress.learnedWords.includes(word)) {
    progress.learnedWords.push(word);
    updateUnitProgress(unitId, progress);
  }
};

// 添加星星奖励
export const addStars = (unitId: string, stars: number): void => {
  const progress = getUnitProgress(unitId);
  updateUnitProgress(unitId, {
    stars: progress.stars + stars,
  });
};

// 计算学习进度百分比
export const calculateProgress = (unitId: string, totalWords: number): number => {
  const progress = getUnitProgress(unitId);
  if (totalWords === 0) return 0;
  return Math.round((progress.learnedWords.length / totalWords) * 100);
};

// 重置所有进度（调试用）
export const resetAllProgress = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};