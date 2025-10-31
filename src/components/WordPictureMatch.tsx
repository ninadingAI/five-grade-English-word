'use client';

import { useState } from 'react';
import { TestQuestion } from '@/types';

interface WordPictureMatchProps {
  question: TestQuestion;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
  selectedAnswer?: string;
}

export default function WordPictureMatch({ 
  question, 
  onAnswer, 
  disabled = false,
  selectedAnswer 
}: WordPictureMatchProps) {
  const [draggedWord, setDraggedWord] = useState<string | null>(null);

  const handleWordClick = (word: string) => {
    if (!disabled) {
      onAnswer(word);
    }
  };

  const handleDragStart = (word: string) => {
    if (!disabled) {
      setDraggedWord(word);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedWord && !disabled) {
      onAnswer(draggedWord);
      setDraggedWord(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      {/* 题目标题 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🖼️ 图文配对</h2>
        <p className="text-gray-600">选择或拖拽正确的单词到图片区域</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：目标图片区域 */}
        <div className="order-2 lg:order-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">图片区域</h3>
          <div
            className={`relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-8 
                       border-4 border-dashed border-gray-300 transition-all
                       ${!disabled ? 'hover:border-blue-400' : ''}
                       ${selectedAnswer ? 'border-blue-400' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* 占位图片 */}
            <div className="text-center mb-6">
              <div className="inline-block bg-white rounded-xl p-8 shadow-lg">
                <div className="text-8xl mb-4">🖼️</div>
                <div className="text-sm text-gray-500">单词配图</div>
              </div>
            </div>

            {/* 中文释义 */}
            <div className="text-center mb-4">
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg inline-block font-semibold">
                {question.word.chinese}
              </div>
            </div>

            {/* 拖放提示或选中答案 */}
            {selectedAnswer ? (
              <div className="text-center">
                <div className={`text-2xl font-bold px-6 py-3 rounded-lg ${
                  disabled && selectedAnswer === question.correctAnswer
                    ? 'bg-green-500 text-white'
                    : disabled && selectedAnswer !== question.correctAnswer
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}>
                  {selectedAnswer}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 text-sm">
                点击或拖拽单词到这里
              </div>
            )}
          </div>
        </div>

        {/* 右侧：单词选项 */}
        <div className="order-1 lg:order-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">选择单词</h3>
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.correctAnswer;

              let buttonStyle = 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-transparent';
              
              if (disabled && isCorrect) {
                buttonStyle = 'bg-green-500 text-white border-2 border-green-600';
              } else if (disabled && isSelected && !isCorrect) {
                buttonStyle = 'bg-red-500 text-white border-2 border-red-600';
              } else if (isSelected) {
                buttonStyle = 'bg-blue-500 text-white border-2 border-blue-600';
              } else if (!disabled) {
                buttonStyle = 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-transparent hover:border-blue-300';
              }

              return (
                <div
                  key={index}
                  draggable={!disabled}
                  onDragStart={() => handleDragStart(option)}
                  onClick={() => handleWordClick(option)}
                  className={`p-4 rounded-lg font-semibold text-lg text-center cursor-pointer
                             transition-all transform hover:scale-105 active:scale-95
                             ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                             ${buttonStyle}`}
                >
                  {option}
                </div>
              );
            })}
          </div>

          {/* 操作提示 */}
          {!disabled && (
            <div className="mt-4 text-center text-sm text-gray-500">
              💡 提示：你可以点击单词或将其拖拽到左侧图片区域
            </div>
          )}
        </div>
      </div>

      {/* 答案提示 */}
      {disabled && selectedAnswer && (
        <div className="mt-8 text-center">
          {selectedAnswer === question.correctAnswer ? (
            <div className="text-green-600 font-semibold text-lg">
              ✅ 配对正确！
            </div>
          ) : (
            <div className="text-red-600 font-semibold text-lg">
              ❌ 配对错误，正确答案是: {question.correctAnswer}
            </div>
          )}
          <div className="mt-2 text-gray-600">
            {question.word.english} = {question.word.chinese}
          </div>
        </div>
      )}
    </div>
  );
}