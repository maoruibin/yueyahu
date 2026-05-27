import { useState } from 'react';
import { visibleArchiveData, ArchiveItem } from '../data/archive';
import { referenceData } from '../data/references';
import { ArchiveSection } from '../components/ArchiveSection';
import { CustomAudioPlayer } from '../components/CustomAudioPlayer';
import { ReferenceSection } from '../components/ReferenceSection';
import { FeishuForm } from '../components/FeishuForm';
import { Layout } from '../components/Layout';
import { ArchiveViewer } from '../components/ArchiveViewer';

export function Home() {
  const documents = visibleArchiveData.filter(item => item.type === 'document').slice(0, 6);

  const visuals = visibleArchiveData.filter(item => ['visual', 'video'].includes(item.type)).slice(0, 6);

  const sceneries = visibleArchiveData.filter(item => item.type === 'scenery').slice(0, 6);

  const audios = visibleArchiveData.filter(item => item.type === 'audio').slice(0, 2);

  const [viewingIndex, setViewingIndex] = useState<number | null>(null);
  const [viewingList, setViewingList] = useState<ArchiveItem[]>([]);

  const handleOpenViewer = (list: ArchiveItem[], index: number) => {
    setViewingList(list);
    setViewingIndex(index);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <section className="py-24 md:py-40 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-gold)_0%,transparent_70%)] opacity-[0.08] pointer-events-none"></div>
          
          <div className="inline-block border border-gold/30 rounded-full px-4 py-1.5 mb-8 text-gold text-xs font-mono uppercase tracking-widest bg-gold/5">
            ? - {new Date().getFullYear()}
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-primary mb-8 leading-tight tracking-wide">
            时间的胶囊<br className="hidden md:block" />
            <span className="md:hidden">，</span>
            故土的记忆
          </h1>
          
          <p className="text-lg md:text-xl text-muted max-w-2xl font-light leading-relaxed mb-16">
            岁月更迭，甘肃永昌县月牙湖村（五社、六社）正经历着巨变。
            这里是一座自发建立的云端档案室，为远方游子留存一份不该被遗忘的历史厚重感。
          </p>
        </section>

        {visuals.length > 0 && (
          <ArchiveSection
            title="光影纪实"
            items={visuals}
            viewMoreLink="/archive?tab=visuals"
            onItemClick={(_, index) => handleOpenViewer(visuals, index)}
          />
        )}

        {sceneries.length > 0 && (
          <ArchiveSection
            title="乡村景色"
            items={sceneries}
            viewMoreLink="/archive?tab=sceneries"
            onItemClick={(_, index) => handleOpenViewer(sceneries, index)}
          />
        )}

        {documents.length > 0 && (
          <ArchiveSection 
            title="文献印鉴" 
            items={documents} 
            viewMoreLink="/archive?tab=documents" 
            onItemClick={(_, index) => handleOpenViewer(documents, index)}
          />
        )}

        {audios.length > 0 && (
          <section className="pt-16 pb-8 md:pt-24 md:pb-12 border-t border-subtle">
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-primary mb-12 flex items-center gap-4">
              <span className="max-w-[40px] md:max-w-[100px] h-px bg-gradient-to-r from-transparent to-current opacity-20 flex-1"></span>
              <span>乡音留声</span>
              <span className="h-px bg-gradient-to-l from-transparent to-current opacity-20 flex-1"></span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {audios.map(audio => (
                <CustomAudioPlayer key={audio.id} item={audio} />
              ))}
            </div>
          </section>
        )}

        {referenceData.length > 0 && (
          <ReferenceSection items={referenceData} />
        )}

        <FeishuForm />
      </div>
      
      <ArchiveViewer 
        items={viewingList} 
        initialIndex={viewingIndex} 
        onClose={() => setViewingIndex(null)} 
      />
    </Layout>
  );
}
