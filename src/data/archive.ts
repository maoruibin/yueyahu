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

export const archiveData: ArchiveItem[] = [
  {
    id: 'doc-1',
    type: 'document',
    title: '1984年第一批土地承包合同书',
    description: '泛黄的纸页上，印着红色的手指印。这是当年六社分地时留下的珍贵契约。',
    date: '1984',
    url: 'https://images.unsplash.com/photo-1590274191636-641b632fa1d5?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'doc-2',
    type: 'document',
    title: '农业税完税通知单',
    description: '一份已经退出历史舞台的凭证，记录着曾经村民对国家的贡献。',
    date: '1998',
    url: 'https://images.unsplash.com/photo-1544813589-fc3d985d852a?q=80&w=1000&auto=format&fit=crop', 
  },
  {
    id: 'doc-3',
    type: 'document',
    title: '老村长的记事本',
    description: '满是泥土气息的字迹，记录了历年引水浇地的时间和工分。',
    date: '1975',
    url: 'https://images.unsplash.com/photo-1583508466632-48092ca82283?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'doc-4',
    type: 'document',
    title: '泛黄的村规民约',
    description: '曾经张贴在村头大树上的村规民约，规范着淳朴的乡风。',
    date: '1992',
    url: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'vis-1',
    type: 'visual',
    title: '月牙湖村的秋收',
    description: '镜头下的麦田与远处的祁连山脉交相辉映，这是刻在骨子里的原野。',
    date: '2023',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'vis-2',
    type: 'visual',
    title: '老屋与黄土墙',
    description: '土坯房逐渐被砖瓦房取代，这些残垣断壁是最后的时代印记。',
    date: '2010',
    url: 'https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'vis-3',
    type: 'visual',
    title: '全村通电纪念照',
    description: '当第一盏电灯在黑夜中亮起，乡亲们围在电杆下的笑容。',
    date: '1987',
    url: 'https://images.unsplash.com/photo-1533038590840-1cbb6e9ea86c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'vis-4',
    type: 'visual',
    title: '第一台拖拉机进村',
    description: '全村集资购买的第一台拖拉机，轰鸣声响彻了安静的五社。',
    date: '1985',
    url: 'https://images.unsplash.com/photo-1605333502805-72db8cddeee1?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'vid-1',
    type: 'video',
    title: '祁连山下的羊群',
    description: '航拍记录下的月牙湖村周边牧场，光影变幻中的羊群与宁静。',
    date: '2021',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'vid-2',
    type: 'video',
    title: '村口老榆树的四季',
    description: '延时摄影记录了五社那棵老榆树的春夏秋冬。',
    date: '2022',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1000&auto=format&fit=crop'
  }
];
