import { create } from 'zustand';
import { Satellite } from '@/types/satellite';

interface SelectionState {
    selectedSatelliteId: string | null;
    hoveredSatelliteId: string | null;
    selectedSatellite: Satellite | null;

    // Actions
    selectSatellite: (satellite: Satellite | null) => void;
    selectSatelliteById: (id: string | null) => void;
    hoverSatellite: (id: string | null) => void;
    clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
    selectedSatelliteId: null,
    hoveredSatelliteId: null,
    selectedSatellite: null,

    selectSatellite: (satellite) => set({
        selectedSatellite: satellite,
        selectedSatelliteId: satellite?.id ?? null,
    }),

    selectSatelliteById: (id) => set({
        selectedSatelliteId: id,
        // Note: selectedSatellite will need to be updated by the consumer
    }),

    hoverSatellite: (id) => set({ hoveredSatelliteId: id }),

    clearSelection: () => set({
        selectedSatelliteId: null,
        selectedSatellite: null,
        hoveredSatelliteId: null,
    }),
}));
