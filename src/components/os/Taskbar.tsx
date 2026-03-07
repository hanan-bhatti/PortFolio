'use client';

import React, { useState, useEffect } from 'react';
import { useDesktopStore, AppType } from '@/store/useDesktopStore';
import { Terminal, Folder, Gamepad2, Globe } from 'lucide-react';
import { cn } from '@/components/os/Window';

const APP_ICONS: Record<AppType, React.ReactNode> = {
    terminal: <Terminal className="w-5 h-5 text-black" />,
    explorer: <Folder className="w-5 h-5 text-blue-800 fill-blue-300" />,
    chess: <Gamepad2 className="w-5 h-5 text-gray-800" />,
    browser: <Globe className="w-5 h-5 text-indigo-700" />
};

export default function Taskbar() {
    const windows = useDesktopStore(state => state.windows);
    const activeWindowId = useDesktopStore(state => state.activeWindowId);
    const focusWindow = useDesktopStore(state => state.focusWindow);
    const openWindow = useDesktopStore(state => state.openWindow);

    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleAppClick = (appType: AppType) => {
        const win = windows.find(w => w.appType === appType);
        if (win) {
            if (win.isMinimized || activeWindowId !== win.id) {
                focusWindow(win.id);
            }
        } else {
            openWindow(appType, appType.charAt(0).toUpperCase() + appType.slice(1));
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-2 border-white z-50 flex items-center justify-between px-1 shadow-[0_-2px_5px_rgba(0,0,0,0.2)]">

            {/* Start Button & Open Windows */}
            <div className="flex items-center gap-1 h-full py-1">

                {/* 'Start' Button Replica */}
                <button
                    className="h-full px-2 font-bold text-black flex items-center gap-2 bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600 active:border-t-gray-600 active:border-l-gray-600 active:border-b-white active:border-r-white mr-2"
                >
                    <div className="flex gap-[1px]">
                        <div className="w-2 h-2 bg-red-500"></div>
                        <div className="w-2 h-2 bg-green-500"></div>
                        <div className="w-2 h-2 bg-blue-500"></div>
                        <div className="w-2 h-2 bg-yellow-500"></div>
                    </div>
                    <span className="mb-[1px]">Start</span>
                </button>

                {/* Divider */}
                <div className="h-full w-0 border-l border-r border-l-gray-500 border-r-white mx-1"></div>

                {/* Taskbar App Tabs */}
                {windows.map((win) => {
                    const isActive = win.id === activeWindowId && !win.isMinimized;

                    return (
                        <button
                            key={win.id}
                            onClick={() => focusWindow(win.id)}
                            className={cn(
                                "h-full min-w-[120px] max-w-[160px] px-2 flex items-center gap-2 truncate text-sm font-medium text-black",
                                isActive
                                    ? "bg-[#d4d0c8] border-t-2 border-l-2 border-t-gray-800 border-l-gray-800 border-b-2 border-r-2 border-b-white border-r-white bg-grid-pattern"
                                    : "bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600"
                            )}
                        >
                            {APP_ICONS[win.appType]}
                            <span className="truncate">{win.title}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tray Area (Time) */}
            <div className="flex items-center h-full py-1 pr-1">
                <div className="h-full px-4 flex items-center bg-[#c0c0c0] border-t-2 border-l-2 border-t-gray-600 border-l-gray-600 border-b-2 border-r-2 border-b-white border-r-white text-xs font-mono">
                    {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                </div>
            </div>
        </div>
    );
}
