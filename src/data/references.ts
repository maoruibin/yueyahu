export interface ReferenceItem {
  id: string;
  title: string;
  author?: string;
  source: string;
  url: string;
  description?: string;
  type: 'article' | 'poem' | 'video';
}

export const referenceData: ReferenceItem[] = [
  {
    id: 'ref-1',
    title: '【永昌非遗】永昌民间传说',
    source: '澎湃新闻',
    url: 'https://m.thepaper.cn/baijiahao_26244301',
    description: '永昌县民间传说汇编，其中收录了与月牙湖相关的民间故事与地方传说。',
    type: 'article',
  },
  {
    id: 'ref-2',
    title: '天边月牙湖',
    author: '宋国荣',
    source: '微信公众号',
    url: 'https://mp.weixin.qq.com/s/VYfnnPBj_0DtLLqc6CHyRw',
    description: '散文作品，以细腻笔触描绘了月牙湖的自然风光与人文情怀。',
    type: 'article',
  },
  {
    id: 'ref-3',
    title: '清平乐 · 月牙湖',
    author: '宋国荣',
    source: '微信公众号',
    url: 'https://mp.weixin.qq.com/s/ORH4mGOUz0SVKOOuksNAfg',
    description: '以古典词牌形式吟咏月牙湖，词韵悠长，寄托乡思。',
    type: 'poem',
  },
  {
    id: 'ref-4',
    title: '月牙湖传奇',
    author: '宋国荣',
    source: '微信公众号',
    url: 'https://mp.weixin.qq.com/s/lo5vjL4mR4XFZ1cpUXk2fw',
    description: '长篇叙事，讲述月牙湖村的传奇故事与历史变迁。',
    type: 'article',
  },
  {
    id: 'ref-5',
    title: '徒步长城途经月牙湖',
    source: '抖音',
    url: 'https://www.douyin.com/video/7523232460559256891',
    description: '徒步爱好者沿长城行走时途经月牙湖，用镜头记录下这片土地的真实面貌。',
    type: 'video',
  },
];
