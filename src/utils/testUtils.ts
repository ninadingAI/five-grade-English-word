import { Word, TestQuestion, TestType } from '@/types';

// 打乱数组顺序
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 生成听音选词题目
export const generateListenAndChooseQuestion = (
  targetWord: Word,
  allWords: Word[]
): TestQuestion => {
  // 从所有单词中随机选择3个作为干扰项
  const otherWords = allWords
    .filter(word => word.english !== targetWord.english)
    .slice(0, 3);
  
  // 所有选项包括正确答案
  const options = shuffleArray([
    targetWord.english,
    ...otherWords.map(word => word.english)
  ]);

  return {
    type: 'listen-and-choose',
    word: targetWord,
    options,
    correctAnswer: targetWord.english,
  };
};

// 生成图文配对题目
export const generateWordPictureMatchQuestion = (
  targetWord: Word,
  allWords: Word[]
): TestQuestion => {
  // 从所有单词中随机选择3个作为干扰项
  const otherWords = allWords
    .filter(word => word.english !== targetWord.english)
    .slice(0, 3);
  
  // 所有选项包括正确答案
  const options = shuffleArray([
    targetWord.english,
    ...otherWords.map(word => word.english)
  ]);

  return {
    type: 'word-picture-match',
    word: targetWord,
    options,
    correctAnswer: targetWord.english,
  };
};

// 生成测试题目集
export const generateTestQuestions = (
  words: Word[],
  questionCount: number = 10
): TestQuestion[] => {
  if (words.length === 0) return [];
  
  const questions: TestQuestion[] = [];
  const selectedWords = shuffleArray(words).slice(0, questionCount);
  
  selectedWords.forEach((word, index) => {
    // 确保第一题是听音选词，然后交替生成
    const questionType: TestType = index === 0 ? 'listen-and-choose' : 
                                 (index % 2 === 1 ? 'listen-and-choose' : 'word-picture-match');
    
    if (questionType === 'listen-and-choose') {
      questions.push(generateListenAndChooseQuestion(word, words));
    } else {
      questions.push(generateWordPictureMatchQuestion(word, words));
    }
  });
  
  // 不再随机打乱，保持听音选词在前面
  return questions;
};

// 计算测试得分
export const calculateTestScore = (
  questions: TestQuestion[],
  userAnswers: Record<number, string>
): {
  correct: number;
  total: number;
  percentage: number;
  wrongWords: Word[];
} => {
  let correct = 0;
  const wrongWords: Word[] = [];
  
  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    if (userAnswer === question.correctAnswer) {
      correct++;
    } else {
      wrongWords.push(question.word);
    }
  });
  
  const total = questions.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  return {
    correct,
    total,
    percentage,
    wrongWords,
  };
};

// 根据得分获得星星数
export const calculateStars = (percentage: number): number => {
  if (percentage >= 90) return 3;
  if (percentage >= 70) return 2;
  if (percentage >= 50) return 1;
  return 0;
};