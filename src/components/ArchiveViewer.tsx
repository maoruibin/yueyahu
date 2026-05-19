import { useState, useEffect } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { ArchiveItem } from '../data/archive';
import { ProtectedMedia } from './ProtectedMedia';
// @ts-ignore
import { motion, AnimatePresence } from 'motion/react';

function extractImageName(url: string, mainTitle: string) {
  try {
    const filename = url.split('/').pop() || '';
    const decoded = decodeURIComponent(filename);
    const nameWithoutExt = decoded.replace(/\.[^/.]+$/, "");
    
    // If the name is basically the same as the main title or generic, we can choose to hide it or show it.
    // Let's just return it nicely formatted.
    // If it contains dashes, maybe we just return as is.
    return nameWithoutExt.replace(/-/g, ' ');
  } catch (e) {
    return '';
  }
}

export function ArchiveViewer({ item, onClose }: { item: ArchiveItem | null, onClose: () => void }) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setGalleryIndex(0);
    setDirection(0);
  }, [item?.id]);

  if (!item) return null;

  const isPdf = item.url.toLowerCase().split('?')[0].endsWith('.pdf');
  const isGallery = item.gallery && item.gallery.length > 0;
  const galleryImages = isGallery ? item.gallery! : [];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setGalleryIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = galleryImages.length - 1;
      if (nextIndex >= galleryImages.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const jumpTo = (index: number) => {
    setDirection(index > galleryIndex ? 1 : -1);
    setGalleryIndex(index);
  };

  const resetIndex = () => setGalleryIndex(0);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const currentImageUrl = isGallery ? galleryImages[galleryIndex] : 
                         (item.type === 'video' ? (item.poster || item.cover || item.url) : item.url);
  
  const currentImageName = extractImageName(currentImageUrl, item.title);
  // Only show the extracted name if it's a gallery and the name seems meaningful, 
  // or just always show it if it translates to a file name from user's upload.
  const showImageName = isGallery && currentImageName && currentImageName !== item.title;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-2xl transition-colors font-sans">
      
      {/* Header Bar */}
      <div className="absolute top-0 inset-x-0 h-24 flex items-center justify-between px-6 md:px-12 z-50 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="pointer-events-auto max-w-[70vw]">
          <h2 className="text-white/90 text-lg md:text-2xl font-serif tracking-wide truncate">{item.title}</h2>
          <div className="text-gold/80 text-sm font-mono mt-1 tracking-wider">{item.date}</div>
        </div>
        <button
          onClick={() => { resetIndex(); onClose(); }}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all pointer-events-auto backdrop-blur-md"
        >
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex items-center justify-center w-full h-full overflow-hidden mt-12 md:mt-0">
        
        {/* Left/Right Navigation Areas (Invisible overlay for easy clicking) */}
        {isGallery && galleryImages.length > 1 && (
          <>
            <button 
              onClick={() => paginate(-1)} 
              className="absolute left-0 inset-y-0 w-1/6 md:w-32 z-40 flex items-center justify-start px-4 md:px-8 group cursor-w-resize"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/40 text-white/0 group-hover:text-white transition-all backdrop-blur-none group-hover:backdrop-blur-md">
                <ChevronLeft size={36} strokeWidth={1} />
              </div>
            </button>
            <button 
              onClick={() => paginate(1)} 
              className="absolute right-0 inset-y-0 w-1/6 md:w-32 z-40 flex items-center justify-end px-4 md:px-8 group cursor-e-resize"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/40 text-white/0 group-hover:text-white transition-all backdrop-blur-none group-hover:backdrop-blur-md">
                <ChevronRight size={36} strokeWidth={1} />
              </div>
            </button>
          </>
        )}

        {/* Media Container */}
        <div className="w-full h-full p-4 md:p-20 relative flex items-center justify-center">
          {isPdf ? (
            <div className="flex flex-col items-center justify-center w-full max-w-2xl bg-surface/10 p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm pointer-events-auto z-30">
              {(item.cover || item.poster) && (
                <img src={item.cover || item.poster} alt={item.title} className="max-h-[50vh] object-contain mb-8 shadow-2xl rounded-sm" />
              )}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-black text-lg font-medium hover:bg-white hover:scale-105 transition-all shadow-xl"
              >
                <span>查阅完整文献 (PDF)</span>
                <ExternalLink size={24} />
              </a>
            </div>
          ) : isGallery ? (
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={galleryIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                className="absolute inset-x-8 inset-y-24 md:inset-x-24 md:inset-y-24 flex justify-center items-center pointer-events-none"
              >
                <ProtectedMedia>
                  <img
                    src={galleryImages[galleryIndex]}
                    alt={`${item.title} - ${galleryIndex + 1}`}
                    className="max-w-full max-h-full object-contain pointer-events-auto rounded-sm shadow-2xl"
                    draggable={false}
                  />
                </ProtectedMedia>
              </motion.div>
            </AnimatePresence>
          ) : (
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="absolute inset-x-8 inset-y-24 md:inset-x-24 md:inset-y-24 flex justify-center items-center pointer-events-none"
             >
              <ProtectedMedia>
                <img
                  src={item.type === 'video' ? (item.poster || item.cover || item.url) : item.url}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain pointer-events-auto shadow-2xl rounded-sm"
                  draggable={false}
                />
              </ProtectedMedia>
             </motion.div>
          )}
        </div>
      </div>

      {/* Footer Area - Adaptive layout based on gallery or single */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-24 pb-6 md:pb-8 px-6 md:px-12 z-50 pointer-events-none flex flex-col items-center">
        
        {/* Caption & Description Area */}
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6 md:gap-12 pointer-events-auto">
          
          <div className="flex-1 max-w-2xl">
            {showImageName && (
              <motion.div 
                key={currentImageName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-lg md:text-xl font-medium mb-3 flex items-center gap-3 drop-shadow-lg"
              >
                <span className="w-1 h-4 bg-gold rounded-full"></span>
                {currentImageName}
              </motion.div>
            )}
            {item.description && (
              <p className="text-white/70 text-sm md:text-base font-light leading-relaxed drop-shadow-md">
                {item.description}
              </p>
            )}
            
            {item.type === 'video' && (
               <div className="mt-4">
                 <a
                   href={item.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gold/90 text-black font-medium hover:bg-gold transition-all"
                 >
                   <span>观看外链影像</span>
                   <ExternalLink size={16} />
                 </a>
               </div>
             )}
          </div>

          {/* Thumbnails Navigation (Desktop focused, horizontal scroll mobile) */}
          {isGallery && galleryImages.length > 1 && (
            <div className="w-full md:w-auto flex flex-col items-center md:items-end flex-shrink-0">
              <div className="text-gold/80 font-mono text-sm tracking-widest mb-3">
                {galleryIndex + 1} / {galleryImages.length}
              </div>
              <div className="flex gap-2 max-w-[80vw] md:max-w-md overflow-x-auto py-2 hide-scrollbar mask-edges-horizontal">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => jumpTo(i)}
                    className={`relative flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-md overflow-hidden transition-all duration-300 ${
                      i === galleryIndex ? 'ring-2 ring-gold scale-100 opacity-100 shadow-xl' : 'opacity-40 hover:opacity-100 scale-95 hover:scale-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      
    </div>
  );
}

