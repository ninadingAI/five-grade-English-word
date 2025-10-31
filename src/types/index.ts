// 单词项接口
export interface Word {
  english: string;
  chinese: string;
  phonetic?: string; // 音标（可选）
  audio?: string; // 音频文件路径（可选）
}

// 单元接口
export interface Unit {
  id: string;
  name: string;
  words: Word[];
}

// 模块接口
export interface Module {
  id: string;
  name: string;
  units: Unit[];
}

// 用户进度接口
export interface UserProgress {
  unitId: string;
  learnedWords: string[]; // 已学习的单词
  completedTests: string[]; // 已完成的测试
  stars: number; // 获得的星星数
  lastStudiedAt: Date;
}

// 测试题型
export type TestType = 'listen-and-choose' | 'word-picture-match';

// 测试问题接口
export interface TestQuestion {
  type: TestType;
  word: Word;
  options: string[]; // 选项（对于听音选词）
  correctAnswer: string;
}

// 测试结果接口
export interface TestResult {
  unitId: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongWords: Word[];
  stars: number;
  completedAt: Date;
}