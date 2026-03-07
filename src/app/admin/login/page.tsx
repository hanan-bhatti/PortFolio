'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await signIn('credentials', {
            username,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError('Invalid credentials. Access denied.');
            setLoading(false);
        } else {
            router.push('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-[#008080] flex items-center justify-center p-4">
            {/* Login Dialog Box */}
            <div className="w-full max-w-sm bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800 shadow-[4px_4px_15px_rgba(0,0,0,0.5)]">
                {/* Title Bar */}
                <div className="h-7 m-[2px] flex items-center justify-between px-2 bg-gradient-to-r from-[#000080] to-[#1084d0] text-white font-bold text-xs">
                    <span>Enter Network Password</span>
                    <button className="w-4 h-4 flex items-center justify-center bg-[#c0c0c0] border border-t-white border-l-white border-b-gray-800 border-r-gray-800 text-black text-[10px]">X</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-2 border-2 border-t-gray-500 border-l-gray-500 border-b-white border-r-white bg-[#c0c0c0]">
                            <Lock className="w-12 h-12 text-blue-900" />
                        </div>
                        <p className="text-sm font-bold">Please enter your credentials to manage the Vibe Coder OS.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-tight">Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-white border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white px-2 py-1 outline-none text-sm"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-tight">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white px-2 py-1 outline-none text-sm"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-600 text-xs font-bold py-1 italic border-t border-red-200 mt-2">{error}</p>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800 active:border-t-gray-800 active:border-l-gray-800 font-bold text-xs uppercase"
                        >
                            {loading ? 'WAITING...' : 'OK'}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="px-6 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800 font-bold text-xs uppercase"
                        >
                            CANCEL
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
