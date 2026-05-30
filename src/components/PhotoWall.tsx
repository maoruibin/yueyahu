import { WallPhoto } from '../data/archive';
import { ProtectedMedia } from './ProtectedMedia';

interface PhotoWallProps {
  photos: WallPhoto[];
  onPhotoClick: (index: number) => void;
}

export function PhotoWall({ photos, onPhotoClick }: PhotoWallProps) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
      {photos.map((photo, index) => (
        <div
          key={`${photo.albumId}-${index}`}
          className={`break-inside-avoid group cursor-pointer relative rounded-xl overflow-hidden ${
            photo.isAlbumBoundary && index > 0 ? 'mt-8' : ''
          } mb-3`}
          onClick={() => onPhotoClick(index)}
        >
          <ProtectedMedia>
            <img
              src={photo.url}
              alt={photo.albumTitle}
              className="w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-[1.03] transform"
              draggable={false}
              loading="lazy"
            />
          </ProtectedMedia>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-gold text-xs font-serif truncate block">
              {photo.albumTitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
