import { arr } from './index';

describe(`arr function`, () => {
    describe('Does it always return an array regardless of the input?', () => {
        const predictions = [
            { label: 'when given zero arguments', input: undefined },
            { label: 'when given a string', input: '' },
            { label: 'when given a null', input: null },
            { label: 'when given an object', input: {} },
            { label: 'when given a number', input: 100 },
            { label: 'when given a boolean', input: false },
            { label: 'when given an empty array', input: [] },
            { label: 'when given an non-empty array', input: ['a', 'b', 'c'] },
        ];

        predictions.forEach(({ label, input }) => {
            test(label, () => {
                expect(Array.isArray(arr(input))).toBeTruthy();
            });
        });
    });
});
