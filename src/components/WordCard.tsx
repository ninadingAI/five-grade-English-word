'use client';

import { useState } from 'react';
import { Word } from '@/types';

interface WordCardProps {
  word: Word;
  onPlayAudio?: () => void;
}

// 为不同单词提供相关的emoji图标
const getWordEmoji = (englishWord: string): string => {
  const emojiMap: Record<string, string> = {
    'met': '🤝',
    'above': '⬆️',
    'ground': '🌱',
    'those': '👆',
    'ice cream': '🍦',
    'us': '👫',
    'finish': '✅',
    'wait': '⏰',
    'hurry': '🏃',
    'dropped': '⬇️',
    'send': '📧',
    'email': '📧',
    'ran': '🏃‍♂️',
    'love': '❤️',
    'list': '📋',
    'need': '🙏',
    'first': '1️⃣',
    'can': '🥫',
    'lost': '😵',
    'bag': '👜',
    'book': '📚',
    'pen': '🖊️',
    'apple': '🍎',
    'cat': '🐱',
    'dog': '🐶',
    'house': '🏠',
    'car': '🚗',
    'water': '💧',
    'fire': '🔥',
    'tree': '🌳',
    'flower': '🌸',
    'sun': '☀️',
    'moon': '🌙',
    'star': '⭐',
    'mountain': '⛰️',
    'plant': '🌿',
    'pair': '👫',
    'shorts': '🩳',
    'matter': '❓',
    'took': '🤲',
    'wear': '👕',
    'sports': '⚽',
    'nineteen': '1️⃣9️⃣',
    'crayon': '🖍️',
    'fifteen': '1️⃣5️⃣',
    'begin': '▶️',
    'give': '🎁',
  };
  
  return emojiMap[englishWord.toLowerCase()] || '📝';
};

// 根据单词生成相关的背景图案
const getWordPattern = (englishWord: string): string => {
  const patterns = [
    '🌟✨🌟✨🌟',
    '🔴🔵🔴🔵🔴',
    '🌸🌺🌸🌺🌸',
    '🍎🍊🍎🍊🍎',
    '⭐🌙⭐🌙⭐',
    '🌈☀️🌈☀️🌈',
    '🎵🎶🎵🎶🎵',
    '💫⚡💫⚡💫'
  ];
  
  const index = englishWord.length % patterns.length;
  return patterns[index];
};

export default function WordCard({ word, onPlayAudio }: WordCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePlayAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    
    try {
      // 动态导入音频播放器
      const { audioPlayer } = await import('@/utils/audioPlayer');
      
      // 播放单词
      await audioPlayer.speak(word.english, {
        rate: 0.6,
        volume: 1.0,
        pitch: 1.0
      });
      
      console.log(`WordCard: 成功播放单词 "${word.english}"`);
      
    } catch (error) {
      console.error('WordCard: 音频播放失败:', error);
      
      // 备用方案：直接使用speechSynthesis
      try {
        if ('speechSynthesis' in window) {
          speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(word.english);
          utterance.lang = 'en-US';
          utterance.rate = 0.6;
          utterance.volume = 1.0;
          speechSynthesis.speak(utterance);
        }
      } catch (fallbackError) {
        console.error('WordCard: 备用播放也失败:', fallbackError);
      }
      
    } finally {
      // 1秒后重置播放状态
      setTimeout(() => {
        setIsPlaying(false);
      }, 1000);
    }
    
    if (onPlayAudio) {
      onPlayAudio();
    }
  };

  const wordEmoji = getWordEmoji(word.english);
  const wordPattern = getWordPattern(word.english);

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <div
        className={`relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* 卡片正面 - 英文单词 */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 
                     rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white border-4 border-white/20"
        >
          <div className="text-center p-6 w-full">
            {/* 装饰性图案 */}
            <div className="text-sm opacity-30 mb-2">{wordPattern}</div>
            
            {/* 单词emoji */}
            <div className="text-6xl mb-4">{wordEmoji}</div>
            
            {/* 英文单词 */}
            <h2 className="text-4xl font-bold mb-2 drop-shadow-lg">{word.english}</h2>
            
            {/* 音标 */}
            {word.phonetic && (
              <div className="text-xl text-blue-100 mb-2 font-mono">
                {word.phonetic}
              </div>
            )}
            
            {/* 音频播放按钮 */}
            <button
              onClick={handlePlayAudio}
              disabled={isPlaying}
              className={`bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all 
                         transform hover:scale-110 active:scale-95 mb-4 ${
                           isPlaying ? 'animate-pulse' : ''
                         }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {isPlaying ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </button>
            
            <p className="text-blue-100 text-base font-medium">🔄 点击卡片查看中文释义</p>
          </div>
        </div>

        {/* 卡片背面 - 中文释义 */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-green-400 via-green-500 to-teal-600 
                     rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white rotate-y-180 border-4 border-white/20"
        >
          <div className="text-center p-6 w-full">
            {/* 装饰性边框 */}
            <div className="text-sm opacity-30 mb-2">✨🌟✨🌟✨</div>
            
            {/* 英文单词（小字） */}
            <h3 className="text-2xl font-bold mb-2 text-green-100">{word.english}</h3>
            
            {/* 音标 */}
            {word.phonetic && (
              <div className="text-lg text-green-100 mb-2 font-mono">
                {word.phonetic}
              </div>
            )}
            
            {/* 大号emoji */}
            <div className="text-7xl mb-4">{wordEmoji}</div>
            
            {/* 中文释义 */}
            <div className="text-3xl font-bold mb-4 drop-shadow-lg bg-white/10 rounded-xl p-3">
              {word.chinese}
            </div>
            
            {/* 记忆提示 */}
            <div className="bg-white/10 rounded-lg p-3 mb-3">
              <p className="text-green-100 text-sm">💡 记忆小贴士</p>
              <p className="text-white text-xs mt-1">
                {word.english.length <= 4 ? '短而精的单词，容易记忆！' : 
                 word.english.length <= 7 ? '中等长度，多读几遍就记住了！' : 
                 '较长的单词，可以分段记忆！'}
              </p>
            </div>
            
            <p className="text-green-100 text-base font-medium">🔄 再次点击返回英文</p>
          </div>
        </div>
      </div>
    </div>
  );
}