import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
    it('should merge class names correctly', () => {
        expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    });

    it('should handle conditional classes', () => {
        expect(cn('bg-red-500', true && 'text-white', false && 'hidden')).toBe('bg-red-500 text-white');
        expect(cn('bg-red-500', { 'text-white': true, 'hidden': false })).toBe('bg-red-500 text-white');
    });

    it('should merge conflicting Tailwind classes', () => {
        // tailwind-merge should prefer the last class for conflicting utilities
        expect(cn('px-2 py-2', 'p-4')).toBe('p-4');
        expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    });

    it('should handle undefined, null and boolean values', () => {
        expect(cn('bg-red-500', undefined, null, false, 'text-white')).toBe('bg-red-500 text-white');
    });

    it('should handle arrays of classes', () => {
        expect(cn(['bg-red-500', 'text-white'], 'p-4')).toBe('bg-red-500 text-white p-4');
    });

    it('should return empty string for no input', () => {
        expect(cn()).toBe('');
    });
});
