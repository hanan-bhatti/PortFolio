'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo, Link as LinkIcon, Underline as UnderlineIcon, Code, Eye, FileJson } from 'lucide-react';

interface EditorProps {
    initialValue?: string;
    onSave?: (content: string) => void;
}

export default function HybridEditor({ initialValue = '', onSave }: EditorProps) {
    const [isSourceMode, setIsSourceMode] = useState(false);
    const [sourceContent, setSourceContent] = useState(initialValue);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: initialValue,
        onUpdate: ({ editor }) => {
            setSourceContent(editor.getHTML());
        },
    });

    if (!editor) return null;

    const toggleMode = () => {
        if (isSourceMode) {
            editor.commands.setContent(sourceContent);
        }
        setIsSourceMode(!isSourceMode);
    };

    const handleSave = () => {
        const finalContent = isSourceMode ? sourceContent : editor.getHTML();
        onSave?.(finalContent);
        alert('Progress Saved to Database.');
    };

    return (
        <div className="flex flex-col h-full bg-[#c0c0c0] font-sans border-2 border-white">
            {/* Editor Toolbar */}
            <div className="flex items-center gap-1 p-1 bg-[#c0c0c0] border-b border-gray-400 overflow-x-auto shrink-0">
                <div className="flex gap-[2px] mr-4">
                    <button
                        onClick={toggleMode}
                        className={`px-3 py-1 flex items-center gap-2 text-xs font-bold uppercase transition-shadow ${isSourceMode ? 'bg-[#d4d0c8] border-t-2 border-l-2 border-t-gray-800 border-l-gray-800 border-b-2 border-r-2 border-b-white border-r-white' : 'bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800'}`}
                    >
                        {isSourceMode ? <><Eye className="w-3 h-3" /> VISUAL</> : <><Code className="w-3 h-3" /> SOURCE</>}
                    </button>
                </div>

                {!isSourceMode && (
                    <div className="flex items-center gap-[2px] border-l border-gray-400 pl-4 h-6">
                        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1 ${editor.isActive('bold') ? 'bg-gray-300 shadow-inner border border-gray-500' : 'hover:bg-gray-100 border border-transparent'}`}><Bold className="w-4 h-4" /></button>
                        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1 ${editor.isActive('italic') ? 'bg-gray-300 shadow-inner border border-gray-500' : 'hover:bg-gray-100 border border-transparent'}`}><Italic className="w-4 h-4" /></button>
                        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-1 ${editor.isActive('underline') ? 'bg-gray-300 shadow-inner border border-gray-500' : 'hover:bg-gray-100 border border-transparent'}`}><UnderlineIcon className="w-4 h-4" /></button>
                        <div className="w-[1px] h-4 bg-gray-400 mx-1" />
                        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-1 ${editor.isActive('bulletList') ? 'bg-gray-300 shadow-inner border border-gray-500' : 'hover:bg-gray-100 border border-transparent'}`}><List className="w-4 h-4" /></button>
                        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-1 ${editor.isActive('orderedList') ? 'bg-gray-300 shadow-inner border border-gray-500' : 'hover:bg-gray-100 border border-transparent'}`}><ListOrdered className="w-4 h-4" /></button>
                        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-1 ${editor.isActive('blockquote') ? 'bg-gray-300 shadow-inner border border-gray-500' : 'hover:bg-gray-100 border border-transparent'}`}><Quote className="w-4 h-4" /></button>
                        <div className="w-[1px] h-4 bg-gray-400 mx-1" />
                        <button onClick={() => editor.chain().focus().undo().run()} className="p-1 hover:bg-gray-100 border border-transparent"><Undo className="w-4 h-4" /></button>
                        <button onClick={() => editor.chain().focus().redo().run()} className="p-1 hover:bg-gray-100 border border-transparent"><Redo className="w-4 h-4" /></button>
                    </div>
                )}

                <div className="flex-1" />
                <button
                    onClick={handleSave}
                    className="px-4 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800 active:border-t-gray-800 active:border-l-gray-800 font-bold text-xs uppercase"
                >
                    SAVE CHANGES
                </button>
            </div>

            {/* Editor Content Area */}
            <div className="flex-1 bg-white border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white m-1 relative overflow-hidden">
                {isSourceMode ? (
                    <textarea
                        className="w-full h-full p-4 font-mono text-sm border-none outline-none resize-none bg-gray-50"
                        value={sourceContent}
                        onChange={(e) => setSourceContent(e.target.value)}
                        placeholder="<html> Enter HTML or Markdown content here... </html>"
                    />
                ) : (
                    <div className="h-full overflow-auto p-4 prose max-w-none prose-sm selection:bg-blue-200">
                        <EditorContent editor={editor} />
                    </div>
                )}
            </div>

            {/* Footer Info */}
            <div className="h-6 bg-[#c0c0c0] border-t border-gray-400 flex items-center px-3 text-[10px] uppercase font-bold text-gray-600">
                <div className="flex-1">Mode: {isSourceMode ? 'Raw Source (HTML/MD)' : 'Visual Composer'}</div>
                <div className="flex items-center gap-2">
                    <FileJson className="w-3 h-3" /> JSON SYNTACTIC STORAGE: READY
                </div>
            </div>
        </div>
    );
}
