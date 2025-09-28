import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: {
    src: string;
    alt: string;
    caption?: string;
  };
  afterImage: {
    src: string;
    alt: string;
    caption?: string;
  };
  className?: string;
  initialPosition?: number; // 0-100
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  className,
  initialPosition = 50
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  }, [handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard support
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setPosition(prev => Math.max(0, prev - 5));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setPosition(prev => Math.min(100, prev + 5));
        break;
      case 'Home':
        e.preventDefault();
        setPosition(0);
        break;
      case 'End':
        e.preventDefault();
        setPosition(100);
        break;
    }
  }, []);

  // Mouse and touch event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className={cn("space-y-4", className)}>
      <div
        ref={containerRef}
        className="relative aspect-video bg-muted rounded-lg overflow-hidden select-none cursor-ew-resize focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        data-testid="before-after-slider"
      >
        {/* After image (background) */}
        <img
          src={afterImage.src}
          alt={afterImage.alt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={beforeImage.src}
            alt={beforeImage.alt}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 flex items-center justify-center">
            {/* Handle arrows */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-600">
              <path
                d="M8 7L3 12L8 17M16 7L21 12L16 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Invisible interaction area for better touch/mouse handling */}
          <div
            className="absolute top-0 bottom-0 -left-4 -right-4 cursor-ew-resize"
            tabIndex={0}
            role="slider"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Compare before and after images. Current position: ${Math.round(position)}%`}
            onKeyDown={handleKeyDown}
            data-testid="slider-handle"
          />
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
          After
        </div>
      </div>

      {/* Captions */}
      {(beforeImage.caption || afterImage.caption) && (
        <div className="flex gap-4 text-sm text-muted-foreground">
          {beforeImage.caption && (
            <div className="flex-1">
              <span className="font-medium">Before:</span> {beforeImage.caption}
            </div>
          )}
          {afterImage.caption && (
            <div className="flex-1">
              <span className="font-medium">After:</span> {afterImage.caption}
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-xs text-muted-foreground">
        Drag the slider or use arrow keys to compare
      </div>
    </div>
  );
}