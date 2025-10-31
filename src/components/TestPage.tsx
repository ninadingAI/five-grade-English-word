'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUnitById } from '@/data/words';
import { generateTestQuestions, calculateTestScore, calculateStars } from '@/utils/testUtils';
import { addStars } from '@/utils/progress';
import { TestQuestion, Unit, Module } from '@/types';
import ListenAndChoose from '@/components/ListenAndChoose';
import WordPictureMatch from '@/components/WordPictureMatch';

interface TestPageProps {
  params: { unitId: string };
}

export default function TestPage({ params }: TestPageProps) {
  const router = useRouter();
  const [unitData, setUnitData] = useState<{ module: Module; unit: Unit } | null>(null);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [testComplete, setTestComplete] = useState(false);

  useEffect(() => {
    const data = getUnitById(params.unitId);
    if (data && data.unit.words.length > 0) {
      setUnitData(data);
      // 生成测试题目（最多10道题）
      const testQuestions = generateTestQuestions(data.unit.words, Math.min(10, data.unit.words.length));
      setQuestions(testQuestions);
    }
    setIsLoading(false);
  }, [params.unitId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">生成测试题目中...</p>
        </div>
      </div>
    );
  }

  if (!unitData || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">无法生成测试</h1>
          <p className="text-gray-600 mb-6">请先完成单词学习</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const { module, unit } = unitData;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // 完成测试
      setTestComplete(true);
    } else {
      // 下一题
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowResult(false);
    }
  };

  const handleFinishTest = () => {
    const testResult = calculateTestScore(questions, userAnswers);
    const stars = calculateStars(testResult.percentage);
    
    // 保存星星到用户进度
    if (stars > 0) {
      addStars(unit.id, stars);
    }
    
    // 导航到结算页
    router.push(`/result/${unit.id}?correct=${testResult.correct}&total=${testResult.total}&stars=${stars}`);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (testComplete) {
    const testResult = calculateTestScore(questions, userAnswers);
    const stars = calculateStars(testResult.percentage);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl p-8 shadow-lg max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🎉 测试完成！</h1>
          <div className="mb-6">
            <p className="text-lg text-gray-600 mb-2">正确率</p>
            <p className="text-4xl font-bold text-blue-600">{testResult.percentage}%</p>
            <p className="text-gray-500">{testResult.correct} / {testResult.total}</p>
          </div>
          
          {/* 星星显示 */}
          <div className="mb-6">
            <p className="text-lg text-gray-600 mb-2">获得星星</p>
            <div className="flex justify-center gap-2">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    i < stars ? 'bg-yellow-400 text-yellow-600' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  ⭐
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleFinishTest}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg
                       hover:from-green-600 hover:to-blue-600 transition-all duration-200
                       transform hover:scale-105 active:scale-95 shadow-lg mb-3"
          >
            查看详细结果
          </button>
          
          <button
            onClick={handleBackToHome}
            className="w-full bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg
                       hover:bg-gray-600 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回首页
            </button>
            
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-800">{unit.name} - 测试</h1>
              <p className="text-sm text-gray-500">{module.name}</p>
            </div>

            <div className="text-sm text-gray-600">
              {currentQuestionIndex + 1} / {questions.length}
            </div>
          </div>
        </div>
      </div>

      {/* 测试区域 */}
      <div className="container mx-auto px-4 py-8">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600">
            测试进度: {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>

        {/* 题目区域 */}
        <div className="mb-8">
          {currentQuestion.type === 'listen-and-choose' ? (
            <ListenAndChoose
              question={currentQuestion}
              onAnswer={handleAnswer}
              disabled={showResult}
              selectedAnswer={userAnswers[currentQuestionIndex]}
            />
          ) : (
            <WordPictureMatch
              question={currentQuestion}
              onAnswer={handleAnswer}
              disabled={showResult}
              selectedAnswer={userAnswers[currentQuestionIndex]}
            />
          )}
        </div>

        {/* 下一题按钮 */}
        {showResult && (
          <div className="text-center">
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-3 px-8 rounded-lg
                         hover:from-blue-600 hover:to-green-600 transition-all duration-200
                         transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {isLastQuestion ? '完成测试 🎯' : '下一题 →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}