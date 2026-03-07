# Vibe Coder OS Portfolio

A high-fidelity, interactive desktop environment built with Next.js, featuring a retro skeuomorphic design, a full window management system, and integrated portfolio applications.

## 🖥️ Core OS Environment
The "Desktop" serves as the main interface, featuring:
- **Skewmorphic UI**: Authentic Windows 95/classic MacOS aesthetic.
- **Global Window Manager**: Custom Zustand-powered store handling multi-app states.
- **Desktop Icons**: Draggable icons linked to system applications and folders.

## 🚀 Native Applications
- **Terminal**: Shell simulation with filesystem navigation.
- **File Explorer**: Skewmorphic virtual filesystem browser.
- **Portfolio Browser**: Retro viewer for "About", "Projects", and "Blog".
- **Vibe Chess**: Fully playable chess game logic.

## 🔐 Secure Administration
- **Retro Login**: Secured by NextAuth.js.
- **Hybrid Editor**: TipTap-based editor supporting Visual (Rich Text) and Source (Markdown/HTML) modes.

## 📊 Vibe Tracking
- Custom visitor session tracking using secure cookies and Prisma 7.

## 🛠️ Technical Stack
- **Framework**: Next.js 16 (Turbopack)
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB via Prisma 7
- **State**: Zustand
- **Motion**: Framer Motion

## 🚀 Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure `.env` (see `.env.example`).
4. Run development server: `npm run dev`

## ⚖️ License
GPL-3.0-only
