'use client';

import { useState, useEffect } from 'react';
import { Unit, Module, UserProgress } from '@/types';
import { calculateProgress, getUnitProgress } from '@/utils/progress';
import { useRouter } from 'next/navigation';

interface UnitCardProps {
  module: Module;
  unit: Unit;
}

export default function UnitCard({ module, unit }: UnitCardProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [userProgress, setUserProgress] = useState<UserProgress>({ 
    unitId: unit.id,
    learnedWords: [] as string[], 
    completedTests: [] as string[], 
    stars: 0, 
    lastStudiedAt: new Date() 
  });
  const [isClient, setIsClient] = useState(false);
  
  // 只在客户端计算进度，避免 hydration 问题
  useEffect(() => {
    setIsClient(true);
    const currentProgress = calculateProgress(unit.id, unit.words.length);
    const currentUserProgress = getUnitProgress(unit.id);
    setProgress(currentProgress);
    setUserProgress(currentUserProgress);
  }, [unit.id, unit.words.length]);
  
  const handleStartLearning = () => {
    router.push(`/learn/${unit.id}`);
  };

  if (unit.words.length === 0) {
    return null; // 不显示没有单词的单元
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
      {/* 单元标题 */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{unit.name}</h3>
        <p className="text-sm text-gray-500">{module.name}</p>
      </div>

      {/* 单词数量 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">{unit.words.length}</span>
          </div>
          <span className="text-gray-600 text-sm">个单词</span>
        </div>
        
        {/* 星星显示 - 只在客户端渲染 */}
        {isClient && userProgress.stars > 0 && (
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(userProgress.stars, 3) }, (_, i) => (
              <div key={i} className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-xs">⭐</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 进度条 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">学习进度</span>
          <span className="text-sm font-semibold text-blue-600">
            {isClient ? userProgress.learnedWords.length : 0}/{unit.words.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-400 to-green-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${isClient ? progress : 0}%` }}
          ></div>
        </div>
      </div>

      {/* 开始学习按钮 */}
      <button
        onClick={handleStartLearning}
        className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-3 px-6 rounded-lg 
                   hover:from-blue-600 hover:to-green-600 transition-all duration-200 
                   transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg
                   text-lg"
      >
        {isClient ? (
          progress === 0 ? '开始学习' : progress === 100 ? '复习' : '继续学习'
        ) : (
          '开始学习'
        )}
      </button>
    </div>
  );
}