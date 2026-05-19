import { useState, useEffect } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Info, Download } from 'lucide-react';
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

export function ArchiveViewer({ items = [], initialIndex = null, onClose }: { items: ArchiveItem[], initialIndex: number | null, onClose: () => void }) {
  const [itemIndex, setItemIndex] = useState<number>(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (initialIndex !== null) {
      setItemIndex(initialIndex);
      setGalleryIndex(0);
      setDirection(0);
      setShowInfo(false);
    }
  }, [initialIndex]);

  if (initialIndex === null) return null;

  const item = items[itemIndex];
  if (!item) return null;

  const isPdf = item.url.toLowerCase().split('?')[0].endsWith('.pdf');
  const isGallery = item.gallery && item.gallery.length > 0;
  const galleryImages = isGallery ? item.gallery! : [item.type === 'video' ? (item.poster || item.cover || item.url) : item.url];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    
    const nextGalleryIndex = galleryIndex + newDirection;
    
    // Within current item's gallery
    if (isGallery && nextGalleryIndex >= 0 && nextGalleryIndex < galleryImages.length) {
      setGalleryIndex(nextGalleryIndex);
    } else {
      // Switch items
      const nextItemIndex = (itemIndex + newDirection + items.length) % items.length;
      const nextItem = items[nextItemIndex];
      const nextGalleryLength = nextItem.gallery?.length || 1;
      
      setItemIndex(nextItemIndex);
      setGalleryIndex(newDirection > 0 ? 0 : nextGalleryLength - 1);
    }
  };

  const jumpTo = (index: number) => {
    setDirection(index > galleryIndex ? 1 : -1);
    setGalleryIndex(index);
  };

  const resetIndex = () => setGalleryIndex(0);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    }),
  };

  const swipeConfidenceThreshold = 500;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const currentImageUrl = isGallery ? galleryImages[galleryIndex] : 
                         (item.type === 'video' ? (item.poster || item.cover || item.url) : item.url);
  
  const currentImageName = extractImageName(currentImageUrl, item.title);
  // Only show the extracted name if it's a gallery and the name seems meaningful, 
  // or just always show it if it translates to a file name from user's upload.
  const showImageName = isGallery && currentImageName && currentImageName !== item.title;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black transition-colors font-sans overflow-hidden">
      
      {/* Header Bar - Minimized */}
      <div className="absolute top-0 inset-x-0 h-20 flex items-center justify-between px-6 md:px-12 z-[60] bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <h2 className="text-white/60 text-xs md:text-sm font-serif tracking-widest uppercase opacity-40 select-none">
            {item.title}
          </h2>
        </div>
        
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all backdrop-blur-md border ${
              showInfo ? 'bg-gold text-white border-gold' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
            }`}
            title="查看卷宗详情"
          >
            <Info size={20} strokeWidth={1.5} />
          </button>
          
          <button
            onClick={() => { resetIndex(); onClose(); }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md border border-white/10"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Info Popover Overlay */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute bottom-24 left-6 right-6 md:left-12 md:right-auto md:w-96 z-[70] bg-zinc-900/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-gold font-serif text-xl leading-tight">{item.title}</h3>
                <div className="text-white/40 text-xs font-mono mt-1">{item.date}</div>
              </div>
              <button 
                onClick={() => setShowInfo(false)}
                className="text-white/20 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-white/80 text-sm leading-relaxed font-light whitespace-pre-wrap">
                {item.description}
              </p>
            </div>

            {isGallery && item.imageNames && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-white/40 text-[10px] uppercase tracking-widest block mb-1">当前子卷</span>
                <span className="text-white text-sm font-medium">{currentImageName}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area - Maximized */}
      <div className="flex-1 relative flex items-center justify-center w-full h-full">
        
        {/* Navigation - Minimal and Functional */}
        {((isGallery && galleryImages.length > 1) || items.length > 1) && (
          <>
            <button 
              onClick={() => paginate(-1)} 
              className="absolute left-0 inset-y-0 w-16 md:w-32 z-40 flex items-center justify-center group cursor-w-resize"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-transparent group-hover:bg-white/5 text-white/0 group-hover:text-white/20 transition-all">
                <ChevronLeft size={32} strokeWidth={1} />
              </div>
            </button>
            <button 
              onClick={() => paginate(1)} 
              className="absolute right-0 inset-y-0 w-16 md:w-32 z-40 flex items-center justify-center group cursor-e-resize"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-transparent group-hover:bg-white/5 text-white/0 group-hover:text-white/20 transition-all">
                <ChevronRight size={32} strokeWidth={1} />
              </div>
            </button>
          </>
        )}

        {/* Media Container - Reduced padding significantly */}
        <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
          {isPdf ? (
            <div className="flex flex-col items-center justify-center w-full max-w-2xl bg-zinc-900/50 p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm pointer-events-auto z-30 m-6">
              {(item.cover || item.poster) && (
                <img src={item.cover || item.poster} alt={item.title} className="max-h-[40vh] object-contain mb-8 shadow-2xl rounded-sm" />
              )}
              <h3 className="text-white text-xl font-serif mb-8 text-center">{item.title}</h3>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-gold text-black font-medium rounded-full hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                <Download size={20} />
                <span>下载/查阅完整文献</span>
              </a>
            </div>
          ) : (
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={`${itemIndex}-${galleryIndex}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 35 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold || offset.x < -50) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold || offset.x > 50) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 flex justify-center items-center p-2 md:p-10 z-30"
              >
                <ProtectedMedia>
                  <img
                    src={galleryImages[galleryIndex]}
                    alt={`${item.title} - ${isGallery ? galleryIndex + 1 : '1'}`}
                    className="max-w-full max-h-[95vh] object-contain shadow-2xl rounded-sm select-none"
                    draggable={false}
                  />
                </ProtectedMedia>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Footer Area - Adaptive and Minimal */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-24 pb-4 px-6 md:px-12 z-50 flex flex-col items-center">
        
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Item Name - Bottom Center on Mobile, Left on Desktop */}
          <div className="flex-1 order-2 md:order-1 text-center md:text-left">
            <motion.div 
              key={currentImageName || item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-base md:text-xl font-medium drop-shadow-2xl"
            >
              {currentImageName || item.title}
            </motion.div>
            
            {item.type === 'video' && (
              <div className="mt-2 flex justify-center md:justify-start">
                 <a
                   href={item.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/80 text-black text-xs font-medium hover:bg-gold transition-all"
                 >
                   <span>观看外链影像</span>
                   <ExternalLink size={14} />
                 </a>
              </div>
            )}
          </div>

          {/* Thumbnails & Counter - Right side */}
          {isGallery && galleryImages.length > 1 && (
            <div className="w-full md:w-auto flex items-center justify-center md:justify-end order-1 md:order-2">
              <div className="flex gap-2 max-w-[85vw] md:max-w-md overflow-x-auto py-1.5 px-1 hide-scrollbar scroll-smooth">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => jumpTo(i)}
                    className={`relative flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded overflow-hidden transition-all duration-300 border ${
                      i === galleryIndex 
                        ? 'border-gold ring-1 ring-gold scale-110 opacity-100 z-10 shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                        : 'border-white/5 opacity-25 hover:opacity-100 grayscale hover:grayscale-0'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
                  </button>
                ))}
              </div>
              
              {/* Counter */}
              <div className="ml-4 bg-white/5 px-2.5 py-1 rounded border border-white/5 text-white/40 font-mono text-[10px] tracking-tighter flex-shrink-0">
                {galleryIndex + 1} <span className="opacity-20 font-sans mx-1">/</span> {galleryImages.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

