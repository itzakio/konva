import { useState, useCallback, useRef, useEffect } from 'react';
import { Stand } from '@/features/stands/types/stand.types';
import { useDebounce } from './useDebounce';

interface UseStandSearchReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  highlightedStandId: string | null;
  focusOnStand: (stand: Stand) => void;
  clearHighlight: () => void;
}

export const useStandSearch = (
  stands: Stand[] | undefined,
  focusOnPoint: (x: number, y: number, scale?: number) => void
): UseStandSearchReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedStandId, setHighlightedStandId] = useState<string | null>(null);
  const debouncedTerm = useDebounce(searchTerm, 300);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const focusOnStand = useCallback((stand: Stand) => {
    const centerX = stand.x + stand.width / 2;
    const centerY = stand.y + stand.height / 2;
    focusOnPoint(centerX, centerY, 1.2);
    setHighlightedStandId(stand.id);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setHighlightedStandId(null), 3000);
  }, [focusOnPoint]);

  const clearHighlight = () => {
    setHighlightedStandId(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Auto-find matching stand when debounced term changes
  useEffect(() => {
    if (!stands || !debouncedTerm.trim()) {
      clearHighlight();
      return;
    }
    const match = stands.find(s =>
      s.standNo.toLowerCase().includes(debouncedTerm.toLowerCase())
    );
    if (match) {
      focusOnStand(match);
    } else {
      clearHighlight();
    }
  }, [debouncedTerm, stands, focusOnStand]);

  return {
    searchTerm,
    setSearchTerm,
    highlightedStandId,
    focusOnStand,
    clearHighlight,
  };
};