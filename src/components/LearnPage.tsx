'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUnitById } from '@/data/words';
import { markWordAsLearned, getUnitProgress } from '@/utils/progress';
import WordCard from '@/components/WordCard';
import { Unit, Module } from '@/types';

interface LearnPageProps {
  params: { unitId: string };
}

export default function LearnPage({ params }: LearnPageProps) {
  const router = useRouter();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [unitData, setUnitData] = useState<{ module: Module; unit: Unit } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 确保 params.unitId 存在且为字符串
    const unitId = params?.unitId;
    if (!unitId || typeof unitId !== 'string') {
      setIsLoading(false);
      return;
    }
    
    const data = getUnitById(unitId);
    if (data) {
      setUnitData(data);
    }
    setIsLoading(false);
  }, [params.unitId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  if (!unitData) {
    // 尝试所有可能的单元ID格式
    const allPossibleIds = [
      params.unitId,
      `module-1-unit-1`,
      `module-2-unit-1`, 
      `module-3-unit-1`,
      `module-4-unit-1`,
      `module-5-unit-1`
    ];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl p-8 shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">单元未找到</h1>
          <p className="text-gray-600 mb-4">URL中的单元ID: {params.unitId}</p>
          <div className="mb-4 text-left bg-gray-100 p-3 rounded text-sm">
            <p><strong>可用的单元ID:</strong></p>
            <ul className="mt-1">
              {allPossibleIds.slice(1).map(id => (
                <li key={id} className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => router.push(`/learn/${id}`)}>
                  • {id}
                </li>
              ))}
            </ul>
          </div>
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

  if (unitData.unit.words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-yellow-600 mb-4">该单元暂无单词</h1>
          <p className="text-gray-600 mb-2">单元名称: {unitData.unit.name}</p>
          <p className="text-gray-600 mb-6">模块: {unitData.module.name}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            返回首页选择其他单元
          </button>
        </div>
      </div>
    );
  }

  const { module, unit } = unitData;
  const currentWord = unit.words[currentWordIndex];
  const progress = getUnitProgress(unit.id);

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentWordIndex < unit.words.length - 1) {
      // 标记当前单词为已学习
      markWordAsLearned(unit.id, currentWord.english);
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const handleGoToTest = () => {
    // 标记最后一个单词为已学习
    markWordAsLearned(unit.id, currentWord.english);
    router.push(`/test/${unit.id}`);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handlePlayAudio = () => {
    // 使用浏览器的语音合成API播放单词
    if ('speechSynthesis' in window) {
      try {
        // 停止之前的语音
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(currentWord.english);
        utterance.lang = 'en-US';
        utterance.rate = 0.6; // 稍微慢一点，便于学习
        utterance.volume = 1.0;
        utterance.pitch = 1.0;
        
        // 添加事件监听器用于调试
        utterance.onstart = () => {
          console.log('学习页面播放单词:', currentWord.english);
        };
        
        utterance.onerror = (event) => {
          console.error('学习页面音频播放错误:', event);
        };
        
        speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('学习页面音频播放异常:', error);
      }
    } else {
      console.warn('浏览器不支持语音合成功能');
    }
  };

  const isLastWord = currentWordIndex === unit.words.length - 1;

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
              <h1 className="text-lg font-bold text-gray-800">{unit.name}</h1>
              <p className="text-sm text-gray-500">{module.name}</p>
            </div>

            <div className="text-sm text-gray-600">
              {currentWordIndex + 1} / {unit.words.length}
            </div>
          </div>
        </div>
      </div>

      {/* 学习区域 */}
      <div className="container mx-auto px-4 py-8">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-blue-400 to-green-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentWordIndex + 1) / unit.words.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600">
            学习进度: {currentWordIndex + 1} / {unit.words.length}
          </div>
        </div>

        {/* 单词卡片 */}
        <div className="flex justify-center mb-8">
          <WordCard
            word={currentWord}
            onPlayAudio={handlePlayAudio}
          />
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentWordIndex === 0}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-gray-600 transition-colors"
          >
            上一个
          </button>

          {isLastWord ? (
            <button
              onClick={handleGoToTest}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-bold
                         hover:from-green-600 hover:to-blue-600 transition-all duration-200
                         transform hover:scale-105 active:scale-95 shadow-lg"
            >
              开始测试 🎯
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold
                         hover:from-blue-600 hover:to-green-600 transition-all duration-200
                         transform hover:scale-105 active:scale-95"
            >
              下一个
            </button>
          )}
        </div>

        {/* 已学习单词列表 */}
        {progress.learnedWords.length > 0 && (
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">✅ 已学习单词</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {progress.learnedWords.map((word, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}