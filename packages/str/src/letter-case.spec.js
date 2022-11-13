import { toLabel } from './index';

// observation
describe('toLabel', () => {
    // question
    describe('Does it return an empty string?', () => {
        // hypothesis & prediction
        const predictions = [
            { label: 'when given an none-empty string of whitespaces', input: '    ' },
            { label: 'when given an none-empty string of hyphens', input: '--' },
            { label: 'when given zero arguments', input: undefined },
            { label: 'when given an empty string', input: '' },
            { label: 'when given an empty array', input: [] },
        ];

        predictions.forEach(({ label, input }) => {
            // tests
            test(label, () => {
                expect(toLabel(input)).toMatch('');
            });
        });
    });

    describe(`Does it throw a TypeError?`, () => {
        test('when given objects not desirable as strings', () => {
            expect(() => toLabel(null)).toThrow(/^Expected a date, string, array of strings, given null$/);
            expect(() => toLabel(parseInt('@'))).toThrow(/^Expected a date, string, array of strings, given NaN$/);
            expect(() => toLabel(new Error())).toThrow(/^Expected a date, string, array of strings, given Error$/);
        });
    });

    describe(`Does it work with objects with a toString() getter`, () => {
        test('when given a Date Object', () => {
            const now = new Date('1970-01-01T00:00:00');
            
            expect(toLabel(now)).toMatch('1969-12-31t21-00-00-000z');
        });
    });

    describe('Does it create a slug from a phrase?', () => {
        test('when given a proper english sentence', () => {
            const predictions = [
                {
                    input: 'The quick brown fox jumps over the lazy dog.',
                    output: 'the-quick-brown-fox-jumps-over-the-lazy-dog',
                },
                { input: 'Waltz, bad nymph, for quick jigs vex.', output: 'waltz-bad-nymph-for-quick-jigs-vex' },
            ];

            predictions.forEach(({ input, output }) => {
                expect(toLabel(input)).toMatch(output);
            });
        });
    });

    describe('Does it create a slug from an array?', () => {
        test('when given an array of characters', () => {
            expect(toLabel(['Tic', 'Tac', 'Toe'])).toBe('tic-tac-toe');
        });

        test('when given a mixed array of characters eg emojis 😅', () => {
            expect(toLabel(['Merry', 'go', 'round', '🎠'])).toBe('merry-go-round');
        });
    });
});
