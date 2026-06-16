import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const { path, referrer } = await request.json();
        const sessionId = request.cookies.get('vibe_session_id')?.value;

        if (!sessionId) {
            return NextResponse.json({ error: 'No session' }, { status: 400 });
        }

        // Basic UUID validation (v4)
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(sessionId)) {
            return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
        }

        // Find or create the session in the database
        // This verifies the session exists and ensures we have a valid internal ID (ObjectId)
        const session = await prisma.session.upsert({
            where: { sessionId: sessionId },
            update: { lastActive: new Date() },
            create: {
                sessionId: sessionId,
                themePreference: 'dark'
            },
        });

        // Record the page view linked to the validated session
        await prisma.pageView.create({
            data: {
                path: path || '/',
                referrer: referrer || '',
                sessionId: session.id, // Use the internal ObjectId
                userAgent: request.headers.get('user-agent') || undefined,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Tracking error:', error);
        return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
    }
}
