import { ExternalLink, BookOpen, Feather, Video } from 'lucide-react';
import { ReferenceItem } from '../data/references';

const typeIcon = {
  article: BookOpen,
  poem: Feather,
  video: Video,
};

const typeLabel = {
  article: '文章',
  poem: '诗词',
  video: '影像',
};

export function ReferenceSection({ items }: { items: ReferenceItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="pt-16 pb-8 md:pt-24 md:pb-12 border-t border-subtle">
      <div className="flex items-center gap-4 mb-12">
        <span className="max-w-[40px] md:max-w-[100px] h-px bg-gradient-to-r from-transparent to-current opacity-20 flex-1 text-primary"></span>
        <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-primary">文献资料</h2>
        <span className="h-px bg-gradient-to-l from-transparent to-current opacity-20 flex-1 text-primary"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(item => {
          const Icon = typeIcon[item.type];
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col bg-surface hover:bg-surface-hover border border-subtle hover:border-gold/30 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-gold/70 font-mono tracking-wider">
                  <Icon size={13} strokeWidth={1.5} />
                  {typeLabel[item.type]}
                </span>
                <ExternalLink size={14} className="text-muted/30 group-hover:text-gold transition-colors" strokeWidth={1.5} />
              </div>

              <h3 className="font-serif text-lg text-primary leading-snug mb-2 group-hover:text-gold transition-colors">
                {item.title}
              </h3>

              {item.description && (
                <p className="text-sm text-muted leading-relaxed font-light flex-1">
                  {item.description}
                </p>
              )}

              <div className="mt-4 pt-3 border-t border-subtle/50 flex items-center gap-2 text-xs text-muted/50">
                {item.author && (
                  <>
                    <span>{item.author}</span>
                    <span className="w-1 h-1 rounded-full bg-subtle"></span>
                  </>
                )}
                <span>{item.source}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
