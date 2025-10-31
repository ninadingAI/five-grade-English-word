import { Module, Unit } from '@/types';

// 五年级上册外研社三起点单词数据
export const moduleData: Module[] = [
  {
    id: 'module-1',
    name: 'Module 1',
    units: [
      {
        id: 'module-1-unit-1',
        name: 'Unit 1: Did you come back yesterday?',
        words: [
          { english: 'met', chinese: '遇见（meet的过去式）', phonetic: '/met/' },
          { english: 'above', chinese: '在...上方', phonetic: '/əˈbʌv/' },
          { english: 'ground', chinese: '地面', phonetic: '/ɡraʊnd/' },
          { english: 'those', chinese: '那些', phonetic: '/ðoʊz/' },
          { english: 'ice cream', chinese: '冰淇淋', phonetic: '/ˈaɪs kriːm/' },
          { english: 'us', chinese: '我们（宾格）', phonetic: '/ʌs/' },
          { english: 'finish', chinese: '完成，结束', phonetic: '/ˈfɪnɪʃ/' },
          { english: 'wait', chinese: '等待', phonetic: '/weɪt/' },
          { english: 'hurry', chinese: '赶紧，匆忙', phonetic: '/ˈhɜːri/' },
          { english: 'hurry up', chinese: '赶快', phonetic: '/ˈhɜːri ʌp/' },
          { english: 'dropped', chinese: '掉落（drop的过去式）', phonetic: '/drɑːpt/' },
          { english: 'send', chinese: '发送', phonetic: '/send/' },
          { english: 'email', chinese: '电子邮件', phonetic: '/ˈiːmeɪl/' },
          { english: 'ran', chinese: '跑（run的过去式）', phonetic: '/ræn/' },
          { english: 'love', chinese: '爱', phonetic: '/lʌv/' },
        ],
      },
      {
        id: 'module-1-unit-2',
        name: 'Unit 2: We bought ice creams.',
        words: [], // 根据需求文档，这个单元没有单词列表
      },
    ],
  },
  {
    id: 'module-2',
    name: 'Module 2',
    units: [
      {
        id: 'module-2-unit-1',
        name: 'Unit 1: What did you buy?',
        words: [
          { english: 'list', chinese: '清单，列表', phonetic: '/lɪst/' },
          { english: 'er', chinese: '呃，嗯', phonetic: '/ɜr/' },
          { english: 'need', chinese: '需要', phonetic: '/niːd/' },
          { english: 'first', chinese: '首先，第一', phonetic: '/fɜrst/' },
          { english: 'can', chinese: '可以，能够', phonetic: '/kæn/' },
          { english: 'lost', chinese: '丢失的', phonetic: '/lɑːst/' },
        ],
      },
      {
        id: 'module-2-unit-2',
        name: 'Unit 2: How much cheese did you buy?',
        words: [
          { english: 'how much', chinese: '多少（不可数）', phonetic: '/haʊ mʌtʃ/' },
          { english: 'cheese', chinese: '奶酪', phonetic: '/tʃiːz/' },
          { english: 'any', chinese: '一些，任何', phonetic: '/ˈeni/' },
          { english: 'use', chinese: '使用', phonetic: '/juːz/' },
          { english: 'over there', chinese: '在那边', phonetic: '/ˈoʊvər ðeər/' },
          { english: 'bottle', chinese: '瓶子', phonetic: '/ˈbɑːtəl/' },
          { english: 'half', chinese: '一半', phonetic: '/hæf/' },
          { english: 'kilo', chinese: '千克，公斤', phonetic: '/ˈkiːloʊ/' },
          { english: 'a lot of', chinese: '许多', phonetic: '/ə lɑːt ʌv/' },
        ],
      },
    ],
  },
  {
    id: 'module-3',
    name: 'Module 3',
    units: [
      {
        id: 'module-3-unit-1',
        name: 'Unit 1: Where did you go?',
        words: [
          { english: 'weekend', chinese: '周末', phonetic: '/ˈwiːkend/' },
          { english: 'place', chinese: '地方，地点', phonetic: '/pleɪs/' },
          { english: 'British', chinese: '英国的', phonetic: '/ˈbrɪtɪʃ/' },
          { english: 'museum', chinese: '博物馆', phonetic: '/mjuˈziːəm/' },
          { english: 'how', chinese: '如何，怎样', phonetic: '/haʊ/' },
          { english: 'best', chinese: '最好的', phonetic: '/best/' },
        ],
      },
      {
        id: 'module-3-unit-2',
        name: 'Unit 2: Daming took a photo of his father.',
        words: [
          { english: 'took', chinese: '拍摄（take的过去式）', phonetic: '/tʊk/' },
          { english: 'trip', chinese: '旅行', phonetic: '/trɪp/' },
          { english: 'along', chinese: '沿着', phonetic: '/əˈlɔːŋ/' },
          { english: 'river', chinese: '河流', phonetic: '/ˈrɪvər/' },
          { english: 'hour', chinese: '小时', phonetic: '/ˈaʊər/' },
          { english: 'twenty', chinese: '二十', phonetic: '/ˈtwenti/' },
          { english: 'minute', chinese: '分钟', phonetic: '/ˈmɪnɪt/' },
          { english: 'of', chinese: '...的', phonetic: '/ʌv/' },
          { english: 'wall', chinese: '墙，城墙', phonetic: '/wɔːl/' },
          { english: 'arrive', chinese: '到达', phonetic: '/əˈraɪv/' },
          { english: 'for', chinese: '为了', phonetic: '/fɔr/' },
          { english: 'mountain', chinese: '山', phonetic: '/ˈmaʊntən/' },
          { english: 'with', chinese: '和...一起', phonetic: '/wɪð/' },
          { english: 'plant', chinese: '植物', phonetic: '/plænt/' },
        ],
      },
    ],
  },
  {
    id: 'module-4',
    name: 'Module 4',
    units: [
      {
        id: 'module-4-unit-1',
        name: 'Unit 1: Mum bought a new T-shirt for me.',
        words: [
          { english: 'pair', chinese: '双，对', phonetic: '/peər/' },
          { english: 'shorts', chinese: '短裤', phonetic: '/ʃɔːrts/' },
          { english: 'argue', chinese: '争论', phonetic: '/ˈɑːrɡjuː/' },
        ],
      },
      {
        id: 'module-4-unit-2',
        name: 'Unit 2: What\'s the matter with Daming?',
        words: [
          { english: 'matter', chinese: '事情，麻烦', phonetic: '/ˈmætər/' },
          { english: 'took', chinese: '拿走（take的过去式）', phonetic: '/tʊk/' },
          { english: 'wear', chinese: '穿，戴', phonetic: '/weər/' },
          { english: 'That\'s OK.', chinese: '没关系。', phonetic: '/ðæts oʊ ˈkeɪ/' },
          { english: 'sports', chinese: '运动', phonetic: '/spɔːrts/' },
          { english: 'hey', chinese: '嘿', phonetic: '/heɪ/' },
        ],
      },
    ],
  },
  {
    id: 'module-5',
    name: 'Module 5',
    units: [
      {
        id: 'module-5-unit-1',
        name: 'Unit 1: There are only nineteen crayons.',
        words: [
          { english: 'nineteen', chinese: '十九', phonetic: '/ˌnaɪnˈtiːn/' },
          { english: 'crayon', chinese: '蜡笔', phonetic: '/ˈkreɪən/' },
          { english: 'fifteen', chinese: '十五', phonetic: '/ˌfɪfˈtiːn/' },
          { english: 'begin', chinese: '开始', phonetic: '/bɪˈɡɪn/' },
          { english: 'give', chinese: '给', phonetic: '/ɡɪv/' },
          { english: 'give out', chinese: '分发', phonetic: '/ɡɪv aʊt/' },
          { english: 'all right', chinese: '好的', phonetic: '/ˌɔːl ˈraɪt/' },
          { english: 'thirteen', chinese: '十三', phonetic: '/ˌθɜrˈtiːn/' },
          { english: 'fourteen', chinese: '十四', phonetic: '/ˌfɔːrˈtiːn/' },
          { english: 'sixteen', chinese: '十六', phonetic: '/ˌsɪkˈstiːn/' },
          { english: 'seventeen', chinese: '十七', phonetic: '/ˌsevənˈtiːn/' },
          { english: 'eighteen', chinese: '十八', phonetic: '/ˌeɪˈtiːn/' },
          { english: 'floor', chinese: '地板', phonetic: '/flɔːr/' },
        ],
      },
      {
        id: 'module-5-unit-2',
        name: 'Unit 2: There are forty.',
        words: [
          { english: 'forty', chinese: '四十', phonetic: '/ˈfɔːrti/' },
          { english: 'number', chinese: '数字', phonetic: '/ˈnʌmbər/' },
          { english: 'thirty', chinese: '三十', phonetic: '/ˈθɜrti/' },
          { english: 'fifty', chinese: '五十', phonetic: '/ˈfɪfti/' },
          { english: 'sixty', chinese: '六十', phonetic: '/ˈsɪksti/' },
          { english: 'seventy', chinese: '七十', phonetic: '/ˈsevənti/' },
          { english: 'eighty', chinese: '八十', phonetic: '/ˈeɪti/' },
          { english: 'ninety', chinese: '九十', phonetic: '/ˈnaɪnti/' },
          { english: 'happily', chinese: '快乐地', phonetic: '/ˈhæpili/' },
          { english: 'many', chinese: '许多', phonetic: '/ˈmeni/' },
        ],
      },
    ],
  },
  {
    id: 'module-6',
    name: 'Module 6',
    units: [
      {
        id: 'module-6-unit-1',
        name: 'Unit 1: You can play football well.',
        words: [
          { english: 'well', chinese: '好地', phonetic: '/wel/' },
          { english: 'team', chinese: '队伍', phonetic: '/tiːm/' },
          { english: 'really', chinese: '真地', phonetic: '/ˈrɪli/' },
          { english: 'good at', chinese: '擅长', phonetic: '/ɡʊd æt/' },
          { english: 'catch', chinese: '接住', phonetic: '/kætʃ/' },
          { english: 'goalkeeper', chinese: '守门员', phonetic: '/ˈɡoʊlˌkiːpər/' },
          { english: 'think', chinese: '想，认为', phonetic: '/θɪŋk/' },
          { english: 'fantastic', chinese: '极好的', phonetic: '/fænˈtæstɪk/' },
          { english: 'fan', chinese: '迷，扇子', phonetic: '/fæn/' },
        ],
      },
      {
        id: 'module-6-unit-2',
        name: 'Unit 2: He ran very fast.',
        words: [
          { english: 'past', chinese: '过去', phonetic: '/pæst/' },
          { english: 'swam', chinese: '游泳（swim的过去式）', phonetic: '/swæm/' },
          { english: 'slow', chinese: '慢的', phonetic: '/sloʊ/' },
          { english: 'healthy', chinese: '健康的', phonetic: '/ˈhelθi/' },
        ],
      },
    ],
  },
  {
    id: 'module-7',
    name: 'Module 7',
    units: [
      {
        id: 'module-7-unit-1',
        name: 'Unit 1: He can\'t see.',
        words: [
          { english: 'a lot', chinese: '很多' },
          { english: 'useful', chinese: '有用的' },
          { english: 'show', chinese: '表演，显示' },
          { english: 'presenter', chinese: '主持人' },
          { english: 'blind', chinese: '失明的' },
          { english: 'deaf', chinese: '失聪的' },
          { english: 'hear', chinese: '听到' },
          { english: 'her', chinese: '她的' },
          { english: 'fire', chinese: '火灾' },
          { english: 'firefighter', chinese: '消防员' },
          { english: 'hot dog', chinese: '热狗' },
          { english: 'sausage', chinese: '香肠' },
        ],
      },
      {
        id: 'module-7-unit-2',
        name: 'Unit 2: This little girl can\'t walk.',
        words: [
          { english: 'kind', chinese: '善良的，友好的' },
        ],
      },
    ],
  },
  {
    id: 'module-8',
    name: 'Module 8',
    units: [
      {
        id: 'module-8-unit-1',
        name: 'Unit 1: What time does your school start?',
        words: [
          { english: 'time', chinese: '时间' },
          { english: 'school', chinese: '学校' },
          { english: 'start', chinese: '开始' },
          { english: 'past', chinese: '过去，经过' },
          { english: 'late', chinese: '迟的' },
          { english: 'go to bed', chinese: '上床睡觉' },
          { english: 'exercise', chinese: '锻炼' },
          { english: 'playground', chinese: '操场' },
          { english: 'before', chinese: '在...之前' },
          { english: 'join', chinese: '加入' },
          { english: 'skipping rope', chinese: '跳绳' },
          { english: 'coffee', chinese: '咖啡' },
          { english: 'tea', chinese: '茶' },
          { english: 'always', chinese: '总是' },
          { english: 'bell', chinese: '铃' },
          { english: 'rang', chinese: '响（ring的过去式）' },
          { english: 'into', chinese: '进入' },
        ],
      },
      {
        id: 'module-8-unit-2',
        name: 'Unit 2: Yesterday I went to Sam and Amy\'s school.',
        words: [], // 根据需求文档，这个单元没有单词列表
      },
    ],
  },
  {
    id: 'module-9',
    name: 'Module 9',
    units: [
      {
        id: 'module-9-unit-1',
        name: 'Unit 1: Are you feeling bored?',
        words: [
          { english: 'feel', chinese: '感觉' },
          { english: 'bored', chinese: '无聊的' },
          { english: 'sad', chinese: '伤心的' },
          { english: 'woof', chinese: '汪汪（狗叫声）' },
          { english: 'miss', chinese: '想念' },
          { english: 'angry', chinese: '愤怒的' },
          { english: 'ill', chinese: '生病的' },
          { english: 'told', chinese: '告诉（tell的过去式）' },
          { english: 'better', chinese: '更好的' },
        ],
      },
      {
        id: 'module-9-unit-2',
        name: 'Unit 2: I feel happy.',
        words: [
          { english: 'farm', chinese: '农场' },
          { english: 'tired', chinese: '累的' },
          { english: 'won', chinese: '获胜（win的过去式）' },
          { english: 'ruler', chinese: '尺子' },
          { english: 'smell', chinese: '闻' },
        ],
      },
    ],
  },
  {
    id: 'module-10',
    name: 'Module 10',
    units: [
      {
        id: 'module-10-unit-1',
        name: 'Unit 1: He was in the kitchen.',
        words: [
          { english: 'kitchen', chinese: '厨房' },
          { english: 'toilet', chinese: '洗手间' },
          { english: 'room', chinese: '房间' },
          { english: 'living room', chinese: '客厅' },
          { english: 'hide-and-seek', chinese: '捉迷藏' },
          { english: 'now', chinese: '现在' },
          { english: 'last', chinese: '最后的' },
          { english: 'hide', chinese: '躲藏' },
          { english: 'sofa', chinese: '沙发' },
        ],
      },
      {
        id: 'module-10-unit-2',
        name: 'Unit 2: Don\'t shout, please!',
        words: [
          { english: 'shout', chinese: '喊叫' },
          { english: 'grass', chinese: '草' },
          { english: 'baby', chinese: '婴儿' },
          { english: 'dangerous', chinese: '危险的' },
        ],
      },
    ],
  },
];

// 获取所有模块
export const getAllModules = (): Module[] => {
  return moduleData;
};

// 根据ID获取模块
export const getModuleById = (moduleId: string): Module | undefined => {
  return moduleData.find(module => module.id === moduleId);
};

// 根据ID获取单元
export const getUnitById = (unitId: string): { module: Module; unit: Unit } | undefined => {
  for (const moduleItem of moduleData) {
    const unit = moduleItem.units.find(unit => unit.id === unitId);
    if (unit) {
      return { module: moduleItem, unit };
    }
  }
  return undefined;
};

// 获取所有单元（扁平化）
export const getAllUnits = (): Array<{ module: Module; unit: Unit }> => {
  const units: Array<{ module: Module; unit: Unit }> = [];
  moduleData.forEach(moduleItem => {
    moduleItem.units.forEach(unit => {
      if (unit.words.length > 0) { // 只包含有单词的单元
        units.push({ module: moduleItem, unit });
      }
    });
  });
  return units;
};