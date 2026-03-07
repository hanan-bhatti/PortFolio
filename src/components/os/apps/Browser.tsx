'use client';

import React, { useState } from 'react';
import { Home, Info, Briefcase, MessageSquare, ChevronLeft, ChevronRight, RefreshCw, Star, Globe } from 'lucide-react';

type PageType = 'home' | 'about' | 'projects' | 'blog';

export default function Browser() {
    const [currentPage, setCurrentPage] = useState<PageType>('home');
    const [url, setUrl] = useState('vibe-coder.com/home');

    const navigateTo = (page: PageType) => {
        setCurrentPage(page);
        setUrl(`vibe-coder.com/${page}`);
    };

    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <div className="space-y-4">
                        <h1 className="text-3xl font-serif text-blue-900 border-b border-gray-300 pb-2 italic">Welcome to my Digital Workspace</h1>
                        <p className="leading-relaxed">This is my personal portfolio, reimagined as a 1990s retro operating system. I am a Computer Science student and a "Vibe Coder" who believes that software should be both functional and expressive.</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border-2 border-gray-200 bg-gray-50 flex flex-col items-center gap-2">
                                <Info className="w-8 h-8 text-blue-600" />
                                <h2 className="font-bold">About Me</h2>
                                <button onClick={() => navigateTo('about')} className="text-blue-700 underline text-sm">View Profile</button>
                            </div>
                            <div className="p-4 border-2 border-gray-200 bg-gray-50 flex flex-col items-center gap-2">
                                <Briefcase className="w-8 h-8 text-green-600" />
                                <h2 className="font-bold">My Projects</h2>
                                <button onClick={() => navigateTo('projects')} className="text-blue-700 underline text-sm">See Work</button>
                            </div>
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif text-blue-900 italic underline">About the Author</h2>
                        <p>Hanan Bhatti is a polymath and CS student with a passion for building immersive digital experiences. From C# desktop apps to modern web frameworks, I explore the intersections of technology and design.</p>
                        <h3 className="font-bold border-b border-gray-200 mt-6">Core Competencies:</h3>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>Full-Stack Development (Next.js, Node.js, MongoDB)</li>
                            <li>Systems Programming (C#, C++)</li>
                            <li>UI/UX Design & Skeuomorphism</li>
                            <li>Mobile App Development (Android)</li>
                        </ul>
                    </div>
                );
            case 'projects':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-serif text-blue-900 italic underline">Project Highlights</h2>
                        <div className="space-y-4">
                            <div className="border border-gray-300 p-4">
                                <h3 className="font-bold text-lg text-blue-800">Vibe OS Portfolio</h3>
                                <p className="text-sm text-gray-600 mb-2">Next.js, Zustand, Framer Motion</p>
                                <p>An immersive OS-style portfolio with draggable windows and simulated apps.</p>
                            </div>
                            <div className="border border-gray-300 p-4">
                                <h3 className="font-bold text-lg text-blue-800">E-Commerce Engine</h3>
                                <p className="text-sm text-gray-600 mb-2">Node.js, PostgreSQL</p>
                                <p>A scalable back-end for modern online shopping experiences.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'blog':
                return (
                    <div className="flex items-center justify-center h-64 italic text-gray-500">
                        <div className="text-center">
                            <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
                            <p>Blog feed coming soon... Stay tuned for insights on Vibe Coding!</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#c0c0c0] font-sans selection:bg-[#000080] selection:text-white">
            {/* Menu Bar */}
            <div className="px-1 border-b border-white flex gap-3 text-[11px] py-[2px] bg-[#c0c0c0]">
                <span className="hover:bg-[#000080] hover:text-white px-2 cursor-default">File</span>
                <span className="hover:bg-[#000080] hover:text-white px-2 cursor-default">Edit</span>
                <span className="hover:bg-[#000080] hover:text-white px-2 cursor-default">View</span>
                <span className="hover:bg-[#000080] hover:text-white px-2 cursor-default">Go</span>
                <span className="hover:bg-[#000080] hover:text-white px-2 cursor-default font-bold">Favorites</span>
                <span className="hover:bg-[#000080] hover:text-white px-2 cursor-default">Help</span>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 p-1 border-b border-gray-400 bg-[#c0c0c0]">
                <div className="flex gap-1 border-r border-gray-400 pr-2">
                    <button className="flex flex-col items-center p-1 hover:bg-gray-100/50 rounded active:shadow-inner">
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                        <span className="text-[9px]">Back</span>
                    </button>
                    <button className="flex flex-col items-center p-1 hover:bg-gray-100/50 rounded active:shadow-inner opacity-50">
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                        <span className="text-[9px]">Forward</span>
                    </button>
                </div>
                <button className="flex flex-col items-center p-1 hover:bg-gray-100/50 rounded active:shadow-inner" onClick={() => navigateTo('home')}>
                    <Home className="w-5 h-5 text-gray-700" />
                    <span className="text-[9px]">Home</span>
                </button>
                <button className="flex flex-col items-center p-1 hover:bg-gray-100/50 rounded active:shadow-inner">
                    <RefreshCw className="w-5 h-5 text-gray-700" />
                    <span className="text-[9px]">Reload</span>
                </button>
                <div className="flex-1 flex items-center bg-white border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white px-2 h-7 overflow-hidden text-sm">
                    <span className="truncate">{url}</span>
                </div>
                <button className="flex flex-col items-center p-1 hover:bg-gray-100/50 rounded active:shadow-inner">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <span className="text-[9px]">Favorite</span>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white m-1 overflow-auto">
                <div className="p-8 max-w-2xl mx-auto min-h-full">
                    {renderContent()}
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-5 bg-[#c0c0c0] border-t border-gray-400 flex items-center px-2 text-[10px] gap-2">
                <div className="flex-1 truncate">Done</div>
                <div className="border-l border-gray-400 h-full mx-1" />
                <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-blue-600" />
                    <span>Internet Zone</span>
                </div>
            </div>
        </div>
    );
}
