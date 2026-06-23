// js/core/data.js
// Mock data for the Harmony Kitchen E-commerce & Recipe System
export const products = [
  {
    id: 'p_001',
    name: '深海野生三文鱼柳',
    category: 'fresh',
    price: 128.00,
    unit: '500g',
    tags: ['生鲜', '高蛋白', '挪威产'],
    description: '精选挪威冰冷海域深海三文鱼，肉质鲜美，富含Omega-3。',
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=600&q=80',
    stock: 50,
    rating: 4.8,
    sales: 1205
  },
  {
    id: 'p_002',
    name: '有机初榨橄榄油',
    category: 'grocery',
    price: 89.50,
    unit: '750ml',
    tags: ['有机', '地中海', '冷榨'],
    description: '西班牙原装进口，第一道冷榨特级初榨橄榄油。',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    stock: 200,
    rating: 4.9,
    sales: 3400
  },
  {
    id: 'p_003',
    name: '澳洲M5和牛牛排',
    category: 'meat',
    price: 258.00,
    unit: '250g',
    tags: ['原切', '冷鲜', '雪花'],
    description: '澳洲牧场直供，M5级别雪花纹理，入口即化。',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=80',
    stock: 30,
    rating: 5.0,
    sales: 890
  },
  {
    id: 'p_004',
    name: '新鲜本地采摘松茸',
    category: 'vegetable',
    price: 399.00,
    unit: '200g',
    tags: ['时令', '野生', '空运'],
    description: '香格里拉新鲜采摘，顺丰冷链直达，保持最高鲜度。',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80',
    stock: 15,
    rating: 4.7,
    sales: 420
  },
  {
    id: 'p_005',
    name: '手工意大利意面',
    category: 'grocery',
    price: 35.00,
    unit: '500g',
    tags: ['纯手工', '杜兰小麦'],
    description: '采用100%杜兰小麦，传统青铜模具挤压成型。',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    stock: 500,
    rating: 4.6,
    sales: 5600
  },
  {
    id: 'p_006',
    name: '农家散养土鸡蛋',
    category: 'fresh',
    price: 45.00,
    unit: '30枚',
    tags: ['散养', '无抗生素'],
    description: '山林散养，自然谷物喂养，蛋黄晶莹剔透。',
    image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=600&q=80',
    stock: 100,
    rating: 4.8,
    sales: 2100
  }
];

export const recipes = [
  {
    id: 'r_001',
    name: '香煎和牛配松茸',
    difficulty: 'Hard',
    time: '30min',
    ingredients: ['p_003', 'p_004', 'p_002'],
    steps: [
      '将和牛提前取出室温回温30分钟。',
      '松茸用湿厨房纸轻轻擦拭干净，切厚片。',
      '热锅冷油（橄榄油），下入和牛，每面煎制1.5分钟至Medium Rare。',
      '取出和牛静置，利用锅底牛油煎香松茸。',
      '装盘，撒上黑胡椒与海盐即可。'
    ],
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'r_002',
    name: '三文鱼奶油意面',
    difficulty: 'Medium',
    time: '20min',
    ingredients: ['p_001', 'p_005', 'p_002'],
    steps: [
      '水烧开加盐，下入意面煮8分钟。',
      '三文鱼切块，用少量盐腌制。',
      '平底锅放橄榄油，煎熟三文鱼，加入淡奶油熬制酱汁。',
      '将煮好的意面捞出放入酱汁中翻拌均匀。',
      '出锅前撒上芝士碎和欧芹。'
    ],
    image: 'https://images.unsplash.com/photo-1621510456681-2330135e5871?auto=format&fit=crop&w=800&q=80'
  }
];

export const mockDevices = [
  { id: 'dev_phone_01', name: 'HUAWEI Mate 60 Pro', type: 'phone', status: 'active', ip: '192.168.1.101' },
  { id: 'dev_pad_01', name: 'HUAWEI MatePad Pro', type: 'tablet', status: 'online', ip: '192.168.1.102' },
  { id: 'dev_tv_01', name: 'HUAWEI Vision 智慧屏 V85', type: 'tv', status: 'online', ip: '192.168.1.103' },
  { id: 'dev_watch_01', name: 'HUAWEI Watch 4', type: 'wearable', status: 'offline', ip: '192.168.1.104' }
];
