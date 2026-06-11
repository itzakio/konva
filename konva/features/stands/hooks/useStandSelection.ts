import { useState, useCallback } from 'react';

interface UseStandSelectionReturn {
  selectedStandId: string | null;
  selectStand: (standId: string) => void;
  clearSelection: () => void;
}

export const useStandSelection = (): UseStandSelectionReturn => {
  const [selectedStandId, setSelectedStandId] = useState<string | null>(null);

  const selectStand = useCallback((standId: string) => {
    setSelectedStandId(standId);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedStandId(null);
  }, []);

  return {
    selectedStandId,
    selectStand,
    clearSelection,
  };
};
