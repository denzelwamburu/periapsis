import { create } from 'zustand';

interface TimeState {
    simulationTime: Date;
    isPlaying: boolean;
    playbackSpeed: number; // 1x, 10x, 100x, 1000x

    // Actions
    play: () => void;
    pause: () => void;
    togglePlayback: () => void;
    setSpeed: (speed: number) => void;
    jumpTo: (date: Date) => void;
    syncToNow: () => void;
    tick: () => void;
}

export const useTimeStore = create<TimeState>((set, get) => ({
    simulationTime: new Date(),
    isPlaying: true,
    playbackSpeed: 1,

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    togglePlayback: () => set((state) => ({ isPlaying: !state.isPlaying })),

    setSpeed: (speed) => set({ playbackSpeed: speed }),

    jumpTo: (date) => set({ simulationTime: date }),

    syncToNow: () => set({
        simulationTime: new Date(),
        isPlaying: true,
        playbackSpeed: 1
    }),

    tick: () => {
        const state = get();
        if (!state.isPlaying) return;

        const newTime = new Date(
            state.simulationTime.getTime() + (1000 * state.playbackSpeed) / 60
        );
        set({ simulationTime: newTime });
    },
}));

// Speed presets
export const SPEED_PRESETS = [1, 10, 100, 1000];

// Format time for display
export function formatSimulationTime(date: Date): string {
    return date.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
}

// Check if simulation is synced to real time
export function isLive(simulationTime: Date, threshold = 5000): boolean {
    return Math.abs(Date.now() - simulationTime.getTime()) < threshold;
}
