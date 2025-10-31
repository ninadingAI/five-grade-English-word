'use client';

import { useState, useEffect } from 'react';
import { getAllUnits } from '@/data/words';
import { getUserProgress } from '@/utils/progress';
import UnitCard from '@/components/UnitCard';

export default function HomePage() {
  const units = getAllUnits();
  const [totalStars, setTotalStars] = useState(0);
  const [totalLearnedWords, setTotalLearnedWords] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // 计算总星星数和已学单词数
    const userProgress = getUserProgress();
    let starsCount = 0;
    let learnedCount = 0;

    units.forEach(({ unit }) => {
      const progress = userProgress[unit.id];
      if (progress) {
        starsCount += progress.stars;
        learnedCount += progress.learnedWords.length;
      }
    });

    setTotalStars(starsCount);
    setTotalLearnedWords(learnedCount);
  }, [units]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100">
      {/* 顶部标题区域 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🎮 趣味背单词
            </h1>
            <p className="text-lg text-gray-600 mb-1">五年级上册 · 外研社三起点</p>
            <p className="text-sm text-gray-500">选择单元开始你的单词学习之旅！</p>
          </div>
        </div>
      </div>

      {/* 单元卡片网格 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map(({ module, unit }) => (
            <UnitCard
              key={unit.id}
              module={module}
              unit={unit}
            />
          ))}
        </div>

        {/* 底部统计信息 - 只在客户端显示实际数据 */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 inline-block">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 学习统计</h3>
            <div className="grid grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{units.length}</div>
                <div className="text-sm text-gray-600">个单元</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {units.reduce((total, { unit }) => total + unit.words.length, 0)}
                </div>
                <div className="text-sm text-gray-600">个单词</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {isClient ? totalLearnedWords : 0}
                </div>
                <div className="text-sm text-gray-600">已学习</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {isClient ? totalStars : 0}
                </div>
                <div className="text-sm text-gray-600">颗星星</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="text-center pb-8">
        <p className="text-gray-500 text-sm">
          💡 提示：完成每个单元的学习和测试可以获得星星奖励！
        </p>
      </div>
    </div>
  );
}