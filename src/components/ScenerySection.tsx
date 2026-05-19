import { MapPin, Expand, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { ArchiveViewer } from './ArchiveViewer';
import { ArchiveItem } from '../data/archive';

// Some placeholder images for rural sceneries
export const sceneryData = [
  {
    id: 'scenery-1',
    title: '麦田丰收',
    location: '月牙湖社',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'scenery-2',
    title: '旷野长风',
    location: '村北',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'scenery-3',
    title: '静谧乡间',
    location: '黑山子',
    url: 'https://images.unsplash.com/photo-1544669866-9ab5c8fc2cf3?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'scenery-4',
    title: '林影斑驳',
    location: '老榆树林',
    url: 'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=2000&auto=format&fit=crop',
  }
];

export function ScenerySection({ viewMoreLink }: { viewMoreLink?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewingItem, setViewingItem] = useState<ArchiveItem | null>(null);
  
  // Create a scroll-based horizontal translation effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24 relative overflow-visible" ref={containerRef}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="w-full">
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-primary mb-6 flex items-center gap-4">
            <span className="w-[40px] md:w-[100px] h-px bg-gradient-to-r from-transparent to-current opacity-20"></span>
            <span>乡村景色</span>
          </h2>
          <p className="text-muted text-lg font-light leading-relaxed max-w-xl pl-[60px] md:pl-[120px]">
            春夏秋冬，岁月轮转。从祁连山下的风，到沟壑间的落日，
            这片土地上每一处的风景，都是流淌在岁月里的乡愁。
          </p>
        </div>
      </div>

      <div className="relative w-full h-[50vh] min-h-[350px] md:h-[65vh] flex items-center overflow-x-clip pl-[60px] md:pl-[120px]">
         <motion.div 
           style={{ x }}
           className="flex gap-6 absolute left-0 h-full pl-[60px] md:pl-[120px] items-center"
         >
           {sceneryData.map((item, index) => (
             <button 
               key={item.id}
               onClick={() => setViewingItem({
                 id: item.id,
                 type: 'visual',
                 title: item.title,
                 date: item.location,
                 description: '',
                 url: item.url,
                 cover: item.url
               })}
               className={`relative text-left outline-none focus:ring-2 focus:ring-gold flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden group w-[65vw] sm:w-[50vw] md:w-[35vw] lg:w-[30vw] max-w-2xl transition-all duration-700 ${index % 2 !== 0 ? 'h-[75%] mt-12' : 'h-[90%]'}`}
             >
               <img 
                 src={item.url} 
                 alt={item.title}
                 className="w-full h-full object-cover filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                 draggable={false}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
               <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                 <div className="text-gold uppercase tracking-widest text-xs font-mono mb-3 flex items-center gap-2 opacity-90">
                   <MapPin size={14} />
                   <span>{item.location}</span>
                 </div>
                 <h3 className="text-white font-serif text-2xl md:text-3xl font-light tracking-wide">{item.title}</h3>
               </div>
               
               <div className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20 z-20 hover:bg-gold hover:text-black hover:border-transparent pointer-events-none">
                 <Expand size={18} />
               </div>

               <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
             </button>
           ))}
         </motion.div>
      </div>

      {viewMoreLink && (
        <div className="mt-16 md:mt-24 text-center">
          <Link 
            to={viewMoreLink} 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-subtle bg-surface/50 text-muted hover:text-gold hover:border-gold/50 transition-all duration-300 group shadow-sm hover:shadow"
          >
            <span className="font-serif tracking-widest text-sm">查看全部景色</span>
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      )}

      {viewingItem && (
        <ArchiveViewer item={viewingItem} onClose={() => setViewingItem(null)} />
      )}
    </section>
  );
}
