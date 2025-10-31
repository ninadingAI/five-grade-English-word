'use client';

import { useState, useEffect, useRef } from 'react';
import { TestQuestion } from '@/types';

interface ListenAndChooseProps {
  question: TestQuestion;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
  selectedAnswer?: string;
}

export default function ListenAndChoose({ 
  question, 
  onAnswer, 
  disabled = false,
  selectedAnswer 
}: ListenAndChooseProps) {
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState('');
  const [audioSupported, setAudioSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 检查音频支持
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setAudioSupported(false);
      setAudioError('您的浏览器不支持语音播放功能');
      return;
    }

    // 组件挂载时自动播放音频（延迟一下确保页面加载完成）
    const timer = setTimeout(() => {
      if (!hasPlayedAudio) {
        playAudio();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [question.word.english]);

  // 清理语音
  useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const playAudio = async () => {
    if (!('speechSynthesis' in window)) {
      setAudioError('您的浏览器不支持语音播放功能');
      setAudioSupported(false);
      return;
    }

    try {
      setIsPlaying(true);
      setAudioError('');

      // 使用新的音频播放器
      const { audioPlayer } = await import('@/utils/audioPlayer');
      
      await audioPlayer.speak(question.word.english, {
        rate: 0.6,
        volume: 1.0,
        pitch: 1.0
      });
      
      console.log(`ListenAndChoose: 成功播放单词 "${question.word.english}"`);
      setHasPlayedAudio(true);
      
    } catch (error) {
      console.error('ListenAndChoose: 音频播放失败:', error);
      setAudioError('音频播放失败，请重试');
      
      // 备用方案
      try {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(question.word.english);
        utterance.lang = 'en-US';
        utterance.rate = 0.6;
        utterance.volume = 1.0;
        
        utterance.onend = () => {
          setHasPlayedAudio(true);
          setIsPlaying(false);
        };
        
        utterance.onerror = () => {
          setAudioError('音频播放失败');
          setIsPlaying(false);
        };
        
        speechSynthesis.speak(utterance);
        
      } catch (fallbackError) {
        console.error('ListenAndChoose: 备用播放也失败:', fallbackError);
        setAudioError('音频功能暂时不可用');
      }
      
    } finally {
      setTimeout(() => {
        setIsPlaying(false);
      }, 2000);
    }
  };

  const handleOptionClick = (option: string) => {
    if (!disabled) {
      onAnswer(option);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      {/* 题目标题 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🎵 听音选词</h2>
        <p className="text-gray-600">听到单词后，选择正确的选项</p>
        {!audioSupported && (
          <p className="text-red-600 text-sm mt-2">⚠️ 语音功能不可用，请参考单词拼写</p>
        )}
      </div>

      {/* 音频播放区域 */}
      <div className="text-center mb-8">
        <div className={`rounded-xl p-8 mb-4 ${
          isPlaying ? 'bg-gradient-to-r from-green-400 to-blue-400' : 
          'bg-gradient-to-r from-purple-400 to-pink-400'
        }`}>
          <div className="text-white text-6xl mb-4">
            {isPlaying ? '🔊' : hasPlayedAudio ? '✅' : '🎵'}
          </div>
          
          {/* 显示当前播放的单词（用于调试/帮助） */}
          {!audioSupported && (
            <div className="text-white text-2xl font-bold mb-4">
              {question.word.english}
            </div>
          )}
          
          <button
            onClick={playAudio}
            disabled={isPlaying || !audioSupported}
            className={`text-white font-bold py-3 px-6 rounded-lg transition-all transform 
                       ${isPlaying || !audioSupported ? 
                         'bg-gray-500 cursor-not-allowed' : 
                         'bg-white bg-opacity-20 hover:bg-opacity-30 hover:scale-105 active:scale-95'
                       }`}
          >
            {isPlaying ? '播放中...' : 
             hasPlayedAudio ? '重新播放' : 
             audioSupported ? '播放音频' : '音频不可用'}
          </button>
          
          {/* 音频状态指示 */}
          {isPlaying && (
            <div className="mt-3">
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                <span className="text-white text-sm">正在播放...</span>
              </div>
            </div>
          )}
        </div>
        
        {/* 错误信息 */}
        {audioError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            ⚠️ {audioError}
          </div>
        )}
        
        {hasPlayedAudio && !audioError && (
          <p className="text-sm text-gray-500">你听到了什么单词？</p>
        )}
        
        {!audioSupported && (
          <p className="text-sm text-gray-500">请根据拼写猜测单词含义</p>
        )}
      </div>

      {/* 选项按钮 */}
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;
          const isWrong = selectedAnswer && selectedAnswer !== question.correctAnswer && isSelected;

          let buttonStyle = 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-gray-200';
          
          if (disabled && isSelected) {
            if (isCorrect) {
              buttonStyle = 'bg-green-500 text-white border-2 border-green-600';
            } else {
              buttonStyle = 'bg-red-500 text-white border-2 border-red-600';
            }
          } else if (disabled && isCorrect) {
            buttonStyle = 'bg-green-500 text-white border-2 border-green-600';
          } else if (!disabled && isSelected) {
            buttonStyle = 'bg-blue-500 text-white border-2 border-blue-600';
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={disabled}
              className={`p-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 active:scale-95
                         disabled:cursor-not-allowed ${buttonStyle}`}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          );
        })}
      </div>

      {/* 答案提示 */}
      {disabled && selectedAnswer && (
        <div className="mt-6 text-center">
          {selectedAnswer === question.correctAnswer ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ <strong>回答正确！</strong>
            </div>
          ) : (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              ❌ <strong>回答错误</strong><br />
              正确答案是: <strong>{question.correctAnswer}</strong>
            </div>
          )}
          <div className="mt-3 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded">
            💡 <strong>中文释义:</strong> {question.word.chinese}
            {question.word.phonetic && (
              <>
                <br />
                🔊 <strong>音标:</strong> <span className="font-mono">{question.word.phonetic}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* 帮助提示 */}
      <div className="mt-6 text-center text-xs text-gray-500">
        💡 提示：如果听不到声音，请检查浏览器音量设置或允许网站播放音频
      </div>
    </div>
  );
}