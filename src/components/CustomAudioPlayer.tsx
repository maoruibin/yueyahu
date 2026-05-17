import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Shield } from 'lucide-react';
import { ArchiveItem } from '../data/archive';

export function CustomAudioPlayer({ item }: { item: ArchiveItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-surface border border-subtle rounded-2xl p-5 prevent-select transition-colors" onContextMenu={handleContextMenu}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-serif text-lg text-primary mb-1">{item.title}</h4>
          <p className="text-sm text-muted leading-relaxed">{item.description}</p>
        </div>
        <div className="text-xs font-mono text-gold/80 py-1 px-2 border border-gold/30 rounded-full">
          {item.date}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button 
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gold text-inverse hover:brightness-110 transition-colors shadow-sm"
        >
          {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="ml-1 fill-current" />}
        </button>
        
        <div className="flex-1 space-y-2">
          {/* Progress bar */}
          <div className="h-1 bg-surface-hover rounded-full overflow-hidden">
            <div 
              className="h-full bg-gold transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* Hidden audio element */}
          <audio 
            ref={audioRef} 
            src={item.url} 
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            /* We disable right click and native controls */
            controlsList="nodownload"
            className="hidden"
          />
          <div className="flex items-center justify-between opacity-50 text-muted">
            <Volume2 size={14} />
            <div className="flex items-center gap-1">
              <Shield size={10} />
              <span className="text-[9px] uppercase tracking-widest font-mono">Audio Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
