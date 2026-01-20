import { create } from 'zustand';

interface UIState {
    sidebarOpen: boolean;
    sidebarCollapsed: boolean;
    theme: 'dark' | 'light';
    activePanel: 'catalog' | 'details' | 'telemetry' | null;

    // Actions
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    setTheme: (theme: 'dark' | 'light') => void;
    setActivePanel: (panel: 'catalog' | 'details' | 'telemetry' | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: true,
    sidebarCollapsed: false,
    theme: 'dark',
    activePanel: 'catalog',

    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    setTheme: (theme) => set({ theme }),
    setActivePanel: (panel) => set({ activePanel: panel }),
}));
