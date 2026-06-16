'use client';

import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Code2, LogOut, Plus, Search, ExternalLink, ChevronLeft } from 'lucide-react';
import HybridEditor from '@/components/admin/Editor';

type ViewType = 'overview' | 'manage-posts' | 'create-post' | 'manage-skills';

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeView, setActiveView] = useState<ViewType>('overview');

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-[#c0c0c0] flex items-center justify-center font-bold text-lg animate-pulse">
                System Initializing...
            </div>
        );
    }

    if (status === 'unauthenticated') {
        router.push('/admin/login');
        return null;
    }

    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return (
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="flex items-center justify-between border-b-2 border-blue-900 pb-2">
                            <h1 className="text-3xl font-serif text-blue-900 italic font-bold">System Status Overview</h1>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveView('create-post')}
                                    className="bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800 px-4 py-1 text-xs font-bold uppercase flex items-center gap-2 shadow-sm"
                                >
                                    <Plus className="w-3 h-3" /> New Post
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Total Page Views', value: '1,248', color: 'border-blue-500' },
                                { label: 'Published Posts', value: '12', color: 'border-green-500' },
                                { label: 'Unique Visitors', value: '456', color: 'border-purple-500' }
                            ].map((stat, idx) => (
                                <div key={idx} className={`bg-[#f0f0f0] border-l-4 ${stat.color} p-4 shadow-sm border border-gray-200`}>
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                    <p className="text-3xl font-serif font-bold text-blue-900 leading-none">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-bold text-blue-900 uppercase text-sm tracking-widest border-b border-blue-900">Recent Engagement</h3>
                            <div className="border border-gray-400">
                                <table className="w-full text-left bg-white">
                                    <thead className="bg-[#e0e0e0] text-[10px] font-bold uppercase">
                                        <tr>
                                            <th className="p-2 border border-gray-400">Timestamp</th>
                                            <th className="p-2 border border-gray-400">Target Path</th>
                                            <th className="p-2 border border-gray-400">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <tr key={i} className="hover:bg-blue-50">
                                                <td className="p-2 border border-gray-300 text-gray-500 text-nowrap">2026-03-07 14:2{i}</td>
                                                <td className="p-2 border border-gray-300">/projects/vibe-os</td>
                                                <td className="p-2 border border-gray-300"><span className="text-[9px] bg-green-100 text-green-700 px-1 border border-green-200 uppercase font-bold text-nowrap">VIEWED</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'manage-posts':
                return (
                    <div className="max-w-5xl mx-auto space-y-6">
                        <div className="flex items-center justify-between border-b-2 border-blue-900 pb-2">
                            <h1 className="text-3xl font-serif text-blue-900 italic font-bold">Manage Content</h1>
                            <button
                                onClick={() => setActiveView('create-post')}
                                className="bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800 px-4 py-1 text-xs font-bold uppercase flex items-center gap-2"
                            >
                                <Plus className="w-3 h-3" /> Add Entry
                            </button>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800 italic">
                            Note: All entries are stored as hybrid JSON/Blob data in MongoDB.
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-gray-50 border border-gray-300 p-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold">Retro Design in 2025: Why physical cues matter</h3>
                                        <p className="text-xs text-gray-500 italic">Published: 2024-11-{i}0 | Status: Live</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="text-[10px] font-bold underline text-blue-700 uppercase">Edit</button>
                                        <button className="text-[10px] font-bold underline text-red-700 uppercase">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'create-post':
                return (
                    <div className="h-full flex flex-col space-y-4">
                        <div className="flex items-center gap-4 shrink-0">
                            <button onClick={() => setActiveView('manage-posts')} className="p-1 border border-gray-400 hover:bg-gray-200"><ChevronLeft className="w-5 h-5" /></button>
                            <h1 className="text-2xl font-serif text-blue-900 italic font-bold">New Portfolio Entry</h1>
                        </div>
                        <div className="grid grid-cols-3 gap-4 shrink-0">
                            <div className="col-span-2">
                                <label className="text-[10px] font-bold uppercase text-gray-600">Entry Title</label>
                                <input type="text" className="w-full border-2 border-t-gray-600 border-l-gray-600 px-2 py-1 outline-none text-sm" placeholder="The Future of Vibe Coding..." />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase text-gray-600">Primary Tag</label>
                                <select className="w-full border-2 border-t-gray-600 border-l-gray-600 px-2 py-1 outline-none text-sm bg-white">
                                    <option>Design</option>
                                    <option>Development</option>
                                    <option>Polymathy</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex-1 min-h-0 border border-gray-400">
                            <HybridEditor />
                        </div>
                    </div>
                );
            default:
                return <div>View implementation pending...</div>;
        }
    };

    return (
        <div className="min-h-screen bg-[#c0c0c0] flex flex-col font-sans text-black overflow-hidden">
            {/* OS-Style Top Bar */}
            <div className="h-10 bg-[#000080] text-white flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-2 font-bold italic">
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Vibe Coder OS - Administration Panel</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <span>Logged in as: <span className="font-bold">{session?.user?.name}</span></span>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-1 hover:bg-[#1084d0] px-2 py-1 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Log out
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Admin Sidebar */}
                <div className="w-64 bg-[#c0c0c0] border-r-2 border-white p-2 space-y-1 overflow-auto shrink-0">
                    <p className="text-[10px] font-bold text-gray-600 px-2 py-1 uppercase tracking-widest">Main Menu</p>
                    <button
                        onClick={() => setActiveView('overview')}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-bold border ${activeView === 'overview' ? 'bg-[#000080] text-white border-t-[#1084d0] border-l-[#1084d0] border-b-black border-r-black' : 'hover:bg-gray-100/20 border-transparent hover:border-white'}`}
                    >
                        <LayoutDashboard className="w-4 h-4" /> Overview
                    </button>
                    <button
                        onClick={() => setActiveView('manage-posts')}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-bold border ${activeView === 'manage-posts' || activeView === 'create-post' ? 'bg-[#000080] text-white border-t-[#1084d0] border-l-[#1084d0] border-b-black border-r-black' : 'hover:bg-gray-100/20 border-transparent hover:border-white'}`}
                    >
                        <FileText className="w-4 h-4" /> Manage Posts
                    </button>
                    <button
                        onClick={() => setActiveView('manage-skills')}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-bold border ${activeView === 'manage-skills' ? 'bg-[#000080] text-white border-t-[#1084d0] border-l-[#1084d0] border-b-black border-r-black' : 'hover:bg-gray-100/20 border-transparent hover:border-white'}`}
                    >
                        <Code2 className="w-4 h-4" /> Manage Skills
                    </button>
                    <div className="pt-4 border-t border-gray-400 mt-4 px-2">
                        <button
                            onClick={() => router.push('/')}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800 font-bold text-xs"
                        >
                            <ExternalLink className="w-3 h-3" /> RETURN TO OS
                        </button>
                    </div>
                </div>

                {/* Dashboard Content Area */}
                <div className="flex-1 bg-white border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white m-2 p-6 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-auto min-h-0">
                        {renderContent()}
                    </div>
                </div>
            </div>

            {/* Footer Status Bar */}
            <div className="h-6 bg-[#c0c0c0] border-t-2 border-white flex items-center justify-between px-3 text-[10px] font-bold text-gray-600 uppercase shrink-0">
                <div className="flex items-center gap-4 text-nowrap">
                    <span>Database: Connected</span>
                    <div className="w-[1px] h-3 bg-gray-400" />
                    <span>Server: Vercel / Edge Runtime</span>
                </div>
                <div className="truncate ml-4">Vibe Coder OS v1.0.0 (Release)</div>
            </div>
        </div>
    );
}
