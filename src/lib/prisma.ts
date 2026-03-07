import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

/**
 * Prisma 7 + Next.js build-time proxy.
 * Prevents the client from initializing during the build phase to satisfy
 * strict connection adapter checks while maintaining full runtime functionality.
 */
export const prisma = globalForPrisma.prisma ?? (() => {
    if (typeof window !== 'undefined') return {} as PrismaClient; // Safe-guard for client-side

    // Check if we are in the build phase
    const isBuild = process.env.NEXT_PHASE === 'phase-production-build' || process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL;

    if (isBuild) {
        return new Proxy({} as any, {
            get: (_, prop) => {
                if (prop === 'then') return undefined; // Support async checks
                return (...args: any[]) => {
                    console.warn(`Prisma method "${String(prop)}" called during build phase. Returning empty result.`);
                    return Promise.resolve(null);
                };
            },
        }) as PrismaClient;
    }

    const client = new PrismaClient();

    if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = client;
    }

    return client;
})();
