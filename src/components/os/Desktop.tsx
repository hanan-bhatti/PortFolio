'use client';

import React, { useEffect, useState } from 'react';
import { useDesktopStore, AppType } from '@/store/useDesktopStore';
import Window from './Window';
import Taskbar from './Taskbar';
import Terminal from './apps/Terminal';
import FileExplorer from './apps/FileExplorer';
import Browser from './apps/Browser';
import ChessGame from './apps/Chess';
import { Folder, Globe, Terminal as TerminalIcon, Gamepad2, Code2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

// Component mapping for the OS applications
const Apps = {
    terminal: Terminal,
    explorer: FileExplorer,
    browser: Browser,
    chess: ChessGame,
};

export default function Desktop() {
    const windows = useDesktopStore(state => state.windows);
    const openWindow = useDesktopStore(state => state.openWindow);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const desktopIcons: { type: AppType, label: string, icon: React.ReactNode }[] = [
        { type: 'explorer', label: 'My Computer', icon: <Code2 className="w-10 h-10 text-cyan-200" fill="currentColor" strokeWidth={1} /> },
        { type: 'terminal', label: 'MS-DOS Prompt', icon: <TerminalIcon className="w-10 h-10 text-black fill-black" strokeWidth={1.5} /> },
        { type: 'browser', label: 'Internet Explorer', icon: <Globe className="w-10 h-10 text-blue-200 fill-blue-600" strokeWidth={1.5} /> },
        { type: 'chess', label: 'Chess Game', icon: <Gamepad2 className="w-10 h-10 text-purple-800 fill-purple-300" strokeWidth={1.5} /> },
    ];

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#008080] select-none font-sans text-black">

            {/* Desktop Icons */}
            <div className="absolute top-0 left-0 p-4 flex flex-col flex-wrap max-h-[calc(100vh-48px)] gap-6 z-0">
                {desktopIcons.map(item => (
                    <div
                        key={item.label}
                        className="flex flex-col items-center gap-1 cursor-default w-[72px] text-center group"
                        onDoubleClick={() => openWindow(item.type, item.label)}
                    >
                        <div className="p-1 group-active:brightness-50 group-active:contrast-150 border border-transparent group-active:border-dotted group-active:border-gray-400 group-hover:border-dotted group-hover:border-gray-200 mb-1 drop-shadow-md">
                            {item.icon}
                        </div>
                        <span className="text-white text-xs bg-[#008080] px-1 group-active:bg-[#000080] group-hover:bg-[#000080] leading-tight">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Render Open Windows */}
            <AnimatePresence>
                {windows.map((win) => {
                    const AppContent = Apps[win.appType];
                    return (
                        <Window key={win.id} id={win.id}>
                            <AppContent />
                        </Window>
                    );
                })}
            </AnimatePresence>

            {/* Taskbar */}
            <Taskbar />

        </div>
    );
}
