import { create } from 'zustand';

export type AppType = 'terminal' | 'explorer' | 'chess' | 'browser';

export interface WindowState {
    id: string;
    title: string;
    appType: AppType;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
}

interface DesktopStore {
    windows: WindowState[];
    activeWindowId: string | null;
    highestZIndex: number;
    openWindow: (appType: AppType, title: string) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
    updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

const DEFAULT_WINDOWS: Record<AppType, Partial<WindowState>> = {
    terminal: { size: { width: 600, height: 400 }, title: 'Terminal' },
    explorer: { size: { width: 800, height: 600 }, title: 'File Explorer' },
    chess: { size: { width: 500, height: 500 }, title: 'Chess' },
    browser: { size: { width: 1000, height: 700 }, title: 'Browser' },
};

export const useDesktopStore = create<DesktopStore>((set) => ({
    windows: [],
    activeWindowId: null,
    highestZIndex: 10,

    openWindow: (appType, title) => set((state) => {
        // Check if a window of this type is already open
        const existingWindow = state.windows.find(w => w.appType === appType);

        if (existingWindow) {
            return {
                windows: state.windows.map(w =>
                    w.id === existingWindow.id ? { ...w, isMinimized: false, zIndex: state.highestZIndex + 1 } : w
                ),
                activeWindowId: existingWindow.id,
                highestZIndex: state.highestZIndex + 1,
            };
        }

        const newZIndex = state.highestZIndex + 1;
        const newWindow: WindowState = {
            id: `${appType}-${Date.now()}`,
            title: title || DEFAULT_WINDOWS[appType].title || 'App',
            appType,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            position: { x: Math.random() * 50 + 100, y: Math.random() * 50 + 100 }, // stagger new windows
            size: DEFAULT_WINDOWS[appType].size || { width: 600, height: 400 },
            zIndex: newZIndex,
        };

        return {
            windows: [...state.windows, newWindow],
            activeWindowId: newWindow.id,
            highestZIndex: newZIndex,
        };
    }),

    closeWindow: (id) => set((state) => ({
        windows: state.windows.filter((w) => w.id !== id),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

    minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map((w) => w.id === id ? { ...w, isMinimized: true } : w),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),

    maximizeWindow: (id) => set((state) => ({
        windows: state.windows.map((w) => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w),
    })),

    focusWindow: (id) => set((state) => {
        if (state.activeWindowId === id) return state;

        const newZIndex = state.highestZIndex + 1;
        return {
            windows: state.windows.map((w) => w.id === id ? { ...w, zIndex: newZIndex, isMinimized: false } : w),
            activeWindowId: id,
            highestZIndex: newZIndex,
        };
    }),

    updateWindowPosition: (id, position) => set((state) => ({
        windows: state.windows.map((w) => w.id === id ? { ...w, position } : w),
    })),

    updateWindowSize: (id, size) => set((state) => ({
        windows: state.windows.map((w) => w.id === id ? { ...w, size } : w),
    })),
}));
