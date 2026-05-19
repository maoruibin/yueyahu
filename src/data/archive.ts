export interface ArchiveItem {
  id: string;
  type: 'document' | 'visual' | 'audio' | 'video' | 'scenery';
  title: string;
  description: string;
  date: string;
  url: string;
  poster?: string;
  cover?: string;
  gallery?: string[];
}

const BASE_URL = 'https://s3.bitiful.net/gudong/yueyahu';

export const archiveData: ArchiveItem[] = [
  // 文献印鉴
  {
    id: 'doc-1',
    type: 'document',
    title: '老式土地证',
    description: '陈文德提供的老式土地证，记录着土地改革时期分田到户的历史印记。',
    date: '年代不详',
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

  // 光影纪实
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
  {
    id: 'vis-gallery-4',
    type: 'visual',
    title: '月牙湖的土地',
    description: '田成荣于2023年4月实拍月牙湖各地块，输水渠、犁沟、地埂……每寸土地都刻着庄稼人的辛劳。',
    date: '2023-04',
    url: `${BASE_URL}/visual/月牙湖黑山子地西输水子渠-2023-04-06-田成荣.jpg`,
    gallery: [
      `${BASE_URL}/visual/月牙湖黑山子地西输水子渠-2023-04-06-田成荣.jpg`,
      `${BASE_URL}/visual/月牙湖它洞子三横地埂-2023-04-20-田成荣.jpg`,
      `${BASE_URL}/visual/月牙谷茬子地中斜梁下面犁沟-2023-04-27-田成荣.jpg`,
      `${BASE_URL}/visual/月牙弓坡槽子地犁沟-2023-04-29-田成荣.jpg`,
      `${BASE_URL}/visual/月牙湖北古地他洞子犁沟-2023-0420-田成荣.jpg`,
    ],
  },
  {
    id: 'vis-gallery-1',
    type: 'visual',
    title: '冬天的月牙湖村',
    description: '2015年12月8日，冬天回老家，走遍村子拍下这些照片。土巷子、晒太阳的老人、老土墙……如今很多房子已拆，这些是最后的记忆。',
    date: '2015-12-08',
    url: `${BASE_URL}/visual/2015-12-08-村貌纪行/大家一起晒太阳.jpg`,
    gallery: [
      `${BASE_URL}/visual/2015-12-08-村貌纪行/大家一起晒太阳.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/尹叔家的小道-弹玻璃弹珠的地方.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/侯家院子.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/侯有武家院子.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/后队一个巷子.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/后队里一个巷子.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/大场中的老榆树.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/尹叔家外墙，曾经驻军时标语.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/山坡.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/杏树院子.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/村口的路.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/村里浇水时的水沟.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/村里的大路主干道.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/村里篮球场.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/柴老师院子.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/毛家道.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/沙梁头.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/沙滩边子.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/王永鹏家.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/田地.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/老古井.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/老土墙.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/赵家道.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/遥看前山坡.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/陈奶奶家.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/陈家房子.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/骑摩托的人.jpg`,
      `${BASE_URL}/visual/2015-12-08-村貌纪行/黄鸿家院子.jpg`,
    ],
  },
  {
    id: 'vis-gallery-2',
    type: 'visual',
    title: '月牙湖村的记忆',
    description: '2013年拍摄，我们的小学、去下湖吃水的牛。',
    date: '2013',
    url: `${BASE_URL}/visual/2013年/我们的小学.jpg`,
    gallery: [
      `${BASE_URL}/visual/2013年/我们的小学.jpg`,
      `${BASE_URL}/visual/2013年/去下湖吃水的牛.jpg`,
    ],
  },
  {
    id: 'vis-gallery-3',
    type: 'visual',
    title: '山顶上的月牙湖',
    description: '2012年2月16日下午，登上山顶俯瞰月牙湖村，站在天空下敬礼，脚踩石头远眺。',
    date: '2012-02-16',
    url: `${BASE_URL}/visual/2012年/山顶俯瞰月牙湖.jpg`,
    gallery: [
      `${BASE_URL}/visual/2012年/山顶俯瞰月牙湖.jpg`,
      `${BASE_URL}/visual/2012年/站在天空敬礼.jpg`,
      `${BASE_URL}/visual/2012年/站在山顶，脚踩石头.jpg`,
    ],
  },
  {
    id: 'scenery-1',
    type: 'scenery',
    title: '麦田丰收',
    date: '月牙湖社',
    description: '春夏秋冬，岁月轮转。从祁连山下的风，到沟壑间的落日。',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'scenery-2',
    type: 'scenery',
    title: '旷野长风',
    date: '村北',
    description: '春夏秋冬，岁月轮转。从祁连山下的风，到沟壑间的落日。',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'scenery-3',
    type: 'scenery',
    title: '静谧乡间',
    date: '黑山子',
    description: '春夏秋冬，岁月轮转。从祁连山下的风，到沟壑间的落日。',
    url: 'https://images.unsplash.com/photo-1544669866-9ab5c8fc2cf3?q=80&w=2000&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1544669866-9ab5c8fc2cf3?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'scenery-4',
    type: 'scenery',
    title: '林影斑驳',
    date: '老榆树林',
    description: '春夏秋冬，岁月轮转。从祁连山下的风，到沟壑间的落日。',
    url: 'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=2000&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=2000&auto=format&fit=crop',
  }
];
