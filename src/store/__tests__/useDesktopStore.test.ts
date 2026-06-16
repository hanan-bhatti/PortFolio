import { describe, it, expect, beforeEach } from 'vitest';
import { useDesktopStore } from '../useDesktopStore';

describe('useDesktopStore', () => {
    beforeEach(() => {
        // Reset the store state before each test
        useDesktopStore.setState({
            windows: [],
            activeWindowId: null,
            highestZIndex: 10
        });
    });

    describe('openWindow', () => {
        it('should open a new window when none of that type are open', () => {
            const { openWindow } = useDesktopStore.getState();
            openWindow('terminal', 'My Terminal');

            const state = useDesktopStore.getState();
            expect(state.windows).toHaveLength(1);
            expect(state.windows[0].appType).toBe('terminal');
            expect(state.windows[0].title).toBe('My Terminal');
            expect(state.activeWindowId).toBe(state.windows[0].id);
            expect(state.highestZIndex).toBe(11);
            expect(state.windows[0].zIndex).toBe(11);
            expect(state.windows[0].isMinimized).toBe(false);
            expect(state.windows[0].isOpen).toBe(true);
        });

        it('should use default title if none provided', () => {
            const { openWindow } = useDesktopStore.getState();
            openWindow('chess', '');

            const state = useDesktopStore.getState();
            expect(state.windows[0].title).toBe('Chess');
        });

        it('should focus and un-minimize an existing window of the same type', () => {
            const { openWindow, minimizeWindow } = useDesktopStore.getState();

            // Open first window
            openWindow('terminal', 'First');
            const firstId = useDesktopStore.getState().windows[0].id;

            // Minimize it
            minimizeWindow(firstId);
            expect(useDesktopStore.getState().windows[0].isMinimized).toBe(true);

            // Open terminal again
            openWindow('terminal', 'Second Attempt');

            const state = useDesktopStore.getState();
            expect(state.windows).toHaveLength(1);
            expect(state.windows[0].id).toBe(firstId);
            expect(state.windows[0].isMinimized).toBe(false);
            expect(state.activeWindowId).toBe(firstId);
            expect(state.highestZIndex).toBe(12); // 10 -> 11 (first open) -> 12 (second attempt)
            expect(state.windows[0].zIndex).toBe(12);
        });

        it('should increment zIndex correctly for multiple different windows', () => {
            const { openWindow } = useDesktopStore.getState();

            openWindow('terminal', 'Terminal');
            openWindow('explorer', 'Explorer');

            const state = useDesktopStore.getState();
            expect(state.windows).toHaveLength(2);
            expect(state.highestZIndex).toBe(12);

            const terminal = state.windows.find(w => w.appType === 'terminal');
            const explorer = state.windows.find(w => w.appType === 'explorer');

            expect(terminal?.zIndex).toBe(11);
            expect(explorer?.zIndex).toBe(12);
            expect(state.activeWindowId).toBe(explorer?.id);
        });

        it('should stagger positions of new windows', () => {
            const { openWindow } = useDesktopStore.getState();

            openWindow('terminal', 'T1');
            openWindow('explorer', 'E1');

            const state = useDesktopStore.getState();
            const p1 = state.windows[0].position;
            const p2 = state.windows[1].position;

            // Since they use Math.random(), they are unlikely to be identical
            // This is just to verify the position property exists and is set
            expect(p1.x).toBeGreaterThanOrEqual(100);
            expect(p1.y).toBeGreaterThanOrEqual(100);
            expect(p2.x).toBeGreaterThanOrEqual(100);
            expect(p2.y).toBeGreaterThanOrEqual(100);
        });
    });
});
