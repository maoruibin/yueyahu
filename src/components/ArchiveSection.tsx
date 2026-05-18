import { ArchiveItem } from '../data/archive';
import { ProtectedMedia } from './ProtectedMedia';
import { Play, ArrowRight, Images } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArchiveSectionProps {
  items: ArchiveItem[];
  title: string;
  viewMoreLink?: string;
  onItemClick?: (item: ArchiveItem) => void;
}

export function ArchiveSection({ items, title, viewMoreLink, onItemClick }: ArchiveSectionProps) {
  return (
    <section className="pt-16 pb-8 md:pt-24 md:pb-12 border-t border-subtle">
      <div className="flex justify-between items-end mb-12">
        <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-primary flex items-center gap-4 flex-1">
          <span className="max-w-[40px] md:max-w-[100px] h-px bg-gradient-to-r from-transparent to-current opacity-20 flex-1"></span>
          <span>{title}</span>
          <span className="h-px bg-gradient-to-l from-transparent to-current opacity-20 flex-1"></span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="group flex flex-col cursor-pointer"
            onClick={() => onItemClick?.(item)}
          >
            <div className="aspect-[4/3] bg-surface rounded-2xl overflow-hidden mb-6 transition-all duration-700 pointer-events-none md:pointer-events-auto relative">
               <ProtectedMedia>
                 {item.type === 'video' ? (
                   <>
                     <img src={item.poster || item.cover || item.url} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transform" draggable={false} />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-black/60 border border-gold/50 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-gold group-hover:border-transparent transition-all duration-500">
                          <Play className="text-gold group-hover:text-black fill-current ml-1 transition-colors" size={24} />
                        </div>
                     </div>
                   </>
                 ) : item.url.toLowerCase().split('?')[0].endsWith('.pdf') ? (
                   <>
                     {item.cover || item.poster ? (
                       <img 
                         src={item.cover || item.poster} 
                         alt={item.title}
                         className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transform"
                         draggable={false}
                       />
                     ) : (
                       <div className="w-full h-full flex flex-col items-center justify-center bg-surface-hover/30 border border-subtle/50 text-gold/70 font-serif gap-2 group-hover:text-gold transition-colors">
                         <span className="text-xs uppercase tracking-widest border border-gold/30 rounded px-2 py-0.5">PDF</span>
                         <span className="text-sm">文档卷宗</span>
                       </div>
                     )}
                   </>
                 ) : item.gallery && item.gallery.length > 1 ? (
                   <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5">
                     {item.gallery.slice(0, 4).map((img, i) => (
                       <img
                         key={i}
                         src={img}
                         alt={`${item.title} - ${i + 1}`}
                         className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                         draggable={false}
                       />
                     ))}
                   </div>
                 ) : (
                   <img
                     src={item.cover || item.url}
                     alt={item.title}
                     className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transform"
                     draggable={false}
                   />
                 )}
               </ProtectedMedia>
               {item.gallery && item.gallery.length > 0 && (
                 <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 pointer-events-none">
                   <Images size={12} />
                   <span>{item.gallery.length}</span>
                 </div>
               )}
            </div>
            
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif text-xl text-primary group-hover:text-gold transition-colors">{item.title}</h3>
              <span className="font-mono text-xs text-gold/80 mt-1">{item.date}</span>
            </div>
            <p className="text-muted text-sm leading-relaxed font-light line-clamp-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {viewMoreLink && (
        <div className="mt-16 text-center">
          <Link 
            to={viewMoreLink} 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-subtle bg-surface/50 text-muted hover:text-gold hover:border-gold/50 transition-all duration-300 group"
          >
            <span className="font-serif tracking-widest text-sm">查阅完整卷宗</span>
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      )}
    </section>
  );
}
