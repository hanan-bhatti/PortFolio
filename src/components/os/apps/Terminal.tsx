'use client';

import React, { useState, useRef, useEffect } from 'react';
import { VIBE_FS } from '@/lib/os/fs';

interface TerminalLine {
    type: 'command' | 'output' | 'error';
    content: string;
}

export default function Terminal() {
    const [history, setHistory] = useState<TerminalLine[]>([
        { type: 'output', content: 'Microsoft(R) Windows DOS' },
        { type: 'output', content: '(C)Copyright Microsoft Corp 1990-2001.' },
        { type: 'output', content: '' },
        { type: 'output', content: 'Type "HELP" for a list of commands.' },
        { type: 'output', content: '' },
    ]);
    const [input, setInput] = useState('');
    const [currentPath, setCurrentPath] = useState('/home/user');
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        setHistory(prev => [...prev, { type: 'command', content: `${currentPath}> ${trimmedCmd}` }]);

        const args = trimmedCmd.split(' ');
        const command = args[0].toLowerCase();

        switch (command) {
            case 'help':
                setHistory(prev => [...prev, { type: 'output', content: 'Available commands: HELP, LS, CD, WHOAMI, CLEAR, DATE, CAT, EXIT' }]);
                break;
            case 'ls':
                const node = VIBE_FS[currentPath];
                if (node && node.type === 'folder' && node.children) {
                    const childrenList = node.children || [];
                    setHistory(prev => [...prev, { type: 'output', content: childrenList.join('    ') }]);
                }
                break;
            case 'cd':
                const target = args[1];
                if (!target || target === '.') break;
                if (target === '..') {
                    if (currentPath !== '/') {
                        const lastSlash = currentPath.lastIndexOf('/');
                        setCurrentPath(currentPath.substring(0, lastSlash) || '/');
                    }
                } else {
                    const newPath = currentPath === '/' ? `/${target}` : `${currentPath}/${target}`;
                    if (VIBE_FS[newPath] && VIBE_FS[newPath].type === 'folder') {
                        setCurrentPath(newPath);
                    } else {
                        setHistory(prev => [...prev, { type: 'error', content: `Directory not found: ${target}` }]);
                    }
                }
                break;
            case 'cat':
                const fileName = args[1];
                if (!fileName) {
                    setHistory(prev => [...prev, { type: 'error', content: 'Usage: CAT [filename]' }]);
                    break;
                }
                const filePath = currentPath === '/' ? `/${fileName}` : `${currentPath}/${fileName}`;
                const fileNode = VIBE_FS[filePath];
                if (fileNode && fileNode.type === 'file') {
                    setHistory(prev => [...prev, { type: 'output', content: fileNode.content || '' }]);
                } else {
                    setHistory(prev => [...prev, { type: 'error', content: `File not found: ${fileName}` }]);
                }
                break;
            case 'whoami':
                setHistory(prev => [...prev, { type: 'output', content: 'vibe-coder / hanan-bhatti' }]);
                break;
            case 'date':
                setHistory(prev => [...prev, { type: 'output', content: new Date().toString() }]);
                break;
            case 'clear':
                setHistory([]);
                break;
            default:
                setHistory(prev => [...prev, { type: 'error', content: `'${command}' is not recognized as an internal or external command, operable program or batch file.` }]);
        }

        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
        }
    };

    return (
        <div
            className="flex flex-col h-full bg-black text-[#00ff00] font-mono p-2 overflow-hidden uppercase"
            onClick={() => inputRef.current?.focus()}
        >
            <div ref={scrollRef} className="flex-1 overflow-y-auto mb-2 custom-scrollbar">
                {history.map((line, i) => (
                    <div key={i} className={line.type === 'error' ? 'text-red-500' : ''}>
                        {line.content}
                    </div>
                ))}
                <div className="flex">
                    <span className="mr-2 text-nowrap">{currentPath}&gt;</span>
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-[#00ff00] font-mono uppercase"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
}
