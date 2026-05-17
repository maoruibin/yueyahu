import { X, ExternalLink } from 'lucide-react';
import { ArchiveItem } from '../data/archive';
import { ProtectedMedia } from './ProtectedMedia';

export function ArchiveViewer({ item, onClose }: { item: ArchiveItem | null, onClose: () => void }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-overlay p-4 md:p-12 transition-colors">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-12 w-12 h-12 flex items-center justify-center rounded-full bg-surface border border-subtle text-muted hover:text-primary hover:border-gold transition-all z-50"
      >
        <X size={24} />
      </button>

      <div className="max-w-5xl w-full flex flex-col items-center max-h-[90vh]">
        <div className="w-full relative shadow-2xl rounded-sm overflow-hidden mb-6 flex-shrink-0" style={{ maxHeight: 'calc(80vh - 120px)' }}>
          <ProtectedMedia>
            <img 
              src={item.type === 'video' ? (item.poster || item.url) : item.url} 
              alt={item.title}
              className="w-full max-h-[calc(80vh-120px)] object-contain bg-transparent pointer-events-none"
              draggable={false}
            />
          </ProtectedMedia>
        </div>
        
        <div className="text-center max-w-2xl px-4 flex-shrink-0 mt-auto">
           <h3 className="font-serif text-2xl md:text-3xl text-primary mb-3">{item.title}</h3>
           <p className="text-muted font-light leading-relaxed mb-4">{item.description}</p>
           <div className="flex items-center justify-center gap-4 mt-2">
             <span className="font-mono text-sm tracking-widest text-gold border border-gold/30 rounded-full px-4 py-1">
               {item.date}
             </span>
             {item.type === 'video' && (
               <a
                 href={item.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gold text-inverse text-sm font-medium hover:brightness-110 transition-all shadow-sm"
               >
                 <span>观看外链影像</span>
                 <ExternalLink size={14} />
               </a>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
