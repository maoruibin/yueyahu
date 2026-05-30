import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { visibleArchiveData as archiveData, WallPhoto, contributors } from '../data/archive';
import { Layout } from '../components/Layout';
import { ArchiveSection } from '../components/ArchiveSection';
import { CustomAudioPlayer } from '../components/CustomAudioPlayer';
import { ArchiveViewer } from '../components/ArchiveViewer';
import { PhotoWall } from '../components/PhotoWall';
import { LayoutGrid, Images } from 'lucide-react';
// @ts-ignore
import { motion, AnimatePresence } from 'motion/react';

const TABS = [
  { id: 'all', label: '岁月全貌' },
  { id: 'visuals', label: '光影纪实' },
  { id: 'sceneries', label: '乡村景色' },
  { id: 'documents', label: '文献印鉴' },
];

type ViewMode = 'cards' | 'wall';

export function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'all';
  const initialView = searchParams.get('view') === 'wall' ? 'wall' : 'cards';
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);
  const [wallPhotoIndex, setWallPhotoIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeTab === 'sceneries') return archiveData.filter(i => i.type === 'scenery');
    if (activeTab === 'visuals') return archiveData.filter(i => ['visual', 'video'].includes(i.type));
    if (activeTab === 'documents') return archiveData.filter(i => i.type === 'document');
    if (activeTab === 'audios') return archiveData.filter(i => i.type === 'audio');

    if (activeTab === 'all') return archiveData;
    return archiveData;
  }, [activeTab]);

  const mediaItems = filteredItems.filter(i => i.type !== 'audio');
  const audioItems = filteredItems.filter(i => i.type === 'audio');

  const stats = useMemo(() => {
    const totalPhotos = mediaItems.reduce((acc, item) => {
      if (item.gallery && item.gallery.length > 0) return acc + item.gallery.length;
      return acc + 1;
    }, 0);
    return { albums: mediaItems.length, photos: totalPhotos };
  }, [mediaItems]);

  const wallPhotos = useMemo((): WallPhoto[] => {
    const photos: WallPhoto[] = [];
    for (const item of mediaItems) {
      const isPdf = item.url.toLowerCase().split('?')[0].endsWith('.pdf');
      if (isPdf) continue;

      let urls: string[];
      if (item.gallery && item.gallery.length > 0) {
        urls = item.gallery;
      } else if (item.type === 'video') {
        urls = [item.poster || item.cover || item.url];
      } else {
        urls = [item.cover || item.url];
      }

      urls.forEach((url, i) => {
        photos.push({
          url,
          albumId: item.id,
          albumTitle: item.title,
          isAlbumBoundary: i === 0,
        });
      });
    }
    return photos;
  }, [mediaItems]);

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
    setViewingIndex(null);
    setWallPhotoIndex(null);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">

        <div className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-primary mb-8">岁月画卷</h1>
          <p className="text-muted font-light max-w-2xl leading-relaxed mb-8">
            这里收录了月牙湖村五社、六社的所有数字化资料。为了保护隐私与版权，所有资料仅限在线预览。
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-mono text-gold text-lg">{stats.albums}</span>
              <span className="text-muted">个相册</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-gold text-lg">{stats.photos}</span>
              <span className="text-muted">张照片</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-gold text-lg">{contributors.length}</span>
              <span className="text-muted">位贡献者</span>
              <span className="text-muted/60 text-xs">（{contributors.map(c => c.name).join('、')}）</span>
            </div>
          </div>

          {/* Category Tabs + View Toggle */}
          <div className="flex flex-wrap gap-4 border-b border-subtle pb-4 items-center">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-serif tracking-wide transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold text-inverse font-medium'
                    : 'bg-surface text-muted hover:text-primary hover:bg-surface-hover'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <div className="flex-1" />

            <div className="flex items-center gap-1 bg-surface rounded-full p-1 border border-subtle/50">
              <button
                onClick={() => { setViewMode('cards'); setWallPhotoIndex(null); }}
                className={`p-2 rounded-full transition-all ${
                  viewMode === 'cards'
                    ? 'bg-gold text-inverse'
                    : 'text-muted hover:text-primary'
                }`}
                title="卡片视图"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => { setViewMode('wall'); setViewingIndex(null); }}
                className={`p-2 rounded-full transition-all ${
                  viewMode === 'wall'
                    ? 'bg-gold text-inverse'
                    : 'text-muted hover:text-primary'
                }`}
                title="照片墙"
              >
                <Images size={18} />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'cards' && mediaItems.length > 0 && (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-16"
            >
              <ArchiveSection
                title={TABS.find(t => t.id === activeTab)?.label || '卷宗'}
                items={mediaItems}
                onItemClick={(_, index) => setViewingIndex(index)}
              />
            </motion.div>
          )}

          {viewMode === 'wall' && wallPhotos.length > 0 && (
            <motion.div
              key="wall"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-16"
            >
              <PhotoWall
                photos={wallPhotos}
                onPhotoClick={(index) => setWallPhotoIndex(index)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {audioItems.length > 0 && (
          <div className="mb-16">
            {mediaItems.length > 0 && (
              <h2 className="font-serif text-3xl font-light text-primary mb-8 border-t border-subtle pt-12">乡音留声</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {audioItems.map(audio => (
                <CustomAudioPlayer key={audio.id} item={audio} />
              ))}
            </div>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="py-24 text-center text-muted font-serif italic">
            暂未收录相关档案。
          </div>
        )}

        <ArchiveViewer
          items={mediaItems}
          initialIndex={viewingIndex}
          wallPhotos={viewMode === 'wall' ? wallPhotos : undefined}
          initialWallPhotoIndex={wallPhotoIndex}
          onClose={() => {
            setViewingIndex(null);
            setWallPhotoIndex(null);
          }}
        />
      </div>
    </Layout>
  );
}
