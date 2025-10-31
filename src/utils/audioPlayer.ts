// 音频播放工具类
export class AudioPlayer {
  private static instance: AudioPlayer;
  private voices: SpeechSynthesisVoice[] = [];
  private isVoicesLoaded = false;
  private preferredVoice: SpeechSynthesisVoice | null = null;

  private constructor() {
    this.initializeVoices();
  }

  public static getInstance(): AudioPlayer {
    if (!AudioPlayer.instance) {
      AudioPlayer.instance = new AudioPlayer();
    }
    return AudioPlayer.instance;
  }

  private async initializeVoices(): Promise<void> {
    return new Promise((resolve) => {
      const loadVoices = () => {
        this.voices = speechSynthesis.getVoices();
        if (this.voices.length > 0) {
          this.isVoicesLoaded = true;
          this.selectPreferredVoice();
          console.log(`AudioPlayer: 加载了 ${this.voices.length} 个语音`);
          resolve();
        }
      };

      // 立即尝试加载
      loadVoices();

      // 如果没有加载成功，监听voiceschanged事件
      if (!this.isVoicesLoaded) {
        const onVoicesChanged = () => {
          loadVoices();
          if (this.isVoicesLoaded) {
            speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
            resolve();
          }
        };
        speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);

        // 3秒后超时，即使没有语音也继续
        setTimeout(() => {
          if (!this.isVoicesLoaded) {
            speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
            console.warn('AudioPlayer: 语音加载超时，使用默认设置');
            resolve();
          }
        }, 3000);
      }
    });
  }

  private selectPreferredVoice(): void {
    if (this.voices.length === 0) return;

    // 优先选择英语语音，避免网络语音
    const englishVoices = this.voices.filter(voice => voice.lang.startsWith('en'));
    
    if (englishVoices.length > 0) {
      // 优先选择本地语音
      this.preferredVoice = englishVoices.find(voice => voice.localService) || englishVoices[0];
      console.log(`AudioPlayer: 选择语音 - ${this.preferredVoice.name} (${this.preferredVoice.lang})`);
    }
  }

  public async speak(text: string, options: {
    rate?: number;
    volume?: number;
    pitch?: number;
    lang?: string;
  } = {}): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      // 检查支持性
      if (!('speechSynthesis' in window)) {
        console.error('AudioPlayer: speechSynthesis API 不支持');
        reject(new Error('语音合成不支持'));
        return;
      }

      try {
        // 确保语音已加载
        if (!this.isVoicesLoaded) {
          await this.initializeVoices();
        }

        // 停止当前播放
        speechSynthesis.cancel();

        // 创建语音合成实例
        const utterance = new SpeechSynthesisUtterance(text);
        
        // 设置参数
        utterance.lang = options.lang || 'en-US';
        utterance.rate = options.rate || 0.6;
        utterance.volume = options.volume || 1.0;
        utterance.pitch = options.pitch || 1.0;

        // 设置语音
        if (this.preferredVoice) {
          utterance.voice = this.preferredVoice;
        }

        // 事件监听
        utterance.onstart = () => {
          console.log(`AudioPlayer: 开始播放 - "${text}"`);
        };

        utterance.onend = () => {
          console.log(`AudioPlayer: 播放完成 - "${text}"`);
          resolve(true);
        };

        utterance.onerror = (event) => {
          console.error(`AudioPlayer: 播放错误 - "${text}":`, event.error);
          reject(new Error(`播放失败: ${event.error}`));
        };

        // 开始播放
        speechSynthesis.speak(utterance);

        // 超时保护
        setTimeout(() => {
          if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            console.warn(`AudioPlayer: 播放超时 - "${text}"`);
            reject(new Error('播放超时'));
          }
        }, 10000); // 10秒超时

      } catch (error) {
        console.error('AudioPlayer: 播放异常:', error);
        reject(error);
      }
    });
  }

  public stop(): void {
    speechSynthesis.cancel();
    console.log('AudioPlayer: 停止所有播放');
  }

  public isSupported(): boolean {
    return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  public getVoicesInfo(): { total: number; english: number; preferred: string | null } {
    const englishVoices = this.voices.filter(voice => voice.lang.startsWith('en'));
    return {
      total: this.voices.length,
      english: englishVoices.length,
      preferred: this.preferredVoice ? this.preferredVoice.name : null
    };
  }

  // 测试方法
  public async test(): Promise<boolean> {
    try {
      console.log('AudioPlayer: 开始音频测试...');
      await this.speak('Audio test');
      return true;
    } catch (error) {
      console.error('AudioPlayer: 测试失败:', error);
      return false;
    }
  }
}

// 导出单例实例
export const audioPlayer = AudioPlayer.getInstance();