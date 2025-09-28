import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterChipsProps {
  options: FilterOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  multiSelect?: boolean;
  className?: string;
  urlSync?: {
    paramName: string;
    updateUrl: (params: URLSearchParams) => void;
  };
}

export function FilterChips({
  options,
  value = [],
  onValueChange,
  multiSelect = false,
  className,
  urlSync
}: FilterChipsProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(value);

  // Initialize from URL on mount
  useEffect(() => {
    if (urlSync) {
      const urlParams = new URLSearchParams(window.location.search);
      const urlValue = urlParams.get(urlSync.paramName);
      if (urlValue) {
        const ids = urlValue.split(',').filter(Boolean);
        setSelectedIds(ids);
        onValueChange?.(ids);
      }
    }
  }, [urlSync, onValueChange]);

  // Update URL when selection changes
  useEffect(() => {
    if (urlSync && selectedIds.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set(urlSync.paramName, selectedIds.join(','));
      urlSync.updateUrl(urlParams);
    } else if (urlSync && selectedIds.length === 0) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.delete(urlSync.paramName);
      urlSync.updateUrl(urlParams);
    }
  }, [selectedIds, urlSync]);

  const handleToggle = useCallback((id: string) => {
    setSelectedIds(prev => {
      let newValue: string[];
      
      if (multiSelect) {
        newValue = prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id];
      } else {
        newValue = prev.includes(id) ? [] : [id];
      }
      
      onValueChange?.(newValue);
      return newValue;
    });
  }, [multiSelect, onValueChange]);

  const clearAll = useCallback(() => {
    setSelectedIds([]);
    onValueChange?.([]);
  }, [onValueChange]);

  return (
    <div 
      className={cn("relative", className)}
      data-testid="filter-chips"
    >
      <ScrollArea className="w-full pb-2">
        <div className="flex items-center gap-2 px-1">
          {selectedIds.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-xs h-8 px-3 text-muted-foreground hover:text-foreground"
              data-testid="filter-clear-all"
            >
              Clear all
            </Button>
          )}
          
          <div className="flex gap-2 flex-nowrap">
            {options.map((option) => {
              const isSelected = selectedIds.includes(option.id);
              return (
                <Button
                  key={option.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleToggle(option.id)}
                  className={cn(
                    "h-8 px-3 text-xs font-medium rounded-chip transition-all duration-fast ease-smooth",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "whitespace-nowrap flex-shrink-0",
                    isSelected && [
                      "bg-primary text-primary-foreground shadow-sm",
                      "hover:bg-primary/90"
                    ],
                    !isSelected && [
                      "bg-transparent border-border hover:bg-muted",
                      "hover:border-primary/40 hover:text-foreground"
                    ]
                  )}
                  data-testid={`filter-chip-${option.id}`}
                  aria-pressed={isSelected}
                >
                  {option.label}
                  {option.count !== undefined && (
                    <span className={cn(
                      "ml-1.5 text-xs opacity-80",
                      isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      {option.count}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// Helper hook for URL synchronization
export function useFilterUrl(paramName: string) {
  const updateUrl = useCallback((params: URLSearchParams) => {
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, []);

  return {
    paramName,
    updateUrl
  };
}