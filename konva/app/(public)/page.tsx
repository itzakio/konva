'use client';

import { ExhibitionMap } from '@/components/map/ExhibitionMap';
import { SearchStand } from '@/components/search/SearchStand';
import { StandDetailsDrawer } from '@/components/booking/StandDetailsDrawer';
import { useStands } from '@/features/stands/hooks/useStands';
import { useStandSearch } from '@/hooks/useStandSearch';
import { useMapControls } from '@/hooks/useMapControls';
import { useStandSelection } from '@/features/stands/hooks/useStandSelection';
import { useState } from 'react';

export default function ExhibitionPage() {
  const { data: stands } = useStands();
  const { focusOnPoint, stageRef, ...mapControls } = useMapControls();
  const { searchTerm, setSearchTerm, highlightedStandId } = useStandSearch(stands, focusOnPoint);
  const { selectedStandId, selectStand, clearSelection } = useStandSelection();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedStand = stands?.find(s => s.id === selectedStandId);

  const handleStandClick = (standId: string) => {
    selectStand(standId);
    setDrawerOpen(true);
  };

  return (
    <main className="h-screen w-full overflow-hidden relative">
      <SearchStand value={searchTerm} onChange={setSearchTerm} />
      <ExhibitionMap
        highlightedStandId={highlightedStandId}
        onStandClick={handleStandClick}
      />
      <StandDetailsDrawer
        stand={selectedStand || null}
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          clearSelection();
        }}
      />
    </main>
  );
}