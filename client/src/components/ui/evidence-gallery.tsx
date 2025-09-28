import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from "lucide-react";

export interface EvidenceItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  type: "image" | "gif" | "video";
  thumbnail?: string;
}

interface EvidenceGalleryProps {
  items: EvidenceItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function EvidenceGallery({ 
  items, 
  columns = 3, 
  className 
}: EvidenceGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3", 
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    setSelectedIndex(prev => 
      prev === null ? null : prev === 0 ? items.length - 1 : prev - 1
    );
  }, [items.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex(prev => 
      prev === null ? null : prev === items.length - 1 ? 0 : prev + 1
    );
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          closeLightbox();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox, goToPrevious, goToNext]);

  const currentItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <>
      <div 
        className={cn(
          "grid gap-4",
          gridCols[columns],
          className
        )}
        data-testid="evidence-gallery"
      >
        {items.map((item, index) => (
          <GalleryThumbnail
            key={item.id}
            item={item}
            index={index}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          <div className="relative h-[90vh] w-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              data-testid="lightbox-close"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>

            {/* Navigation buttons */}
            {items.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                  data-testid="lightbox-previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                  data-testid="lightbox-next"
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next</span>
                </Button>
              </>
            )}

            {/* Main content */}
            {currentItem && (
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="flex-1 flex items-center justify-center w-full">
                  {currentItem.type === 'video' ? (
                    <video
                      src={currentItem.src}
                      controls
                      className="max-w-full max-h-full object-contain"
                      data-testid="lightbox-video"
                    />
                  ) : (
                    <img
                      src={currentItem.src}
                      alt={currentItem.alt}
                      className="max-w-full max-h-full object-contain"
                      data-testid="lightbox-image"
                    />
                  )}
                </div>

                {/* Caption and controls */}
                {currentItem.caption && (
                  <div className="mt-4 text-center text-white/90 max-w-2xl">
                    <p className="text-sm leading-relaxed">{currentItem.caption}</p>
                  </div>
                )}

                {/* Bottom controls */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <span className="text-white/60 text-sm">
                    {selectedIndex! + 1} of {items.length}
                  </span>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(currentItem.src, '_blank')}
                    className="text-white hover:bg-white/20"
                    data-testid="lightbox-download"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface GalleryThumbnailProps {
  item: EvidenceItem;
  index: number;
  onClick: () => void;
}

function GalleryThumbnail({ item, index, onClick }: GalleryThumbnailProps) {
  return (
    <div
      className="group relative aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer border border-border"
      onClick={onClick}
      data-testid={`gallery-thumbnail-${index}`}
    >
      <img
        src={item.thumbnail || item.src}
        alt={item.alt}
        className="w-full h-full object-cover transition-transform duration-med ease-smooth group-hover:scale-105"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-med ease-smooth flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-med ease-smooth">
          <div className="bg-white/90 rounded-full p-2">
            <ZoomIn className="h-5 w-5 text-gray-800" />
          </div>
        </div>
      </div>

      {/* Type indicator */}
      {item.type !== 'image' && (
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {item.type.toUpperCase()}
        </div>
      )}

      {/* Caption preview */}
      {item.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-white text-sm line-clamp-2 leading-tight">
            {item.caption}
          </p>
        </div>
      )}
    </div>
  );
}