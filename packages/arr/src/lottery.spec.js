import { lottery } from './index';

describe('lottery / arr.lottery function', () => {
    describe('Is it exposed as a function', () => {
        test("should be a function", () => {
            expect(typeof lottery).toBe('function')
        })
    });

    describe(`Does it give a random array item?`, () => {
        test('when given an empty array', () => {
            expect(lottery([])).toBeUndefined();
        });

        test('when given an array with a single item', () => {
            expect(lottery([1000])).toBe(1000);
        });

        /**
         *  TODO: Research on how to check for randomness?
         * 
         * Does the size of the array matter?
         */
        test('when given an non-empty array', () => {
            expect(lottery(['x', 'y', 'z'])).not.toBeUndefined();
            expect(lottery(['x', 'y', 'z'])).toContainEqual(['x', 'y', 'z']);
        });
    });
});
