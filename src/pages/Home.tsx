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
  const documents = visibleArchiveData.filter(item => item.type === 'document').slice(0, 9);

  const visuals = visibleArchiveData.filter(item => ['visual', 'video'].includes(item.type)).slice(0, 12);

  const sceneries = visibleArchiveData.filter(item => item.type === 'scenery').slice(0, 16);

  const audios = visibleArchiveData.filter(item => item.type === 'audio').slice(0, 2);

  // Extract images for horizontal scrolling rows
  const rowImages = visibleArchiveData
    .filter(item => ['visual', 'scenery', 'document'].includes(item.type))
    .reduce<string[]>((acc, item) => {
      if (item.gallery && item.gallery.length > 0) {
        return [...acc, item.cover || item.url, ...item.gallery.slice(1, 3)];
      }
      return [...acc, item.cover || item.url];
    }, [])
    .slice(0, 45);

  // Distribute into 5 rows for horizontal scrolling with defensive repetition
  const numRows = 5;
  const rows = Array.from({ length: numRows }, (_, i) => {
    let row = rowImages.filter((_, j) => j % numRows === i);
    // Ensure each row is sufficiently populated (at least 12 items) so that one single copy 
    // of the row is wider than 2500px, avoiding any blank areas on wide viewports.
    if (row.length > 0) {
      while (row.length < 12) {
        row = [...row, ...row];
      }
    }
    return row;
  });

  const rowSpeeds = [220, 180, 260, 200, 240];

  const [viewingIndex, setViewingIndex] = useState<number | null>(null);
  const [viewingList, setViewingList] = useState<ArchiveItem[]>([]);

  const handleOpenViewer = (list: ArchiveItem[], index: number) => {
    setViewingList(list);
    setViewingIndex(index);
  };

  return (
    <Layout>
      {/* Hero - Full Width Horizontal Scrolling Photo Wall */}
      <section className="relative overflow-hidden bg-base border-b border-subtle/50">
        <style>{`
          @keyframes scrollRowRight {
            0% { transform: translateX(-33.3333%); }
            100% { transform: translateX(0); }
          }
          @keyframes scrollRowLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.3333%); }
          }
        `}</style>

        {/* Horizontal Scrolling Image Rows - Option A: Seamless Filmstrip Style */}
        <div className="absolute inset-0 flex flex-col gap-[2px] justify-center py-4 select-none pointer-events-none">
          {rows.map((row, rowIndex) => {
            const tripled = [...row, ...row, ...row];
            return (
              <div key={rowIndex} className="overflow-hidden">
                <div
                  className="flex w-max gap-[2px] whitespace-nowrap mask-edges-horizontal"
                  style={{
                    animation: `${rowIndex % 2 === 0 ? 'scrollRowRight' : 'scrollRowLeft'} ${rowSpeeds[rowIndex % 5]}s linear infinite`,
                  }}
                >
                  {tripled.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      className="h-28 w-[149px] md:h-36 md:w-[192px] lg:h-40 lg:w-[213px] aspect-[4/3] object-cover flex-shrink-0 rounded-none shadow-none blur-[2px] bg-surface/60 dark:bg-zinc-800/40"
                      draggable={false}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Theme-adaptive center vignette — misty white in light mode, dark vignette in dark mode */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--hero-vignette)' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-gold)_0%,transparent_80%)] opacity-[0.05] pointer-events-none"></div>

        {/* Floating Text — direct on photos with adaptive typography */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-12 pb-24 md:pt-20 md:pb-44 flex flex-col items-center text-center">
          <div className="inline-block border border-subtle rounded-full px-4 py-1.5 mb-8 text-gold text-xs font-mono uppercase tracking-widest bg-surface/50 backdrop-blur-sm shadow-sm">
            ? - {new Date().getFullYear()}
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-primary mb-4 leading-tight tracking-wide drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
            时间的胶囊<br className="hidden md:block" />
            <span className="md:hidden">，</span>
            故土的记忆
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-2xl font-light leading-relaxed drop-shadow-[0_1px_8px_rgba(255,255,255,0.7)] dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            岁月更迭，甘肃永昌县月牙湖村（五社、六社）正经历着巨变。
            这里是一座自发建立的云端档案室，为远方游子留存一份不该被遗忘的历史厚重感。
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
