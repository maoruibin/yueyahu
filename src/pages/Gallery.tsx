import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { archiveData, ArchiveItem } from '../data/archive';
import { Layout } from '../components/Layout';
import { ArchiveSection } from '../components/ArchiveSection';
import { CustomAudioPlayer } from '../components/CustomAudioPlayer';
import { ArchiveViewer } from '../components/ArchiveViewer';

const TABS = [
  { id: 'all', label: '全部卷宗' },
  { id: 'visuals', label: '光影纪实' },
  { id: 'documents', label: '文献印鉴' },
  { id: 'audios', label: '乡音留声' },
];

export function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'all';
  const [viewingItem, setViewingItem] = useState<ArchiveItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeTab === 'visuals') return archiveData.filter(i => ['visual', 'video'].includes(i.type));
    if (activeTab === 'documents') return archiveData.filter(i => i.type === 'document');
    if (activeTab === 'audios') return archiveData.filter(i => i.type === 'audio');
    return archiveData;
  }, [activeTab]);

  const mediaItems = filteredItems.filter(i => i.type !== 'audio');
  const audioItems = filteredItems.filter(i => i.type === 'audio');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        
        <div className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-primary mb-8">全宗档案库</h1>
          <p className="text-muted font-light max-w-2xl leading-relaxed mb-12">
            这里收录了月牙湖村五社、六社的所有数字化资料。为了保护隐私与版权，所有资料仅限在线预览。
          </p>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-4 border-b border-subtle pb-4">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ tab: tab.id })}
                className={`px-5 py-2.5 rounded-full text-sm font-serif tracking-wide transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gold text-inverse font-medium' 
                    : 'bg-surface text-muted hover:text-primary hover:bg-surface-hover'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {mediaItems.length > 0 && (
          <div className="mb-16">
            <ArchiveSection 
              title={TABS.find(t => t.id === activeTab)?.label || '卷宗'} 
              items={mediaItems} 
              onItemClick={(item) => setViewingItem(item)}
            />
          </div>
        )}

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
        
        <ArchiveViewer item={viewingItem} onClose={() => setViewingItem(null)} />
      </div>
    </Layout>
  );
}
