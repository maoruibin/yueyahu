import { ReactNode } from 'react';
import { Shield } from 'lucide-react';

interface ProtectedMediaProps {
  children: ReactNode;
  isAudio?: boolean;
}

export function ProtectedMedia({ children, isAudio = false }: ProtectedMediaProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div 
      className="relative group w-full h-full flex items-center justify-center prevent-select"
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
    >
      {/* Invisible overlay to block direct interaction with the image */}
      {!isAudio && (
        <div className="absolute inset-0 z-10 bg-transparent"></div>
      )}
      
      {children}
      
      {/* Subtle watermark or protection indicator */}
      {!isAudio && (
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-black/50 px-2 py-1 rounded backdrop-blur-md">
          <Shield size={12} className="text-white" />
          <span className="text-[10px] text-white font-mono uppercase tracking-wider">
            Protected
          </span>
        </div>
      )}
    </div>
  );
}
