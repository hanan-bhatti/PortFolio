'use client';

import React, { useState } from 'react';
import { VIBE_FS, FSNode } from '@/lib/os/fs';
import { Folder, FileText, ChevronLeft, ChevronRight, ArrowUpLeft, HardDrive } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FileExplorer() {
    const [currentPath, setCurrentPath] = useState('/home/user');
    const [history, setHistory] = useState<string[]>(['/home/user']);
    const [historyIndex, setHistoryIndex] = useState(0);

    const currentNode = VIBE_FS[currentPath];
    const items = currentNode?.children || [];

    const navigateTo = (path: string) => {
        if (!VIBE_FS[path]) return;
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(path);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentPath(path);
    };

    const goBack = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentPath(history[newIndex]);
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCurrentPath(history[newIndex]);
        }
    };

    const goUp = () => {
        if (currentPath === '/') return;
        const lastSlash = currentPath.lastIndexOf('/');
        const parentPath = currentPath.substring(0, lastSlash) || '/';
        navigateTo(parentPath);
    };

    const handleItemClick = (name: string) => {
        const itemPath = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;
        const node = VIBE_FS[itemPath];
        if (node?.type === 'folder') {
            navigateTo(itemPath);
        } else {
            // In a real OS, this would open the file in a viewer (Notepad, etc.)
            alert(`Opening ${name}: \n\n${node?.content || 'No content'}`);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#c0c0c0] text-black font-sans">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-1 border-b border-gray-400 bg-[#c0c0c0] shrink-0">
                <button
                    onClick={goBack}
                    disabled={historyIndex === 0}
                    className="p-1 hover:bg-gray-300 disabled:opacity-50 border border-transparent active:border-gray-600 shadow-sm"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                    onClick={goForward}
                    disabled={historyIndex === history.length - 1}
                    className="p-1 hover:bg-gray-300 disabled:opacity-50 border border-transparent active:border-gray-600 shadow-sm"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
                <button
                    onClick={goUp}
                    className="p-1 hover:bg-gray-300 border border-transparent active:border-gray-600 shadow-sm"
                >
                    <ArrowUpLeft className="w-4 h-4" />
                </button>
                <div className="h-4 w-[1px] bg-gray-500 mx-1" />
                <div className="flex-1 flex items-center bg-white border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white px-2 py-[2px] text-xs">
                    <span className="text-gray-400 mr-2">Address</span>
                    <span className="truncate">{currentPath}</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white m-1 p-2 overflow-auto">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4 content-start">
                    {items.map(name => {
                        const path = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;
                        const node = VIBE_FS[path];
                        const isFolder = node?.type === 'folder';

                        return (
                            <div
                                key={name}
                                className="flex flex-col items-center gap-1 cursor-default group p-1 hover:bg-[#000080]/10"
                                onDoubleClick={() => handleItemClick(name)}
                            >
                                <div className="p-1 group-active:brightness-90">
                                    {isFolder ? (
                                        <Folder className="w-10 h-10 text-yellow-500 fill-yellow-200" />
                                    ) : (
                                        <FileText className="w-10 h-10 text-white fill-white border border-gray-400 shadow-sm" />
                                    )}
                                </div>
                                <span className="text-[11px] text-center break-all line-clamp-2 px-1 group-hover:bg-[#000080] group-hover:text-white border border-transparent group-hover:border-dotted group-hover:border-gray-200 whitespace-normal">
                                    {name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-5 bg-[#c0c0c0] border-t border-gray-400 flex items-center px-2 text-[10px] shrink-0">
                <div className="flex-1 truncate">{items.length} items(s)</div>
                <div className="border-l border-gray-400 h-full mx-2" />
                <div className="flex items-center gap-1">
                    <HardDrive className="w-3 h-3" />
                    <span>My Computer</span>
                </div>
            </div>
        </div>
    );
}
