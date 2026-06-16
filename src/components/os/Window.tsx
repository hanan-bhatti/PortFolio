'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDesktopStore } from '@/store/useDesktopStore';
import { Minus, Square, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WindowProps {
    id: string;
    children: React.ReactNode;
}

export default function Window({ id, children }: WindowProps) {
    const windowRef = useRef<HTMLDivElement>(null);

    const windowState = useDesktopStore((state) => state.windows.find(w => w.id === id));
    const focusWindow = useDesktopStore((state) => state.focusWindow);
    const closeWindow = useDesktopStore((state) => state.closeWindow);
    const minimizeWindow = useDesktopStore((state) => state.minimizeWindow);
    const maximizeWindow = useDesktopStore((state) => state.maximizeWindow);
    const updatePosition = useDesktopStore((state) => state.updateWindowPosition);

    if (!windowState || windowState.isMinimized) return null;

    const handlePointerDown = () => {
        focusWindow(id);
    };

    const variants = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 }
    };

    return (
        <motion.div
            ref={windowRef}
            drag={!windowState.isMaximized}
            dragMomentum={false}
            dragElastic={0}
            onDragEnd={(event, info) => {
                const x = windowState.position.x + info.offset.x;
                const y = windowState.position.y + info.offset.y;
                updatePosition(id, { x, y });
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.2 }}
            onPointerDown={handlePointerDown}
            style={{
                zIndex: windowState.zIndex,
                position: 'absolute',
                top: windowState.isMaximized ? 0 : windowState.position.y,
                left: windowState.isMaximized ? 0 : windowState.position.x,
                width: windowState.isMaximized ? '100vw' : windowState.size.width,
                height: windowState.isMaximized ? 'calc(100vh - 48px)' : windowState.size.height,
            }}
            className={cn(
                "flex flex-col bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600 shadow-[2px_2px_10px_rgba(0,0,0,0.5)] overflow-hidden",
                windowState.isMaximized ? "rounded-none" : ""
            )}
        >
            {/* Title Bar - Windows 95/98 Blue Gradient */}
            <div
                className="h-7 m-[2px] flex items-center justify-between px-1 shrink-0 bg-gradient-to-r from-[#000080] to-[#1084d0] cursor-move"
            >
                <div className="flex items-center gap-1 font-bold text-xs text-white tracking-wider ml-1">
                    {windowState.title}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-[2px]">
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                        className="w-5 h-5 flex items-center justify-center bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800 active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white"
                    >
                        <Minus className="w-3 h-3 text-black stroke-[3]" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
                        className="w-5 h-5 flex items-center justify-center bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800 active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white"
                    >
                        <Square className="w-3 h-3 text-black stroke-[3]" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                        className="w-5 h-5 flex items-center justify-center bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800 active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white ml-1"
                    >
                        <X className="w-3 h-3 text-black stroke-[3]" />
                    </button>
                </div>
            </div>

            {/* Content Area - Sunken border */}
            <div className="flex-1 w-full h-full overflow-auto relative cursor-auto bg-white border-t-2 border-l-2 border-t-gray-600 border-l-gray-600 border-b-2 border-r-2 border-b-white border-r-white m-1">
                {children}
            </div>
        </motion.div>
    );
}
