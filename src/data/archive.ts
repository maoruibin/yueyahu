export interface ArchiveItem {
  id: string;
  type: 'document' | 'visual' | 'audio' | 'video';
  title: string;
  description: string;
  date: string;
  url: string;
  poster?: string;
  cover?: string;
}

const BASE_URL = 'https://s3.bitiful.net/gudong/yueyahu';

export const archiveData: ArchiveItem[] = [
  // 文献印鉴
  {
    id: 'doc-1',
    type: 'document',
    title: '老式土地证',
    description: '陈文德家的老式土地证，记录着土地改革时期分田到户的历史印记。',
    date: '1950s',
    url: `${BASE_URL}/document/老式土地证-陈文德.jpg`,
    cover: `${BASE_URL}/document/老式土地证-陈文德.jpg`,
  },
  {
    id: 'doc-2',
    type: 'document',
    title: '红山窑乡农业税及其附加分户核定表',
    description: '曾经每家每户都要缴纳的农业税，这份核定表记录着村民对国家的贡献，如今农业税已退出历史舞台。',
    date: '1990s',
    url: `${BASE_URL}/document/红山窑乡农业税及其附加分户核定表.jpg`,
    cover: `${BASE_URL}/document/红山窑乡农业税及其附加分户核定表.jpg`,
  },
  {
    id: 'doc-3',
    type: 'document',
    title: '1991年土地承包经济合同书',
    description: '侯作录家的土地承包合同书，详细记载了承包地块、面积及承包年限，是农村土地制度变迁的实物见证。',
    date: '1991',
    url: `${BASE_URL}/document/1991年土地承包经济合同书-侯作录/主页封面.jpg`,
    cover: `${BASE_URL}/document/1991年土地承包经济合同书-侯作录/主页封面.jpg`,
  },

  // 光影纪实 — 人物
  {
    id: 'vis-1',
    type: 'visual',
    title: '月牙湖村民一家',
    description: '一张珍贵的村民家人福，定格了月牙湖一家人温暖的笑容。',
    date: '1972年',
    url: `${BASE_URL}/visual/月牙湖村民一家.jpg`,
  },
  {
    id: 'vis-2',
    type: 'visual',
    title: '月牙湖的孩子们',
    description: '月牙湖的孩子们站在院子里，纯真的笑脸是最动人的风景。',
    date: '年代不详',
    url: `${BASE_URL}/visual/月牙湖的孩子们.jpg`,
  },
  {
    id: 'vis-3',
    type: 'visual',
    title: '月牙湖的孩子们（二）',
    description: '孩子们围坐在一起的合影，那些无忧无虑的时光，如今已成为远去的乡愁。',
    date: '年代不详',
    url: `${BASE_URL}/visual/月牙湖的孩子们2.png`,
  },
  {
    id: 'vis-4',
    type: 'visual',
    title: '月牙湖的孩子们（三）',
    description: '又一张孩子们的合影，月牙湖的下一代在这片土地上成长、奔跑。',
    date: '年代不详',
    url: `${BASE_URL}/visual/月牙湖的孩子们3.png`,
  },

  // 光影纪实 — 土地实拍
  {
    id: 'vis-5',
    type: 'visual',
    title: '黑山子地西输水子渠',
    description: '田成荣于2023年4月实拍，月牙湖黑山子地的西输水子渠，灌溉着世代村民的口粮田。',
    date: '2023-04-06',
    url: `${BASE_URL}/visual/月牙湖黑山子地西输水子渠-2023-04-06-田成荣.jpg`,
  },
  {
    id: 'vis-6',
    type: 'visual',
    title: '它洞子三横地埂',
    description: '田成荣于2023年4月实拍，它洞子三横地埂的田地风貌，黄土与绿意交织。',
    date: '2023-04-20',
    url: `${BASE_URL}/visual/月牙湖它洞子三横地埂-2023-04-20-田成荣.jpg`,
  },
  {
    id: 'vis-7',
    type: 'visual',
    title: '茬子地中斜梁下面犁沟',
    description: '田成荣于2023年4月实拍，茬子地中斜梁下的犁沟，是庄稼人一年辛劳的痕迹。',
    date: '2023-04-27',
    url: `${BASE_URL}/visual/月牙谷茬子地中斜梁下面犁沟-2023-04-27-田成荣.jpg`,
  },
  {
    id: 'vis-8',
    type: 'visual',
    title: '弓坡槽子地犁沟',
    description: '田成荣于2023年4月实拍，弓坡槽子地的犁沟，记录着春耕时节的土地纹理。',
    date: '2023-04-29',
    url: `${BASE_URL}/visual/月牙弓坡槽子地犁沟-2023-04-29-田成荣.jpg`,
  },
  {
    id: 'vis-9',
    type: 'visual',
    title: '北古地他洞子犁沟',
    description: '田成荣于2023年4月实拍，北古地他洞子的犁沟，泥土翻滚间是丰收的期盼。',
    date: '2023-04-20',
    url: `${BASE_URL}/visual/月牙湖北古地他洞子犁沟-2023-0420-田成荣.jpg`,
  },
];
