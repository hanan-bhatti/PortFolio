import { NextRequest, NextResponse, after } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const { path, referrer } = await request.json();
        const sessionId = request.cookies.get('vibe_session_id')?.value;

        if (!sessionId) {
            return NextResponse.json({ error: 'No session' }, { status: 400 });
        }

        // Record the page view in the background
        after(
            prisma.pageView.create({
                data: {
                    path: path || '/',
                    referrer: referrer || '',
                    sessionId: sessionId,
                },
            }).catch(error => {
                console.error('Background tracking error:', error);
            })
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Tracking error:', error);
        return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
    }
}
