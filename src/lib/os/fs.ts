export interface FSNode {
    name: string;
    type: 'file' | 'folder';
    content?: string;
    children?: string[]; // nodes names
}

export const VIBE_FS: Record<string, FSNode> = {
    '/': {
        name: '/',
        type: 'folder',
        children: ['home', 'bin', 'projects']
    },
    '/home': {
        name: 'home',
        type: 'folder',
        children: ['user']
    },
    '/home/user': {
        name: 'user',
        type: 'folder',
        children: ['about.txt', 'contact.txt', 'interests.txt']
    },
    '/home/user/about.txt': {
        name: 'about.txt',
        type: 'file',
        content: 'I am a Vibe Coder and CS student. I build things with C#, C++, Android, and more. I love solving complex problems with simple, elegant code.'
    },
    '/home/user/contact.txt': {
        name: 'contact.txt',
        type: 'file',
        content: 'Email: hanan@example.com\nGitHub: https://github.com/hanan-bhatti\nX: @hanan_bhatti'
    },
    '/home/user/interests.txt': {
        name: 'interests.txt',
        type: 'file',
        content: '- System Architecture\n- UI/UX Design\n- Game Development\n- Web3 & Blockchain\n- AI & Machine Learning'
    },
    '/bin': {
        name: 'bin',
        type: 'folder',
        children: ['terminal.exe', 'explorer.exe', 'chess.exe', 'browser.exe']
    },
    '/bin/terminal.exe': { name: 'terminal.exe', type: 'file', content: 'BINARY_DATA' },
    '/bin/explorer.exe': { name: 'explorer.exe', type: 'file', content: 'BINARY_DATA' },
    '/bin/chess.exe': { name: 'chess.exe', type: 'file', content: 'BINARY_DATA' },
    '/bin/browser.exe': { name: 'browser.exe', type: 'file', content: 'BINARY_DATA' },
    '/projects': {
        name: 'projects',
        type: 'folder',
        children: ['portfolio', 'vibe-os', 'web-apps']
    },
    '/projects/portfolio': {
        name: 'portfolio',
        type: 'folder',
        children: ['readme.md']
    },
    '/projects/portfolio/readme.md': {
        name: 'readme.md',
        type: 'file',
        content: '# Vibe Coder Portfolio\nA retro OS-style portfolio built with Next.js 15, Tailwind CSS, and MongoDB.'
    }
};
