'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUnitById } from '@/data/words';
import { Unit, Module } from '@/types';

interface ResultPageProps {
  params: { unitId: string };
}

export default function ResultPage({ params }: ResultPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [unitData, setUnitData] = useState<{ module: Module; unit: Unit } | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // 从URL参数获取测试结果
  const correct = parseInt(searchParams.get('correct') || '0');
  const total = parseInt(searchParams.get('total') || '0');
  const stars = parseInt(searchParams.get('stars') || '0');
  
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  useEffect(() => {
    const data = getUnitById(params.unitId);
    if (data) {
      setUnitData(data);
    }
    
    // 延迟显示动画效果
    setTimeout(() => setShowAnimation(true), 500);
  }, [params.unitId]);

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleRetryTest = () => {
    router.push(`/test/${params.unitId}`);
  };

  const handleContinueLearning = () => {
    router.push(`/learn/${params.unitId}`);
  };

  if (!unitData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  const { module, unit } = unitData;

  // 根据得分决定显示内容和颜色
  const getResultConfig = () => {
    if (percentage >= 90) {
      return {
        title: '🎉 完美表现！',
        subtitle: '你的英语水平真棒！',
        bgGradient: 'from-green-400 via-blue-400 to-purple-500',
        textColor: 'text-green-600',
      };
    } else if (percentage >= 70) {
      return {
        title: '👍 表现不错！',
        subtitle: '继续加油，你会更棒的！',
        bgGradient: 'from-blue-400 via-green-400 to-teal-500',
        textColor: 'text-blue-600',
      };
    } else if (percentage >= 50) {
      return {
        title: '💪 需要加油！',
        subtitle: '多练习一下，你一定可以的！',
        bgGradient: 'from-yellow-400 via-orange-400 to-red-400',
        textColor: 'text-yellow-600',
      };
    } else {
      return {
        title: '📚 继续努力！',
        subtitle: '学习是一个过程，坚持就是胜利！',
        bgGradient: 'from-red-400 via-pink-400 to-purple-400',
        textColor: 'text-red-600',
      };
    }
  };

  const resultConfig = getResultConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100">
      {/* 顶部信息 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800">{unit.name}</h1>
            <p className="text-sm text-gray-500">{module.name} - 测试结果</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 主要结果卡片 */}
        <div className={`bg-gradient-to-br ${resultConfig.bgGradient} rounded-3xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden`}>
          {/* 装饰性背景元素 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative text-center">
            {/* 标题 */}
            <h1 className={`text-4xl font-bold mb-4 ${showAnimation ? 'animate-bounce' : ''}`}>
              {resultConfig.title}
            </h1>
            <p className="text-xl mb-8 opacity-90">{resultConfig.subtitle}</p>

            {/* 得分显示 */}
            <div className="bg-white bg-opacity-20 rounded-2xl p-6 mb-6 backdrop-blur-sm">
              <div className="text-6xl font-bold mb-2">{percentage}%</div>
              <div className="text-xl opacity-90">{correct} / {total} 题正确</div>
            </div>

            {/* 星星奖励 */}
            <div className="mb-8">
              <p className="text-xl mb-4 opacity-90">获得星星奖励</p>
              <div className="flex justify-center gap-3">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-500 transform
                      ${i < stars 
                        ? `bg-yellow-400 text-yellow-600 ${showAnimation ? 'animate-pulse scale-110' : 'scale-100'}` 
                        : 'bg-white bg-opacity-30 text-white scale-90'
                      }`}
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    ⭐
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮区域 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">接下来想做什么？</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 返回首页 */}
            <button
              onClick={handleBackToHome}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl
                         hover:from-blue-600 hover:to-blue-700 transition-all duration-200
                         transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <div className="text-2xl mb-2">🏠</div>
              <div>返回首页</div>
              <div className="text-sm opacity-80">选择其他单元</div>
            </button>

            {/* 重新测试 */}
            <button
              onClick={handleRetryTest}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl
                         hover:from-green-600 hover:to-green-700 transition-all duration-200
                         transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <div className="text-2xl mb-2">🔄</div>
              <div>重新测试</div>
              <div className="text-sm opacity-80">再来一轮挑战</div>
            </button>

            {/* 继续学习 */}
            <button
              onClick={handleContinueLearning}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl
                         hover:from-purple-600 hover:to-purple-700 transition-all duration-200
                         transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <div className="text-2xl mb-2">📚</div>
              <div>复习单词</div>
              <div className="text-sm opacity-80">巩固学习成果</div>
            </button>
          </div>
        </div>

        {/* 学习建议 */}
        {percentage < 80 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-6">
            <h3 className="text-lg font-bold text-yellow-800 mb-3">💡 学习建议</h3>
            <div className="text-yellow-700 space-y-2">
              <p>• 建议重新学习一遍单词，加深记忆</p>
              <p>• 多听几遍单词发音，提高听力识别能力</p>
              <p>• 尝试把单词运用到日常对话中</p>
              <p>• 坚持练习，熟能生巧！</p>
            </div>
          </div>
        )}

        {/* 鼓励性文字 */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            🌟 每一次学习都是进步的开始，加油！
          </p>
        </div>
      </div>
    </div>
  );
}